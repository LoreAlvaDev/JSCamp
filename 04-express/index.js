import express from "express";
import { DEFAULTS } from "./config.js";
import cors from "cors";

const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express();

//leer el fichero de jobs
const { default: jobs } = await import("./jobs.json", { with: { type: "json" } });

const ACCEPTED_ORIGINS = ["http://localhost:5174", "http://localhost:5173"];

app.use(
    cors({
        origin: (origin, callback) => {
            console.log(origin, ACCEPTED_ORIGINS);
            if (ACCEPTED_ORIGINS.includes(origin)) {
                callback(null, true);
            }
            return callback(new Error("Origen no permitido " + origin));
        },
    }),
);

app.use((req, res, next) => {
    const timeString = new Date().toISOString();
    console.log(`[${timeString}] ${req.method} - ${req.url}`);
    next();
});
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>Hola Mundo con Express</h1>");
});

app.get("/health", (req, res) => {
    return res.json({ status: "OK", uptime: process.uptime() });
});

app.get("/jobs", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
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
    return res.json({ data: paginatedJobs, total: filteredJobs.length });
});

const obtenerJob = (id) => {
    return jobs.find((job) => job.id === id);
};

app.get("/jobs/:id", (req, res) => {
    const jobId = req.params.id;

    const job = obtenerJob(jobId);

    if (!job) {
        return res.status(404).json({ error: "Job not found" });
    }
    return res.json({ job });
});

app.delete("/jobs", (req, res) => {
    return res.status(403).json({ error: "No tienes permiso para eliminar todos los trabajos" });
});

app.delete("/jobs/:id", (req, res) => {
    const jobId = req.params.id;

    const job = obtenerJob(jobId);

    if (!job) {
        return res.status(404).json({ error: "Job not found" });
    }

    return res.status(403).json({ error: "No tienes permiso para eliminar trabajos" });
});

//crear nuevo job
app.post("/jobs", (req, res) => {
    //previamente hay que parsear el json del body en un middleware
    console.log(`creando ${req.body}`);
    const { titulo, empresa, ubicacion, data } = req.body;
    const newJob = {
        id: crypto.randomUUID(),
        titulo,
        empresa,
        ubicacion,
        data,
    };
    jobs.push(newJob);
    return res.status(201).json(newJob);
});

//sustituir job
app.put("/jobs/:id", (req, res) => {
    const jobId = req.params.id;

    const job = obtenerJob(jobId);

    if (!job) {
        return res.status(404).json({ error: "Job not found" });
    }

    return res.status(201);
});

//actualizar job
app.patch("/jobs/:id", (req, res) => {
    const jobId = req.params.id;

    const job = obtenerJob(jobId);

    if (!job) {
        return res.status(404).json({ error: "Job not found" });
    }
    return res.status(201);
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
