# n8n-nodes-pdf-page-split

![n8n.io - Workflow Automation](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

[![NPM Version](https://img.shields.io/npm/v/n8n-nodes-pdf-page-split.svg)](https://www.npmjs.com/package/n8n-nodes-pdf-page-split)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A powerful n8n community node for splitting PDF documents into individual pages

## 🌟 Features

- 📄 **PDF Splitting**: Split multi-page PDFs into individual single-page files
- 🎯 **Page Selection**: Process specific page ranges with flexible selection options
- 📝 **Custom Naming**: Configure output file names with prefixes and page numbers
- 🔄 **Batch Processing**: Handle multiple PDFs in a single workflow
- 🚀 **High Performance**: Pure JavaScript implementation for maximum compatibility
- 🐳 **Docker Ready**: Works seamlessly in containerized environments

## 📋 Prerequisites

- n8n version 0.147.0 or newer
- Node.js version 16 or newer

## 💻 Installation

### Via n8n Interface

1. Open your n8n instance
2. Go to **Settings > Community Nodes**
3. Click on **Install**
4. Enter `n8n-nodes-pdf-page-split` in the **Name** field
5. Click **Install**

### Via npm

```bash
npm install n8n-nodes-pdf-page-split
```

### Via yarn

```bash
yarn add n8n-nodes-pdf-page-split
```

## 🔧 Configuration

### Input Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| Binary Property | string | Name of the binary property containing the PDF file | data |
| Page Range | string | Range of pages to process (e.g., "1-5,8,11-13") | (all pages) |
| File Name Prefix | string | Prefix for output file names | page_ |
| Start Number | number | Starting number for page numbering | 1 |

### Output

Each processed page generates an item with:

- **Binary Data**: The PDF page as a binary file
- **JSON Data**:
  - `pageNumber`: Current page number
  - `totalPages`: Total pages in original document
  - `fileName`: Generated file name

## 📚 Usage Examples

### Basic PDF Splitting

```typescript
// Split a PDF into individual pages
[
  {
    "node": "PDF Page Split",
    "parameters": {
      "binaryPropertyName": "data",
      "fileNamePrefix": "page_"
    }
  }
]
```

### Extract Specific Pages

```typescript
// Extract pages 1-3 and 5
[
  {
    "node": "PDF Page Split",
    "parameters": {
      "binaryPropertyName": "data",
      "pageRange": "1-3,5",
      "fileNamePrefix": "extract_"
    }
  }
]
```

## 🔍 Example Workflows

### 1. Split and Save PDF Pages

1. **HTTP Request** → Download PDF from URL
2. **PDF Page Split** → Split into pages
3. **Write Binary File** → Save pages locally

### 2. Process Selected Pages

1. **Read Binary File** → Load local PDF
2. **PDF Page Split** → Extract specific pages
   - Set "Page Range" to "1-3,5,10-12"
3. **Google Drive** → Upload selected pages

## ⚠️ Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| "No binary data found" | Ensure previous node outputs binary data |
| Empty PDF output | Verify input PDF is valid and not corrupted |
| Memory errors | Process fewer pages at once for large PDFs |

### Best Practices

- Verify PDF is not password protected
- Use page ranges for large documents
- Monitor memory usage in production

## 🔧 Technical Details

This node uses [pdf-lib](https://pdf-lib.js.org/) for PDF manipulation, ensuring:

- Pure JavaScript implementation
- No native dependencies
- Cross-platform compatibility
- Docker-friendly operation

### Limitations

- Does not support password-protected PDFs
- Cannot extract text or metadata
- Maximum file size depends on available memory

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📝 License

[MIT](LICENSE)

## 🙏 Acknowledgments

- [n8n](https://n8n.io/) - For the amazing workflow automation platform
- [pdf-lib](https://pdf-lib.js.org/) - For reliable PDF manipulation
- All our contributors and users
