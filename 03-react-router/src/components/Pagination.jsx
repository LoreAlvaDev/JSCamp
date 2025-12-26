import styles from "./Pagination.module.css";

export const Pagination = ({ numPags = 1, paginaActual = 1, onPageChange }) => {
    // const url = "../empleos.html";
    // const url = "#";

    const handlePrevClick = (event) => {
        event.preventDefault();
        if (paginaActual > 1) {
            onPageChange(paginaActual - 1);
        }
    };

    const handleNextClick = (event) => {
        event.preventDefault();
        if (paginaActual < numPags) {
            onPageChange(paginaActual + 1);
        }
    };

    const handleChangePage = (event, page) => {
        event.preventDefault();
        if (page !== paginaActual) {
            onPageChange(page);
        }
    };

    const buildPageUrl = (page) => {
        const url = new URL(window.location);
        url.searchParams.set("page", page);
        return `${url.pathname}?${url.searchParams.toString()}`;
    };
    return (
        <>
            <nav className={styles.paginacion}>
                <a href={buildPageUrl(paginaActual - 1)} onClick={handlePrevClick} className={paginaActual === 1 ? styles.isDisabled : ""}  aria-disabled={paginaActual === 1}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M15 6l-6 6l6 6" />
                    </svg>
                </a>
                {Array.from({ length: numPags }, (_, i) => i + 1).map((i) => (
                    <a key={i} onClick={(e) => handleChangePage(e, i)} href={buildPageUrl(i)} className={i === paginaActual ? styles.paginaActual : ""}>
                        {i}
                    </a>
                ))}
                <a href={buildPageUrl(parseInt(paginaActual) + 1)} onClick={handleNextClick} className={paginaActual === numPags ? styles.isDisabled : ""}
                 aria-disabled={paginaActual === 1}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 6l6 6l-6 6" />
                    </svg>
                </a>
            </nav>
        </>
    );
};
