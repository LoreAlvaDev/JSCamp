import { test, describe, before, after } from "node:test";
import assert, { rejects } from "node:assert";
import app from "./app.js";

let server;
const PORT = 3456;
const BASE_URL = `http://localhost:${PORT}`;

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
    test("debe responder con 200 y un array de trabajos", async () => {
        const response = await fetch(`${BASE_URL}/jobs`);
        assert.strictEqual(response.status, 200);
        const json = await response.json();
        assert.ok(Array.isArray(json.data), "la respuesta debe ser un array");
    });

    test("debe filtrar trabajos por tecnología", async () => {
        const tech = "react";
        const resp = await fetch(`${BASE_URL}/jobs?technology=${tech}`);
        assert.strictEqual(resp.status, 200);
        const json = await resp.json();
        console.log("los datos", json.data[0].data.technology);
        assert.ok(
            json.data.every((job) => job.data.technology.includes(tech)),
            `Todos los trabajos deben incluir la tecnología ${tech}`,
        );
    });

    //TODO test de post, patch, put, delete
});
