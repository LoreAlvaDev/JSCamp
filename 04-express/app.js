import express from "express";
import { DEFAULTS } from "./config.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { jobsRouter } from "./routes/jobs.js";

const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express();

app.use((req, res, next) => {
    const timeString = new Date().toISOString();
    console.log(`[${timeString}] ${req.method} - ${req.url}`);
    next();
});

app.use(corsMiddleware());

app.use(express.json());

app.use("/jobs", jobsRouter);

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test")
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });

export default app;
