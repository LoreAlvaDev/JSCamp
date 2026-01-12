import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";

//leer el archivo
const content = await readFile("archivo.txt");
console.log(content.toString());

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
