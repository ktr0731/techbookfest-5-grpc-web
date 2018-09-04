import { SimpleRequest } from '../api/api_pb';
import { SimpleServiceClient } from "../api/api_pb_service";

const req = new SimpleRequest();
req.setName("kumiko oumae");

const e = document.querySelector("#message");

const client = new SimpleServiceClient('http://localhost:50051');
client.unary(req, (err, res) => {
    if (err) {
        console.error(err);
    } else {
        e.innerText = res.getMessage();
    }
});
