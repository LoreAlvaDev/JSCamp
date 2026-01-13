import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";

console.log("Gestión de archivos con permisos estrictos en Node.js");
console.log("--------------------------------------------------");

if (process.permission.has("fs-read", "archivo.txt")) {
    //leer el archivo
    const content = await readFile("./archivo.txt", "utf-8");
    console.log(content.toString());
} else {
    console.log("No se tiene permiso para leer el archivo 'archivo.txt'");
}

if (!process.permission.has("fs-write", "output/files/uppercaseDocs/*")) {
    console.log("No se tiene permiso para escribir en la carpeta 'output/files/uppercaseDocs/'");
    process.exit(1);
}

//pasar el contenido a mayusculas
const upperContent = content.toString().toUpperCase();
//const outputDir =  "output/files/uppercaseDocs";
//con el join se crean las carpetas con el separador correcto segun el SO
const outputDir = join("output", "files", "uppercaseDocs");

//crear las carpetas de forma recursiva
await mkdir(outputDir, { recursive: true });

//escribir el archivo en la carpeta creada
//await writeFile(`${outputDir}/archivo-mayusculas.txt`, upperContent);
//ahora usando join para crear la ruta completa
const outputFile = join(outputDir, "archivo-mayusculas.txt");
const fecha = new Date().toISOString();
await writeFile(outputFile, fecha + " " + upperContent);

console.log(`Archivo escrito con contenido en mayúsculas en la carpeta ${outputDir}.`);

console.log("La extensión del archivo es:", extname(outputFile));
console.log("El nombre del archivo es:", basename(outputFile));

//node manage-files.js <-- para ejecutar el archivo libertinamente
//node --permission manage-files.js <-- para ejecutar el archivo con permisos estrictos
//node --permission --allow-fs-read="*" manage-files.js <-- para ejecutar el archivo con permisos de lectura a todos los archivos
//node --permission --allow-fs-read="archivo.txt" --allow-fs-write="output/files/uppercaseDocs/*" manage-files.js <-- para ejecutar el archivo con permisos de lectura y escritura específicos
