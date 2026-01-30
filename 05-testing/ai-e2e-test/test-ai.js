//para ejecutar
//node test-ai.js
process.loadEnvFile();

import { test } from "node:test";
import assert from "node:assert";

import { Stagehand } from "@browserbasehq/stagehand";

test("Un usuario puede entrar en debJobs, buscar un puesto de python en remoto y marcarlo como favorito", async () => {
    const stagehand = new Stagehand({
        env: "LOCAL",
        model: "google/gemini-2.5-flash-lite",
        modelClientOptions: {
            apiKey: process.env.GOOGLE_API_KEY,
        },
    });

    await stagehand.init();

    const [page] = stagehand.context.pages();

    await page.goto("http://localhost:5173");

    await stagehand.act('clica en el botón "iniciar sesión"');
    await stagehand.act("rellena el campo email con 'lor@en.a'");
    await stagehand.act("rellena el campo contraseña con '12aB56'");
    await stagehand.act('clica en el botón "iniciar sesión" que hay debajo de del campo contraseña');
    await stagehand.act("selección la ubicación remoto en el selector de ubicaciones");
    await stagehand.act("selección la tecnología python en el selector de  tecnologías");
    await stagehand.act("clica en el botón buscar");
    await stagehand.act("clica en el botón de favoritos de uno de ellos");

    const { extraction } = await stagehand.extract("obtén el número de favoritos del usuario");
    console.log(extraction);

    assert.notEqual(extraction, 0);

    await stagehand.close();
});
