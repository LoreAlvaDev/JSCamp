import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import styles from "./Detail.module.css";
import snarkdown from "snarkdown";
import { ApplyButton } from "../components/ApplyButton";
import { FavoriteButton } from "../components/FavoriteButton";

export const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`https://jscamp-api.vercel.app/api/jobs/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Job not found");
                }
                return res.json();
            })
            .then((data) => setJob(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
                <div className={styles.loading}>
                    <p className={styles.loadingText}>Cargando...</p>
                </div>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
                <div className={styles.error}>
                    <h2 className={styles.errorTitle}>Oferta no encontrada</h2>
                    <button onClick={() => navigate("/")} className={styles.errorButton}>
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section>
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
                <div className={styles.container}>
                    <nav className={styles.breadcrumb}>
                        <Link to="/search" className={styles.breadcrumbLink}>
                            Empleos
                        </Link>
                        / <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
                    </nav>
                    <header className={styles.header}>
                        <h1 className={styles.title}>{job.titulo}</h1>
                        <p className={styles.meta}>
                            {job.empresa} · {job.ubicacion}
                        </p>
                    </header>
                    <JobSection title="Descripción del trabajo" content={job.content.description} />
                    <JobSection title="Responsabilidades" content={job.content.responsibilities} />
                    <JobSection title="Requisitos" content={job.content.requirements} />
                    <JobSection title="¿Cómo aplicar?" content={job.content.about} />
                    <div className="button-apply-now">
                        <ApplyButton jobId={job.id} />
                        <FavoriteButton jobId={job.id} />
                    </div>
                </div>
            </div>
        </section>
    );
};

const JobSection = ({ title, content }) => {
    // console.log(title, "content:", content);
    const html = snarkdown(content);
    // console.log(html);

    return (
            <section className={styles.section}>
            <h2 className={`${styles.sectionTitle} prose`}>{title}</h2>
            <div className={`${styles.jobSectionContent} requirements`} dangerouslySetInnerHTML={{ __html: html }}></div>
        </section>
    );
};
export default Detail;
