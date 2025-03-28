# PDF Page Split Node

This n8n node allows you to split PDF documents into individual pages and optionally convert them to images.

## Features

- Split multi-page PDFs into individual single-page PDF files
- Convert PDF pages to images (PNG, JPEG, WEBP)
- Configure output file naming with prefixes and page numbers
- Process specific page ranges to extract only the pages you need
- Control image quality and DPI settings

## Usage Examples

### Split a PDF into Individual Pages

1. Use an HTTP Request node or Read Binary File node to fetch a PDF file
2. Connect to the PDF Page Split node
3. Configure settings:
   - Set "Output Format" to "PDF"
   - Configure output options as needed

This will generate one item per page, with each containing the page as a PDF file.

### Convert PDF Pages to Images

1. Use an HTTP Request node or Read Binary File node to fetch a PDF file
2. Connect to the PDF Page Split node
3. Configure settings:
   - Set "Output Format" to "Image"
   - Choose image format (PNG, JPEG, WEBP)
   - Set quality and DPI as needed

This will generate one item per page, with each containing the page as an image in the selected format.

### Extract Specific Pages

You can extract specific pages by setting the "Page Range" parameter. For example:
- `1-5` - Extract pages 1 through 5
- `1,3,5` - Extract pages 1, 3, and 5
- `1-3,7,9-11` - Extract pages 1 through 3, page 7, and pages 9 through 11

## Technical Details

This node uses the following libraries:
- pdf-lib: For PDF manipulation
- sharp: For image processing
- pdf2pic: For converting PDF pages to images

## Troubleshooting

- If the node fails with large PDFs, try processing fewer pages at a time
- For image conversion issues, try adjusting the DPI or image format
- Ensure your PDF is not encrypted or password-protected
