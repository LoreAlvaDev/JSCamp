import express from "express";
// import { jobs } from "./jobs.json" with { type: "json" };
import { DEFAULTS } from "./config.js";

const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express();

//leer el fichero de jobs
const { default: jobs } = await import("./jobs.json", { with: { type: "json" } });

app.use((req, res, next) => {
    const timeString = new Date().toISOString();
    console.log(`[${timeString}] ${req.method} - ${req.url}`);
    next();
});

const previousHomeMiddleWare = (req, res, next) => {
    console.log("cosas antes de home");
    next();
};

app.get("/", previousHomeMiddleWare, (req, res) => {
    res.send("<h1>Hola Mundo con Express</h1>");
});

app.get("/health", (req, res) => {
    return res.json({ status: "OK", uptime: process.uptime() });
});

app.get("/get-jobs", async (req, res) => {
    console.log(req.query);
    const { limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.LIMIT_OFFSET, technology, text, title, level } = req.query;

    let filteredJobs = jobs;
    //vamos a filtrar
    console.log(filteredJobs.length, text);
    if (text) {
        const searchTerm = text.toLowerCase();
        console.log(searchTerm);
        filteredJobs = filteredJobs.filter((job) => {
            return job.titulo.toLowerCase().includes(searchTerm) || job.descripcion.toLowerCase().includes(searchTerm);
        });
    }
    console.log(filteredJobs.length, technology);
    if (technology) {
        filteredJobs = filteredJobs.filter((job) => job.data.technology.includes(technology.toLowerCase()));
    }

    console.log(filteredJobs.length);

    const nLimit = Number(limit);
    const nOffset = Number(offset);

    const paginatedJobs = filteredJobs.slice(nOffset, nOffset + nLimit);

    return res.json({ paginatedJobs });
});

app.get("/get-single-job/:id", (req, res) => {
    const jobId = req.params.id;

    const job = jobs.find((job) => job.id === jobId);

    if (!job) {
        return res.status(404).json({ error: "Job not found" });
    }
    return res.json({ job });
});

//opcional con {} -> abcd o acd
app.get("/a{b}cd", (req, resp) => {
    return resp.send("abcd o acd");
});

//el comodin *
//sirve sobre todo pararutas más largas que no saben como terminan
// por ejemplo /file/*filename <- lo que sea se llama filename
app.get("/bb*bb", (req, resp) => {
    console.log(req);
    return resp.send("comodin");
});

//usando regex
app.get(/.*fly$/, (req, res) => {
    return res.send("termina en fly");
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
