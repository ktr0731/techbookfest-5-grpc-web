import { grpc } from 'grpc-web-client';
import { SimpleRequest } from '../api/api_pb';
import { SimpleServiceClient, SimpleService } from "../api/api_pb_service";

// const host = 'https://localhost:50051';
const host = 'http://localhost:50051';
const client = new SimpleServiceClient(host);

document.querySelector("#unary-button").addEventListener("click", () => {
    const req = new SimpleRequest();
    req.setName("kumiko oumae");

    client.unary(req, (err, res) => {
        if (err) {
            console.error(err);
            return
        }
        const e = document.querySelector("#unary-message");
        e.innerText = res.getMessage();
    });
});

document.querySelector("#server-stream-button").addEventListener("click", () => {
    const req = new SimpleRequest();
    req.setName("kumiko oumae");

    const e = document.querySelector("#server-stream-message");
    e.innerText = "";

    const stream = client.serverStreaming(req);
    stream.on("data", res => {
        e.innerText += res.getMessage() + "\n";
    });
    stream.on("end", () => {
        e.innerText += "finished";
    })
});

document.querySelector("#client-stream-button").addEventListener("click", () => {
    const e = document.querySelector("#client-stream-message");
    e.innerText = "";

    const client = grpc.client(SimpleService.ClientStreaming, {
        host: host,
        // transport: grpc.WebsocketTransportFactory,
    });
    client.onMessage(message => {
        e.innerText += message.array[0];
    });

    client.start();

    const promises = ["oumae", "kousaka", "kato", "kawashima"].map((name, i) => {
        return new Promise(resolve => {
            setTimeout(() => {
                e.innerText += `[${i+1}]: name = ${name}\n`;
                const req = new SimpleRequest();
                req.setName(name);
                client.send(req);
                resolve();
            }, 500*i);
        });
    });
    Promise.all(promises).then(() => {
        client.finishSend();
        e.innerText += "\n";
    })
});
