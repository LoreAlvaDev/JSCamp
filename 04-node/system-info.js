import os from "node:os";
import ms from "ms";

console.log("Información del sistema operativo:");
console.log("Tipo de SO:", os.type());
console.log("Plataforma:", os.platform());
console.log("Arquitectura:", os.arch());
console.log("Memoria total (bytes):", os.totalmem());
console.log("Memoria libre (bytes):", os.freemem());
console.log("Directorio home del usuario:", os.homedir());
console.log("Tiempo de actividad:", ms(os.uptime() * 1000, { long: true }));
console.log("Número de CPUs:", os.cpus().length);
// console.log("Información de las CPUs:", os.cpus());
// console.log("Interfaces de red:", os.networkInterfaces());
console.log("Directorio temporal:", os.tmpdir());
console.log("Separador de línea:", JSON.stringify(os.EOL));
console.log("Nombre del host:", os.hostname());
console.log("Versión de Node.js:", os.version());
