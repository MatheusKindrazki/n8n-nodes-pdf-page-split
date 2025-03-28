import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { PDFDocument } from 'pdf-lib';

export class PdfPageSplit implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'PDF Page Split',
		name: 'pdfPageSplit',
		icon: 'file:pdfPageSplit.svg',
		group: ['transform'],
		version: 1,
		description: 'Split PDF into individual pages',
		defaults: {
			name: 'PDF Page Split',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Binary Property',
				name: 'binaryPropertyName',
				type: 'string',
				default: 'data',
				required: true,
				description: 'Name of the binary property containing the PDF file.',
			},
			{
				displayName: 'Output Options',
				name: 'outputOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'File Name Prefix',
						name: 'fileNamePrefix',
						type: 'string',
						default: 'page_',
						description: 'Prefix for the output file names.',
					},
					{
						displayName: 'Include Page Number',
						name: 'includePageNumber',
						type: 'boolean',
						default: true,
						description: 'Whether to include page number in the output file names.',
					},
					{
						displayName: 'Start Number At',
						name: 'startNumberAt',
						type: 'number',
						default: 1,
						description: 'The number to start counting pages from.',
						typeOptions: {
							minValue: 0,
						},
					},
					{
						displayName: 'Page Range',
						name: 'pageRange',
						type: 'string',
						default: '',
						placeholder: '1-5,8,11-13',
						description: 'Range of pages to split (e.g., "1-5,8,11-13"). Leave empty to split all pages.',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
				const outputOptions = this.getNodeParameter('outputOptions', i, {}) as IDataObject;

				// Get binary data
				if (!items[i].binary?.[binaryPropertyName]) {
					throw new NodeOperationError(this.getNode(), 'No binary data found', { itemIndex: i });
				}

				const fileBufferEncoded = items[i].binary![binaryPropertyName].data;
				const fileBuffer = Buffer.from(fileBufferEncoded, 'base64');

				// Process PDF document
				const pdfBytes = Uint8Array.from(fileBuffer);
				const pdfDoc = await PDFDocument.load(pdfBytes);
				const pageCount = pdfDoc.getPageCount();

				if (pageCount === 0) {
					throw new NodeOperationError(this.getNode(), 'The PDF document has no pages', { itemIndex: i });
				}

				// Process page range if specified
				let pagesToProcess: number[] = [];
				const pageRange = (outputOptions.pageRange as string) || '';

				if (pageRange) {
					// Parse page range (e.g., "1-5,8,11-13")
					const ranges = pageRange.split(',').map(r => r.trim());

					for (const range of ranges) {
						if (range.includes('-')) {
							const [start, end] = range.split('-').map(Number);
							for (let page = start; page <= end; page++) {
								if (page > 0 && page <= pageCount) {
									pagesToProcess.push(page - 1); // Convert to 0-based index
								}
							}
						} else {
							const page = Number(range);
							if (page > 0 && page <= pageCount) {
								pagesToProcess.push(page - 1); // Convert to 0-based index
							}
						}
					}
				} else {
					// Process all pages
					pagesToProcess = Array.from({ length: pageCount }, (_, i) => i);
				}

				// Get file name parts
				const originalFilename = items[i].binary![binaryPropertyName].fileName || 'document.pdf';
				const fileNamePrefix = (outputOptions.fileNamePrefix as string) || 'page_';
				const includePageNumber = outputOptions.includePageNumber !== false;
				const startNumberAt = (outputOptions.startNumberAt as number) || 1;

				// Process each page
				for (let pageIndex of pagesToProcess) {
					try {
						let newItem: INodeExecutionData = {
							json: {
								...items[i].json,
								pageNumber: pageIndex + 1,
								totalPages: pageCount,
							},
							binary: {},
						};

						// Generate file name
						let pageNumber = '';
						if (includePageNumber) {
							const displayPageNum = pageIndex + startNumberAt;
							pageNumber = String(displayPageNum).padStart(String(pageCount + startNumberAt - 1).length, '0');
						}

						const fileNameBase = originalFilename.replace(/\.[^/.]+$/, ''); // Remove extension
						let fileName = `${fileNamePrefix}${pageNumber ? pageNumber + '_' : ''}${fileNameBase}`;

						// Create a new PDF with just this page
						const newPdfDoc = await PDFDocument.create();
						const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageIndex]);
						newPdfDoc.addPage(copiedPage);

						const newPdfBytes = await newPdfDoc.save();

						// Add binary data to the output
						newItem.binary![binaryPropertyName] = await this.helpers.prepareBinaryData(
							Buffer.from(newPdfBytes),
							`${fileName}.pdf`,
							'application/pdf'
						);

						returnData.push(newItem);
					} catch (error: any) {
						// Log error but continue processing other pages
						console.error(`Error processing page ${pageIndex + 1}: ${error?.message || 'Unknown error'}`);

						// Add error item
						returnData.push({
							json: {
								error: `Error processing page ${pageIndex + 1}: ${error?.message || 'Unknown error'}`,
								pageNumber: pageIndex + 1,
								totalPages: pageCount,
							},
							pairedItem: { item: i },
						});
					}
				}
			} catch (error: any) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error?.message || 'Unknown error',
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
