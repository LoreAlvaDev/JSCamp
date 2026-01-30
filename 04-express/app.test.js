//para correrlo  node --watch app.test.js
import { test, describe, before, after } from "node:test";
import assert, { rejects } from "node:assert";
import app from "./app.js";

let server;
const PORT = 3456;
const BASE_URL = `http://localhost:${PORT}`;

const job = {
    titulo: "Mi trabajo",
    empresa: "Midudev Corp",
    ubicacion: "Remoto",
    descripcion: " becario de python",
    data: {
        technology: ["python", "express"],
        modalidad: "remoto",
        nivel: "trainee",
    },
};

//antas de todos los tests, levantamos el servidor
before(async () => {
    return new Promise((resolve, reject) => {
        server = app.listen(PORT, () => resolve());
        server.on("error", reject);
    });
});

//despues de todos los test, cerramos el servidor
after(async () => {
    return new Promise((resolve, reject) => {
        server.close((err) => {
            if (err) return reject(err);
            resolve();
        });
    });
});

describe("GET /jobs", () => {
    test("GET: debe responder con 200 y un array de trabajos", async () => {
        const response = await fetch(`${BASE_URL}/jobs`);
        assert.strictEqual(response.status, 200);
        const json = await response.json();
        assert.ok(Array.isArray(json.data), "la respuesta debe ser un array");
    });

    test("GET: debe filtrar trabajos por tecnología", async () => {
        const tech = "react";
        const resp = await fetch(`${BASE_URL}/jobs?technology=${tech}`);
        assert.strictEqual(resp.status, 200);
        const json = await resp.json();
        assert.ok(
            json.data.every((job) => job.data.technology.includes(tech)),
            `Todos los trabajos deben incluir la tecnología ${tech}`,
        );
    });

    test("GET: debe filtrar trabajos por ubicación", async () => {
        const type = "remoto";
        const resp = await fetch(`${BASE_URL}/jobs?type=${type}`);
        assert.strictEqual(resp.status, 200);
        const json = await resp.json();
        assert.ok(
            json.data.every((job) => job.data.modalidad === type),
            `Todos los trabajos deben ser en ${type}`,
        );
    });

    test("GET: debe filtrar trabajos por nivel", async () => {
        const level = "junior";
        const resp = await fetch(`${BASE_URL}/jobs?level=${level}`);
        assert.strictEqual(resp.status, 200);
        const json = await resp.json();
        assert.ok(
            json.data.every((job) => job.data.nivel === level),
            `Todos los trabajos deben ser de ${level}`,
        );
    });

    test("GET: debe filtrar trabajos por texto", async () => {
        const text = "react";
        const resp = await fetch(`${BASE_URL}/jobs?text=${text}`);
        assert.strictEqual(resp.status, 200);
        const json = await resp.json();
        assert.ok(
            json.data.every((job) => {
                const titulo = (job.titulo || "").toLowerCase();
                const descripcion = (job.descripcion || "").toLowerCase();
                return titulo.includes(text) || descripcion.includes(text);
            }),
            `Todos los trabajos deben contener ${text}`,
        );
    });

    test("GET: debe filtrar trabajos por texto y ubicación", async () => {
        const text = "react";
        const type = "remoto";
        const resp = await fetch(`${BASE_URL}/jobs?text=${text}&type=${type}`);
        assert.strictEqual(resp.status, 200);
        const json = await resp.json();
        assert.ok(
            json.data.every((job) => {
                const titulo = (job.titulo || "").toLowerCase();
                const descripcion = (job.descripcion || "").toLowerCase();
                return titulo.includes(text) || descripcion.includes(text) || job.data.ubicacion === type;
            }),
            `Todos los trabajos deben contener ${text} y ser en ${type}`,
        );
    });

    test("GET: debe devolver un job concreto", async () => {
        const id = "7a4d1d8b-1e45-4d8c-9f1a-8c2f9a9121a4";
        const resp = await fetch(`${BASE_URL}/jobs/${id}`);
        assert.strictEqual(resp.status, 200);
        const json = await resp.json();
        assert.ok(json.job.id === id, `Es el trabajo ${id}`);
    });

    test("GET: debe devolver un error si el job no existe", async () => {
        const id = "7a4d1d8b4";
        const resp = await fetch(`${BASE_URL}/jobs/${id}`);
        assert.strictEqual(resp.status, 404);
    });
});

describe("POST /jobs", () => {
    test("POST: debe responder con un error si no mandamos body", async () => {
        const response = await fetch(`${BASE_URL}/jobs`, {
            method: "POST",
        });
        assert.strictEqual(response.status, 400);
        const json = await response.json();
        assert.ok(json.error === "Invalid request", "la respuesta debe ser un array");
    });

    test("POST: debe añadir un nuevo trabajo", async () => {
        const resp = await fetch(`${BASE_URL}/jobs`, {
            method: "POST",
            body: JSON.stringify(job),
            mode: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await resp.json();
        assert.ok(json.id, "tenemos un id");
    });

    test("POST: debe dar error si falta algún campo", async () => {
        const jobKO = {
            empresa: "Midudev Corp",
            ubicacion: "Remoto",
            descripcion: " becario de python",
            data: {
                technology: ["python", "express"],
                modalidad: "remoto",
                nivel: "trainee",
            },
        };
        const resp = await fetch(`${BASE_URL}/jobs`, {
            method: "POST",
            body: JSON.stringify(jobKO),
            mode: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
        });
        assert.strictEqual(resp.status, 400);
        const json = await resp.json();
        assert.ok(json.error === "Invalid request", "la respuesta debe ser un array");
    });
});

describe("PUT /jobs", () => {
    let newJob;
    before("PUT: añadiremos un trabajo para poder modificarlo", async () => {
        const resp = await fetch(`${BASE_URL}/jobs`, {
            method: "POST",
            body: JSON.stringify(job),
            mode: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await resp.json();
        newJob = json.job.id;
    });

    test("PUT: debe responder con un error si no mandamos body", async () => {
        const response = await fetch(`${BASE_URL}/jobs/${newJob}`, {
            method: "PUT",
        });
        assert.strictEqual(response.status, 400);
    });

    test("PUT: debe modificar un trabajo", async () => {
        const modifiedJob = { ...job, titulo: "cambiado" };
        const resp = await fetch(`${BASE_URL}/jobs/${newJob}`, {
            method: "PUT",
            body: JSON.stringify(modifiedJob),
            mode: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await resp.json();
        assert.ok(json.titulo === "cambiado", "tenemos un titulo cambiado");
    });

    test("PUT: debe dar error si el id no exisste", async () => {
        const resp = await fetch(`${BASE_URL}/jobs/abclo`, {
            method: "POST",
            body: JSON.stringify(job),
            mode: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
        });
        assert.strictEqual(resp.status, 404);
    });
});

describe("PATCH /jobs", () => {
    let newJob;
    before("PATCH: añadiremos un trabajo para poder modificarlo", async () => {
        const resp = await fetch(`${BASE_URL}/jobs`, {
            method: "POST",
            body: JSON.stringify(job),
            mode: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await resp.json();
        newJob = json.job.id;
    });

    test("PATCH: debe responder con un error si no mandamos body", async () => {
        const response = await fetch(`${BASE_URL}/jobs/${newJob}`, {
            method: "PATCH",
        });
        assert.strictEqual(response.status, 500);
    });

    test("PATCH: debe modificar un trabajo", async () => {
        const resp = await fetch(`${BASE_URL}/jobs/${newJob}`, {
            method: "PATCH",
            body: JSON.stringify({ titulo: "cambiado" }),
            mode: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await resp.json();
        assert.ok(json.titulo === "cambiado", "tenemos un titulo cambiado");
    });

    test("PATCH: debe dar error si el id no existe", async () => {
        const resp = await fetch(`${BASE_URL}/jobs/abclo`, {
            method: "POST",
            body: JSON.stringify(job),
            mode: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
        });
        assert.strictEqual(resp.status, 404);
    });
});

describe("DELETE /jobs", () => {
    let newJob;
    before("DELETE: añadiremos un trabajo para poder borrarlo", async () => {
        const resp = await fetch(`${BASE_URL}/jobs`, {
            method: "POST",
            body: JSON.stringify(job),
            mode: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await resp.json();
        newJob = json.job.id;
    });

    test("DELETE: debe eliminar un trabajo", async () => {
        const resp = await fetch(`${BASE_URL}/jobs/${newJob}`, {
            method: "DELETE",
            mode: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
        });
        assert.strictEqual(resp.status, 204);
        const respGet = await fetch(`${BASE_URL}/jobs/${newJob}`);
        assert.strictEqual(respGet.status, 404);
    });

    test("DELETE: debe dar error si el id no existe", async () => {
        const resp = await fetch(`${BASE_URL}/jobs/abclo`, {
            method: "DELETE",
            body: JSON.stringify(job),
            mode: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
        });
        assert.strictEqual(resp.status, 404);
    });
});
