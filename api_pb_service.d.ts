// package: api
// file: api.proto

import * as api_pb from "./api_pb";
import {grpc} from "grpc-web-client";

type SimpleServiceUnary = {
  readonly methodName: string;
  readonly service: typeof SimpleService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.SimpleRequest;
  readonly responseType: typeof api_pb.SimpleResponse;
};

type SimpleServiceClientStreaming = {
  readonly methodName: string;
  readonly service: typeof SimpleService;
  readonly requestStream: true;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.SimpleRequest;
  readonly responseType: typeof api_pb.SimpleResponse;
};

type SimpleServiceServerStreaming = {
  readonly methodName: string;
  readonly service: typeof SimpleService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof api_pb.SimpleRequest;
  readonly responseType: typeof api_pb.SimpleResponse;
};

type SimpleServiceBidiStreaming = {
  readonly methodName: string;
  readonly service: typeof SimpleService;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof api_pb.SimpleRequest;
  readonly responseType: typeof api_pb.SimpleResponse;
};

export class SimpleService {
  static readonly serviceName: string;
  static readonly Unary: SimpleServiceUnary;
  static readonly ClientStreaming: SimpleServiceClientStreaming;
  static readonly ServerStreaming: SimpleServiceServerStreaming;
  static readonly BidiStreaming: SimpleServiceBidiStreaming;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }
export type ServiceClientOptions = { transport: grpc.TransportConstructor; debug?: boolean }

interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: () => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}

export class SimpleServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: ServiceClientOptions);
  unary(
    requestMessage: api_pb.SimpleRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: api_pb.SimpleResponse|null) => void
  ): void;
  unary(
    requestMessage: api_pb.SimpleRequest,
    callback: (error: ServiceError, responseMessage: api_pb.SimpleResponse|null) => void
  ): void;
  clientStreaming(): void;
  serverStreaming(requestMessage: api_pb.SimpleRequest, metadata?: grpc.Metadata): ResponseStream<api_pb.SimpleResponse>;
  bidiStreaming(): void;
}

