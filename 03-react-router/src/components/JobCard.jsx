import { Badge } from "./Badge";
import { Link } from "./Link";
import styles from "./JobCard.module.css";
import { FavoriteButton } from "./FavoriteButton";
import { ApplyButton } from "./ApplyButton";

export const JobCard = ({ job, isFeatured = true, isNew = true }) => {
    // extraemos las propiedades del objeto job
    const { titulo, empresa, ubicacion, salary, descripcion, tags, contract, experience } = job;
    const isRemote = ubicacion?.toLowerCase().includes("remote") || ubicacion?.toLowerCase().includes("remoto");

    return (
        <article
            className="job-listing-card"
            data-ubicacion={ubicacion?.toLowerCase()}
            data-tecnologia={tags?.map((tech) => tech.toLowerCase()).join(", ")}
            data-contrato={contract?.toLowerCase().replace(" ", "-")}
            data-experiencia={experience?.toLowerCase().replace(" ", "-")}>
            <header className="job-card-header">
                <h3 className="job-title">
                    <Link className={styles.title} href={`/jobs/${job.id}`}>
                        {titulo}
                    </Link>
                </h3>

                <p className="job-company">{empresa}</p>
                <div className="badges">
                    {isNew && <Badge type="new">🆕 Nuevo</Badge>}
                    {isFeatured && <Badge type="featured">⭐ Destacado</Badge>}
                    {isRemote && <Badge type="remote">🏠 Remoto</Badge>}
                </div>
            </header>
            <div className="job-card-body">
                <p className="job-location">📍 {ubicacion}</p>
                {/* <p className="job-salary">💰 {salary}</p> */}
                <p className="job-description">{descripcion}</p>
            </div>
            <footer className="job-card-footer">
                <div className={styles.actions}>
                    <span className="job-tags">{tags?.join(", ")}</span>
                    <div>
                        <Link href={`/jobs/${job.id}`} className={styles.details}>
                            Ver detalles
                        </Link>
                    </div>
                    <div className="button-apply-now">
                        <ApplyButton jobId={job.id} />
                        <FavoriteButton jobId={job.id} />
                    </div>
                </div>
            </footer>
        </article>
    );
};
