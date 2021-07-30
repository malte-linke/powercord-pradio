/// <reference types="node" />
import { Transform } from 'stream';
export declare type Trampoline<T> = T | ((...args: never[]) => Trampoline<T>);
export declare type TransformCallback = (error: Error | null | undefined, data?: Buffer) => void;
declare const enum STATES {
    INIT_STATE = 0,
    BUFFERING_STATE = 1,
    PASSTHROUGH_STATE = 2
}
export declare class StreamReader extends Transform {
    buffers: Buffer[];
    buffersLength: number;
    bytesLeft: number;
    callback: ((chunk: Buffer) => void) | null;
    currentState: STATES;
    readonly icyMetaInt: number;
    constructor(icyMetaInt: number);
    _transform(chunk: Buffer, _encoding: string, done: TransformCallback): void;
    protected bytes(length: number, cb: (chunk: Buffer) => void): void;
    protected passthrough(length: number, cb: (chunk: Buffer) => void): void;
    protected onMetaSectionStart(): void;
    protected onMetaSectionLengthByte(chunk: Buffer): void;
    protected onMetaData(chunk: Buffer): void;
}
export {};
//# sourceMappingURL=StreamReader.d.ts.map