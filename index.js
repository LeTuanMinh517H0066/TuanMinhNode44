// B1: import express
import express from "express";
// import pool from "./db.js";
// import {OK, INTERNAL_SERVER} from "./const.js"
import rootRoutes from "./src/routes/root.router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import {Server} from 'socket.io'; //lib socketIO dùng để tạo Server chat realtime
import {createServer} from 'http';
import {PrismaClient} from '@prisma/client'

// B2: create object express
const app = express();

const prisma = new PrismaClient();




// them middleware der doc data json
app.use(express.json());

// define middleware d
app.use(express.static("."))
// them middleware cors để frontend có thể call api tới backend
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));

// B3: tạo http server
const server = createServer(app); // server nhưng chưa phải server của socket

// tạo socketIO server
// io: object của socket server
// socket: object của socket client
const io = new Server(server,{
    cors: {
        origin: "*"
    }
}); // mapping server SocketIO => SocketIO 

// lắng nghe event kết nối từ client (FE) qua SocketIO
// on: nhận event
// emit: gửi event đi
// on và emit có 2 params:
// param 1: event type: event của SocketIO hoặc event của user tự define
// param 2: function
let number = 0; // đặt biến toàn cục
io.on('connection',(socket) => {
    console.log(socket.id);

    socket.on("send-click", () => {
        console.log("FE send  click");
        number+=1;
        // server bắn event cho tất cả client
        io.emit("send-new-number", number);
    })

    socket.on("reduce-number", () => {
        number-=1;
        io.emit("send-new-number", number);
    })

    socket.on("send-mess", async ({user_id, content}) => {
        let newChat = {
            user_id,
            content,
            date: new Date()
        }
        console.log(newChat);
        await prisma.chat.create({data: newChat});
        

        //
        io.emit("sv-send-mess", {user_id, content})
    })
})


// thêm middeware để get info cookie
app.use(cookieParser());

// import rootRoutes
app.use(rootRoutes)

// B3: define port cho BE chay
// params 1: define port BE
// params 2: callback function

app.get(`/`, (req, res) => {
    res.send("Hello node44");

})

app.get('/test',(req, res) => {
    res.send("test api");
})


// demo get query tu URL
app.get(`/test-query`, (req, res) => {

    let query = req.query;
    res.send(query);
    // res.send("Hello node44");

})

// demo get header from request
app.get(`/test-header`, (req, res) => {

    let headers = req.headers;
    res.send(headers);
    // res.send("Hello node44");

})



server.listen(8085, () => {
    console.log("Server is starting with port 8085");
})

