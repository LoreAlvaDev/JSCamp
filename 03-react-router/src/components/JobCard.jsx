import { useState } from "react";
import { Badge } from "./Badge";

export const JobCard = ({ job, isFeatured = true, isNew = true }) => {
    // extraemos las propiedades del objeto job
    const { titulo, empresa, ubicacion, salary, descripcion, tags, contract, experience } = job;
    const isRemote = ubicacion?.toLowerCase().includes("remote") || ubicacion?.toLowerCase().includes("remoto");
    const [isApplied, setIsApplied] = useState(false);

    const buttonClasses = `jobApplybtn ${isApplied ? "is-applied" : ""}`;
    const textBtn = isApplied ? "Aplicado" : "Aplicar";
    const handleClick = () => {
        setIsApplied(!isApplied);
    };

    return (
        <article
            className="job-listing-card"
            data-ubicacion={ubicacion?.toLowerCase()}
            data-tecnologia={tags?.map((tech) => tech.toLowerCase()).join(", ")}
            data-contrato={contract?.toLowerCase().replace(" ", "-")}
            data-experiencia={experience?.toLowerCase().replace(" ", "-")}>
            <header className="job-card-header">
                <h3 className="job-title">{titulo}</h3>
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
                <span className="job-tags">{tags?.join(", ")}</span>
                <button className={buttonClasses} disabled={isApplied} onClick={handleClick}>
                    {textBtn}
                </button>
            </footer>
        </article>
    );
};
