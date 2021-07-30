"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamReader = void 0;
const stream_1 = require("stream");
const METADATA_BLOCK_SIZE = 16;
const METADATA_REGEX = /(?<key>\w+)=['"](?<value>.+?)['"];/gu;
function parseMetadata(metadata) {
    const map = new Map();
    const data = metadata.toString('utf8');
    const parts = [...data.replace(/\0*$/u, '').matchAll(METADATA_REGEX)];
    parts.forEach((part) => map.set(part.groups?.key ?? '', part.groups?.value ?? ''));
    return map;
}
function trampoline(fn) {
    return function executor(...args) {
        let result = fn(...args);
        while (typeof result === 'function') {
            result = result();
        }
        return result;
    };
}
function processData(stream, chunk, done) {
    stream.bytesLeft -= chunk.length;
    if (stream.currentState === 1) {
        stream.buffers.push(chunk);
        stream.buffersLength += chunk.length;
    }
    else if (stream.currentState === 2) {
        stream.push(chunk);
    }
    if (stream.bytesLeft === 0) {
        const { callback } = stream;
        const chunkToPass = stream.currentState === 1 && stream.buffers.length > 1
            ? Buffer.concat(stream.buffers, stream.buffersLength)
            : chunk;
        stream.currentState = 0;
        stream.callback = null;
        stream.buffers.splice(0);
        stream.buffersLength = 0;
        callback?.call(stream, chunkToPass);
    }
    return done;
}
const onData = trampoline((stream, chunk, done) => {
    if (chunk.length <= stream.bytesLeft) {
        return () => processData(stream, chunk, done);
    }
    return () => {
        const buffer = chunk.slice(0, stream.bytesLeft);
        return processData(stream, buffer, (error) => {
            if (error !== null && typeof error !== 'undefined')
                return done(error);
            if (chunk.length > buffer.length) {
                return () => onData(stream, chunk.slice(buffer.length), done);
            }
        });
    };
});
class StreamReader extends stream_1.Transform {
    constructor(icyMetaInt) {
        super();
        this.buffers = [];
        this.buffersLength = 0;
        this.bytesLeft = 0;
        this.callback = null;
        this.currentState = 0;
        this.icyMetaInt = 0;
        this.icyMetaInt = icyMetaInt;
        this.passthrough(this.icyMetaInt, this.onMetaSectionStart.bind(this));
    }
    _transform(chunk, _encoding, done) {
        onData(this, chunk, done);
    }
    bytes(length, cb) {
        this.bytesLeft = length;
        this.currentState = 1;
        this.callback = cb;
    }
    passthrough(length, cb) {
        this.bytesLeft = length;
        this.currentState = 2;
        this.callback = cb;
    }
    onMetaSectionStart() {
        this.bytes(1, this.onMetaSectionLengthByte.bind(this));
    }
    onMetaSectionLengthByte(chunk) {
        const length = chunk[0] * METADATA_BLOCK_SIZE;
        if (length > 0) {
            this.bytes(length, this.onMetaData.bind(this));
        }
        else {
            this.passthrough(this.icyMetaInt, this.onMetaSectionStart.bind(this));
        }
    }
    onMetaData(chunk) {
        this.emit('metadata', parseMetadata(chunk));
        this.passthrough(this.icyMetaInt, this.onMetaSectionStart.bind(this));
    }
}
exports.StreamReader = StreamReader;
//# sourceMappingURL=StreamReader.js.map