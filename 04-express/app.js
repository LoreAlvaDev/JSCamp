import express from "express";
import { DEFAULTS } from "./config.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { jobsRouter } from "./routes/jobs.js";

const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express();

//leer el fichero de jobs
const { default: jobs } = await import("./jobs.json", { with: { type: "json" } });

app.use((req, res, next) => {
    const timeString = new Date().toISOString();
    console.log(`[${timeString}] ${req.method} - ${req.url}`);
    next();
});

app.use(corsMiddleware());

app.use(express.json());

app.use("/jobs", jobsRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
