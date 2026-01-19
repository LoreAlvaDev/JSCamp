import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

console.log("Listado de archivos en el directorio actual con sus tamaños:");
console.log("---------------------------------------------------------");

//Obtener el directorio a listar, si no se pasa, usar el actual
const directory = process.argv[2] || ".";

//Se ha pedido listar sólo directorios --files-only
const filesOnly = process.argv.includes("--files-only");
//Se ha pedido listar sólo archivos --dirs-only
const dirsOnly = process.argv.includes("--dirs-only");

//Formateo simple de tamaños
function formatFileSize(bytes) {
    if (bytes === 0) return "0 bytes";
    const k = 1024;
    const sizes = [" b", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

//leer los nombre de los archivos en el directorio sin informacion adicional
// const files = await readdir(directory);
let files;
try {
    files = await readdir(directory);
} catch {
    console.error(`❌ No se pudo leer el directorio: ${directory}`);
    process.exit(1);
}
console.log(`Archivos en el directorio '${directory}':`);
console.log("---------------------------------------");
//pedir informacion adicional de cada archivo
const filesInfo = await Promise.all(
    files.map(async (file) => {
        const filePath = join(directory, file);
        const fileStat = await stat(filePath);
        return {
            name: file,
            isDir: fileStat.isDirectory(),
            size: formatFileSize(fileStat.size),
        };
    }),
);
//filtrar si se pidio
const filteredFilesInfo = filesInfo.filter((file) => {
    if (filesOnly && file.isDir) return false;
    if (dirsOnly && !file.isDir) return false;
    return true;
});

//ordenamiento: primero directorios, luego archivos, ambos alfabeticamente
filteredFilesInfo.sort((a, b) => {
    if (a.isDir && !b.isDir) return -1;
    if (!a.isDir && b.isDir) return 1;
    return a.name.localeCompare(b.name);
});
console.log("Tipo Nombre              Tamaño");
console.log("---------------------------------------");
filteredFilesInfo.forEach((file) => {
    const icon = file.isDir ? "📁" : "📄";
    const size = file.isDir ? "-" : file.size;
    // const fileModified = file.mtime.toLocaleString();

    console.log(` ${icon}  ${file.name.padEnd(20)}${size.padStart(10)} `);
});
//Para ejecutar: node cli.js [directorio]
//Si no se pasa el directorio, lista el actual
