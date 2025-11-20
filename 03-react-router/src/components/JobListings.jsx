// import { jobs } from "../src/data.js";
import { JobCard } from "./JobCard.jsx";

export const JobListings = ({ jobs, numJobs }) => {
    return (
        <>
            <header>
                <h2>Resultados de búsqueda ({numJobs})</h2>
            </header>
            {/* <!-- Se añadirán los resultados aquí dinámicamente. --> */}
            <div className="jobs-listing">
                {jobs.length === 0 && <p style={{ textAlign: "center", padding: "1rem", textWrap: "balance" }}>No se han encontrado resultados</p>}
                {jobs.map((job) => (
                    <JobCard key={job.id} job={job} isFeatured={Math.random() < 0.5} isNew={Math.random() < 0.5} />
                ))}
            </div>
        </>
    );
};
