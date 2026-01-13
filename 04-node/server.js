import { createServer } from "node:http";
import { json } from "node:stream/consumers";
import { randomUUID } from "node:crypto";

process.loadEnvFile(); //carga variables de entorno desde un archivo .env
const PORT = process.env.PORT || 3000;

const sendJson = (res, statusCode, data) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.statusCode = statusCode;
    res.end(JSON.stringify(data));
};

const users = [
    {
        id: 1,
        name: "Juan",
    },
    {
        id: 2,
        name: "María",
    },
    {
        id: "bab4126b-b6d2-4dab-b107-b7a4c2b511c2",
        name: "Lorena",
    },
    {
        id: "9b4be3b9-d58f-47f9-8c5a-111ea6d97bdf",
        name: "Lorena 2",
    },
];

const server = createServer(async (req, res) => {
    const { method, url } = req;
    console.log(`Solicitud recibida: ${method} ${url}`);
    const [path, query] = url.split("?");
    const queryParams = new URLSearchParams(query);
    if (method === "GET") {
        if (path === "/") {
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            return res.end("Hola desde el servidor HTTP de Node.js!🔥🔥🔥🔥🔥\n");
        }
        if (path === "/users") {
            const limit = parseInt(queryParams.get("limit")) || users.length;
            const offset = parseInt(queryParams.get("offset")) || 0;
            console.log("Límite de usuarios a retornar:", limit);
            console.log("Offset de usuarios a retornar:", offset);
            //controlar que son numeros validos
            if (isNaN(limit) || isNaN(offset) || limit < 0 || offset < 0) {
                return sendJson(res, 400, { error: "Limit and offset must be valid numbers" });
            }
            return sendJson(res, 200, users.slice(offset, offset + limit));
        }
        if (path === "/health") {
            return sendJson(res, 200, { status: "ok", timestamp: new Date().toISOString(), uptime: process.uptime().toFixed(2) });
        }
    } else if (method === "POST") {
        //agregar un nuevo usuario
        if (path === "/users") {
            const reqBody = await json(req);
            console.log("Cuerpo de la solicitud:", reqBody);
            if (!reqBody || typeof reqBody !== "object") {
                return sendJson(res, 400, { error: "Cuerpo de la solicitud inválido" });
            }
            if (!reqBody.name) {
                return sendJson(res, 400, { error: "El campo 'name' es obligatorio" });
            }
            const newUser = {
                // id: users.length + 1, //chapucero
                id: randomUUID(),
                name: reqBody.name,
            };
            users.push(newUser);
            //aqui se podria agregar el usuario a una base de datos o a un array
            return sendJson(res, 201, { message: "Usuario creado correctamente" });
        }
    } else {
        return sendJson(res, 405, { error: "Method not allowed" });
    }
    // res.statusCode = 404;
    // return res.end("Not found\n");
    return sendJson(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

//Para probar: ejecutar "node --watch server.js" y luego abrir en el navegador http://localhost:3000
//También se puede usar curl: curl http://localhost:3000
//en gitbash se puede usar PORT=4000 node --watch server.js para cambiar el puerto al vuelo
//en Windows cmd: set PORT=4000 && node --watch server.js
//en Windows PowerShell: $env:PORT=4000; node --watch server.js
