declare module 'node-poppler' {
    interface PdfToCairoOptions {
        pngFile?: boolean;
        jpegFile?: boolean;
        r?: number; // resolution/dpi
        singleFile?: boolean;
        firstPageToConvert?: number;
        lastPageToConvert?: number;
        jpegOpt?: {
            quality: number;
        };
        [key: string]: any;
    }

    export class Poppler {
        constructor(popperPath?: string);

        pdfToCairo(
            pdfFilePath: string,
            outputFilePath: string | undefined,
            options?: PdfToCairoOptions
        ): Promise<string | Buffer>;

        pdfToText(
            pdfFilePath: string,
            outputFilePath: string | undefined,
            options?: any
        ): Promise<string>;

        pdfToHtml(
            pdfFilePath: string,
            outputFilePath: string | undefined,
            options?: any
        ): Promise<string>;

        pdfInfo(
            pdfFilePath: string,
            options?: any
        ): Promise<any>;
    }
}
