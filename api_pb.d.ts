// package: api
// file: api.proto

import * as jspb from "google-protobuf";

export class SimpleRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SimpleRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SimpleRequest): SimpleRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SimpleRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SimpleRequest;
  static deserializeBinaryFromReader(message: SimpleRequest, reader: jspb.BinaryReader): SimpleRequest;
}

export namespace SimpleRequest {
  export type AsObject = {
    name: string,
  }
}

export class SimpleResponse extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SimpleResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SimpleResponse): SimpleResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SimpleResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SimpleResponse;
  static deserializeBinaryFromReader(message: SimpleResponse, reader: jspb.BinaryReader): SimpleResponse;
}

export namespace SimpleResponse {
  export type AsObject = {
    message: string,
  }
}

