// export type User = {
//     readonly name: string,//asi es una propiedad solo de lectura
//     age: number,
//     email?: string,
//     company?: {
//         name: string,
//         address: string,
//         phone?: string
//     }
// }

type UserId = {
    readonly id: string | number
}

export type User = {
    readonly name: string,//asi es una propiedad solo de lectura
    age: number,
    email?: string,
    company?: Company
    // role: string
    role: 'admin' | 'user' | 'editor' //así tienes autocompletado
}

type UserEntity = User & UserId

const entity: UserEntity = {
    id: 343,
    age: 23,
    name: 'patats',
    role: "admin",

}

export type Company = {
    name: string,
    address: string,
    phone?: string
}
