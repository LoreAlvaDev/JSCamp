// ==================
// TIPOS PRIMITIVOS EN TYPESCRIPT
// ==========
//1 strings
const nombre: string = 'lorena'
const saludo = `Hola, ${nombre}` // tipo inferido como string
const vacio: string = ""

//2 números: decimales, negativos, hexadecimales; Infinity
const edad = 13

// 3 booleanos
let isDeveloper: boolean;
isDeveloper = true;

// 4 nulos e indefinidos
let nulo: null = null
let indefinido: undefined = undefined;

//cositas que pueden ser más de un tipo
let age: number | null = null
age = 30
age = null
age = 19

const numeroGrande: bigint = 92903234234n
const id: symbol = Symbol('id')

const ciudad = 'lala'

