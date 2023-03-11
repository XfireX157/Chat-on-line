import express from 'express';
import http from 'http'
import cors from 'cors';
import env from 'dotenv';
import path from 'path'
import routes from './Routes'
import db from './Database/db';
import {Server} from 'socket.io'

const app = express();
const httpServe = http.createServer(app)
const io = new Server(httpServe)
env.config();
db()

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.static(path.join(__dirname + "/../public")))

routes(app)
io.on("connection", (socket) => {
    socket.on("newuser", (username) => {
        socket.broadcast.emit("update", username + "Joined the conversation")
    })
    socket.on("existuser", (username) => {
        socket.broadcast.emit("update", username + "left the conversation")
    })
    socket.on("chat", (message) => {
        socket.broadcast.emit("chat", message)
    })
})

httpServe.listen(port, () => console.log(`Server runing on port ${port}`));