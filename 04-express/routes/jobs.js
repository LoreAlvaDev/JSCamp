import { Router } from "express";
import { JobController } from "../controllers/jobs.js";

const jobRouter = Router();
//ahora ya sabe que está en /jobs
jobRouter.get("/", JobController.getAll);

jobRouter.get("/:id", JobController.getId);

jobRouter.delete("/", JobController.deleteAll);

jobRouter.delete("/:id", JobController.delete);

//crear nuevo job
jobRouter.post("/", JobController.create);

//sustituir job
jobRouter.put("/:id", JobController.update);

//actualizar job
jobRouter.patch("/:id", JobController.partialUpdate);

export { jobRouter as jobsRouter };
