declare module 'sharp' {
    interface SharpOptions {
        quality?: number;
    }

    interface Sharp {
        jpeg(options?: SharpOptions): Sharp;
        webp(options?: SharpOptions): Sharp;
        png(): Sharp;
        toBuffer(): Promise<Buffer>;
    }

    export default function(input: Buffer | string): Sharp;
}
