import { SimpleRequest } from '../api/api_pb';
import { SimpleServiceClient } from "../api/api_pb_service";

const client = new SimpleServiceClient('https://localhost:50051');

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
