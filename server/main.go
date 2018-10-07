package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"math/rand"
	"net/http"
	"strings"
	"time"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"github.com/ktr0731/techbookfest-5-grpc-web/api"
	"google.golang.org/grpc"
)

func init() {
	rand.Seed(time.Now().UnixNano())
}

type simpleServer struct{}

func (s *simpleServer) Unary(ctx context.Context, req *api.SimpleRequest) (*api.SimpleResponse, error) {
	return &api.SimpleResponse{
		Message: fmt.Sprintf("Hello, %s!", req.GetName()),
	}, nil
}

func (s *simpleServer) ClientStreaming(stream api.SimpleService_ClientStreamingServer) error {
	var names []string
	for {
		req, err := stream.Recv()
		if err == io.EOF {
			return stream.SendAndClose(&api.SimpleResponse{
				Message: fmt.Sprintf("Hello, %s!", strings.Join(names, ", ")),
			})
		}
		names = append(names, req.GetName())
	}
}

func (s *simpleServer) ServerStreaming(req *api.SimpleRequest, stream api.SimpleService_ServerStreamingServer) error {
	n := rand.Intn(10) + 1
	for i := 0; i < n; i++ {
		err := stream.Send(&api.SimpleResponse{
			Message: fmt.Sprintf("[%d] Hello, %s!", i+1, req.GetName()),
		})
		if err != nil {
			return err
		}
		time.Sleep(500 * time.Millisecond)
	}
	return nil
}

func (s *simpleServer) BidiStreaming(api.SimpleService_BidiStreamingServer) error {
	panic("not implemented")
}

func main() {
	s := grpc.NewServer()
	api.RegisterSimpleServiceServer(s, &simpleServer{})

	ws := grpcweb.WrapServer(
		s,
		// grpcweb.WithWebsockets(true),
		// grpcweb.WithWebsocketOriginFunc(func(req *http.Request) bool { return true }),
	)
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "proto: %s", r.Proto)
	})
	http.Handle("/", ws)

	log.Println("gRPC Web server listen at localhost:50051")
	// if err := http.ListenAndServeTLS(":50051", "pem/localhost.pem", "pem/localhost-key.pem", nil); err != nil {
	// 	log.Fatal(err)
	// }
	if err := http.ListenAndServe(":50051", nil); err != nil {
		log.Fatal(err)
	}
}
