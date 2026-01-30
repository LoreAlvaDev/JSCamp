import { Router } from "express";
import { JobController } from "../controllers/jobs.js";
import { validateJob, validatePartialJob } from "../schemas/jobs.js";

const jobRouter = Router();
//ahora ya sabe que está en /jobs

const validateCreate = (req, res, next) => {
    const result = validateJob(req.body);
    if (result.success) {
        req.body = result.data; // vamos a tener los datos validados y limpios
        return next();
    }
    return res.status(400).json({ error: "Invalid request", details: result.error.errors });
};

const validateUpdate = (req, res, next) => {
    const result = validatePartialJob(req.body);
    if (result.success) {
        req.body = result.data; // vamos a tener los datos validados y limpios
        return next();
    }
    return res.status(400).json({ error: "Invalid request", details: result.error.errors });
};

jobRouter.get("/", JobController.getAll);

jobRouter.get("/:id", JobController.getId);

jobRouter.delete("/", JobController.deleteAll);

jobRouter.delete("/:id", JobController.delete);

//crear nuevo job
jobRouter.post("/", validateCreate, JobController.create);

//sustituir job
jobRouter.put("/:id", validateUpdate, JobController.update);

//actualizar job
jobRouter.patch("/:id", JobController.partialUpdate);

export { jobRouter as jobsRouter };
