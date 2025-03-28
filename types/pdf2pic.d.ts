declare module 'pdf2pic' {
    interface ConversionOptions {
        density?: number;
        savePath?: string;
        saveFilename?: string;
        format?: string;
        width?: number;
        height?: number;
    }

    interface ConversionResult {
        name?: string;
        path?: string;
        size?: number;
        page?: number;
    }

    interface Converter {
        convert: (pageNumber: number) => Promise<ConversionResult>;
        bulk: (pageArray: number[], outputPath?: string) => Promise<ConversionResult[]>;
    }

    export function fromPath(filePath: string, options?: ConversionOptions): Converter;
    export function fromBuffer(buffer: Buffer, options?: ConversionOptions): Converter;
}
