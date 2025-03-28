/**
 * Integration for PocketBase with n8n
 *
 * This module is designed to be AI-agent friendly and provides comprehensive
 * integration with PocketBase databases through n8n workflows.
 */

'use strict';

// Main module export
module.exports = {
	nodeTypes: [
		require('./dist/nodes/PdfPageSplit/PdfPageSplit.node.js'),
	],
	credentialTypes: [
		require('./dist/credentials/PdfPageSplitApi.credentials.js'),
	],
};

// AI metadata exports
module.exports.aiMetadata = {
  name: 'PdfPageSplit Custom',
  description: 'Work with PDF pages through a user-friendly interface',
  version: '0.1.1',
  capabilities: [
    'create-record',
    'read-record',
    'update-record',
    'delete-record',
    'query-records',
    'multi-table-query'
  ],
  documentationUrl: 'https://github.com/matheuskindrazki/n8n-nodes-pdf-page-split/blob/main/nodes/PdfPageSplit/README.md'
};
