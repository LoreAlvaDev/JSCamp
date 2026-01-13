import { createServer } from "node:http";

//const PORT = 3000;
//si ponemos port 0, el SO asigna un puerto libre automaticamente
//const PORT = 0;
//luego podemos obtener el puerto real con server.address().port
process.loadEnvFile(); //carga variables de entorno desde un archivo .env
const PORT = process.env.PORT || 3000;
const server = createServer((req, res) => {
    console.log(`Solicitud recibida: ${req.method} ${req.url}`);
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Hola desde el servidor HTTP de Node.js!🔥🔥🔥🔥🔥\n"); // icono de fuego 🔥
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

//Para probar: ejecutar "node --watch server.js" y luego abrir en el navegador http://localhost:3000
//También se puede usar curl: curl http://localhost:3000
//en gitbash se puede usar PORT=4000 node --watch server.js para cambiar el puerto al vuelo
//en Windows cmd: set PORT=4000 && node --watch server.js
//en Windows PowerShell: $env:PORT=4000; node --watch server.js
