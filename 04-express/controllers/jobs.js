import { DEFAULTS } from "../config.js";
import { JobModel } from "../models/job.js";

export class JobController {
    static async getAll(req, res) {
        res.header("Access-Control-Allow-Origin", "http://localhost:5173");
        // console.log(req.query);
        const { limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.LIMIT_OFFSET, technology, text, title, level, type, contract } = req.query;
        const data = await JobModel.getAll({ limit, offset, technology, text, title, level, type, contract });
        return res.json({ data: data.data, total: data.total, limit, offset });
    }

    static async getId(req, res) {
        const { id } = req.params;
        const job = await JobModel.getById(id);
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        return res.json({ job });
    }

    static async create(req, res) {
        //previamente hay que parsear el json del body en un middleware
        // console.log(`creando ${req.body}`);
        const { titulo, empresa, ubicacion, descripcion, data } = req.body;

        const newJob = await JobModel.create({ titulo, empresa, descripcion, ubicacion, data });
        return res.status(201).json(newJob);
    }

    static async deleteAll(req, res) {
        return res.status(403).json({ error: "No tienes permiso para eliminar todos los trabajos" });
    }

    static async update(req, res) {
        //previamente hay que parsear el json del body en un middleware
        const { id } = req.params;
        const { titulo, empresa, ubicacion, descripcion, data } = req.body;
        // console.log(`modificando ${id}`);
        const updated = await JobModel.update({ id, titulo, empresa, ubicacion, descripcion, data });
        return res.json(updated);
    }

    static async partialUpdate(req, res) {
        const { id } = req.params;
        if (!req.body) return res.status(500).json({ error: "se necesitan parámetros" });
        const { titulo, empresa, ubicacion, descripcion, data } = req.body;
        // console.log(`modificando patch ${id}`);
        const updated = await JobModel.partialUpdate({ id, titulo, empresa, ubicacion, descripcion, data });
        // console.log("recibimos", updated);
        return res.json(updated);
    }

    static async delete(req, res) {
        const { id } = req.params;
        const deleted = await JobModel.delete(id);
        if (!deleted) {
            return res.status(404).json({ error: "Job not found" });
        }
        return res.status(204).json({});
    }
}
