import { DEFAULTS } from "../config.js";
import jobs from "../jobs.json" with { type: "json" };

export class JobModel {
    static async getAll({ limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.LIMIT_OFFSET, technology, text, type, level, contract }) {
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
        if (type) {
            filteredJobs = filteredJobs.filter((job) => {
                return job.ubicacion.toLowerCase() === type.toLowerCase();
            });
        }
        if (level) {
            filteredJobs = filteredJobs.filter((job) => {
                return job.data.nivel.toLowerCase() === level.toLowerCase();
            });
        }
        // if (contract) {
        //     filteredJobs = filteredJobs.filter((job) => {
        //         return job.data.nivel.toLowerCase() === contract.toLowerCase();
        //     });
        // }

        console.log(filteredJobs.length);

        const nLimit = Number(limit);
        const nOffset = Number(offset);

        const paginatedJobs = filteredJobs.slice(nOffset, nOffset + nLimit);
        //TODO faltan datos aqui

        return { data: paginatedJobs, total: filteredJobs.length };
    }

    static async create({ titulo, descripcion, empresa, ubicacion, data }) {
        const newJob = {
            id: crypto.randomUUID(),
            titulo,
            descripcion,
            empresa,
            ubicacion,
            data,
        };
        jobs.push(newJob);
        console.log(
            jobs.length,
            jobs.reduce((prev, j) => prev + "," + j.empresa, ""),
        );
        return newJob;
    }

    static async getById(id) {
        const job = jobs.find((job) => job.id === id);
        return job;
    }

    static async update({ id, titulo, empresa, ubicacion, descripcion, data }) {
        const updatedJob = { id, titulo, empresa, ubicacion, descripcion, data };

        const index = jobs.findIndex((job) => job.id === id);
        console.log(updatedJob, id, index);

        if (index !== -1) {
            jobs[index] = updatedJob;
        } else {
            jobs.push(updatedJob);
        }
        return updatedJob;
    }

    static async partialUpdate({ id, titulo, empresa, ubicacion, descripcion, data }) {
        const updatedJob = await this.getById(id);
        //rellenar solo los campos que vengan
        if (updatedJob) {
            if (titulo !== undefined) updatedJob.titulo = titulo;
            if (empresa !== undefined) updatedJob.empresa = empresa;
            if (ubicacion !== undefined) updatedJob.ubicacion = ubicacion;
            if (descripcion !== undefined) updatedJob.descripcion = descripcion;
            if (data !== undefined) updatedJob.data = data;

            const index = jobs.findIndex((job) => job.id === id);
            console.log(updatedJob, id, index);

            if (index !== -1) {
                jobs[index] = updatedJob;
            } else {
                jobs.push(updatedJob);
            }
            return updatedJob;
        }
        console.log("no lo encontramos");
        return null;
    }

    static async delete(id) {
        const index = jobs.findIndex((job) => job.id === id);
        console.log(id, index);
        if (index !== -1) {
            jobs.splice(index, 1);
        }
        console.log(jobs.length);
        return index !== -1;
    }
}
