import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PdfPageSplitApi implements ICredentialType {
	name = 'pdfPageSplitApi';
	displayName = 'PDF Page Split API';
	documentationUrl = 'https://github.com/username/n8n-nodes-pdf-page-split';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
			description: 'API key for external PDF processing service (if needed)',
		},
	];
}
