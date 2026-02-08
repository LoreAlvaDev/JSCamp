//objetos

// type User = {
//     name: string,
//     age: number
// }

import type { User } from "./00-types.ts";
const user: User = {
    name: 'yo',
    age: 10,
    email: 'lals@lklsd',
    role: 'admin'
}

const anotherUser: User = {
    name: 'yo',
    age: 10,
    company: {
        name: 'algo',
        address: 'lalla'
    },
    role: "editor"
}

anotherUser.name = 'hola'


type Dictionary = {
    [key: string]: string
}

const dictionary: Dictionary = {
    apple: 'es una manzana'
}