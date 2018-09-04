package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"github.com/ktr0731/techbookfest-5-grpc-web/api"
	"google.golang.org/grpc"
)

type simpleServer struct {
}

func (s *simpleServer) Unary(ctx context.Context, req *api.SimpleRequest) (*api.SimpleResponse, error) {
	return &api.SimpleResponse{
		Message: fmt.Sprintf("Hello, %s!", req.GetName()),
	}, nil
}

func (s *simpleServer) ClientStreaming(api.SimpleService_ClientStreamingServer) error {
	panic("not implemented")
}

func (s *simpleServer) ServerStreaming(*api.SimpleRequest, api.SimpleService_ServerStreamingServer) error {
	panic("not implemented")
}

func (s *simpleServer) BidiStreaming(api.SimpleService_BidiStreamingServer) error {
	panic("not implemented")
}

func main() {
	s := grpc.NewServer()
	api.RegisterSimpleServiceServer(s, &simpleServer{})

	ws := grpcweb.WrapServer(
		s,
		grpcweb.WithWebsockets(true),
		grpcweb.WithWebsocketOriginFunc(func(req *http.Request) bool { return true }),
	)
	http.Handle("/", ws)

	log.Println("gRPC Web server listen at localhost:50051")
	http.ListenAndServe(":50051", nil)
}
