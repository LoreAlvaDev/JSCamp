import { JobListings } from "../components/JobListings.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { SearchFormSection } from "../components/SearchFormSection.jsx";
import { useFilterJobs, RESULTS_PER_PAGE } from "../hooks/useFilterJobs.jsx";

export const SearchPage = () => {
    // const [currentPage, setCurrentPage] = useState(1);
    const { jobs, totalJobs, loading, currentPage, error, handlePageChange, handleSearch, handleTextFilter, textFilter, filters } = useFilterJobs();
    const title = `Resultados: ${totalJobs} - Pagina ${currentPage} - DevJobs`;

    return (
        <div className="search-results">
            <main>
                <title>{title}</title>
                <SearchFormSection initialText={textFilter} initialFilters={filters} onSearch={handleSearch} onTextFilter={handleTextFilter} />
                <section>
                    {error ? (
                        <p className="text-danger">Ha habido un error</p>
                    ) : loading ? ( // mostrar un spinner de carga mientras se obtienen los datos
                        <div className="spinner"></div>
                    ) : (
                        <>
                            <JobListings jobs={jobs} numJobs={totalJobs} />
                            <p>
                                Mostrando {(currentPage - 1) * RESULTS_PER_PAGE + 1} - {Math.min(currentPage * RESULTS_PER_PAGE, totalJobs)} de {totalJobs} trabajos
                            </p>
                            <Pagination numPags={Math.ceil(totalJobs / RESULTS_PER_PAGE)} paginaActual={currentPage} onPageChange={handlePageChange} />
                        </>
                    )}
                </section>
            </main>
        </div>
    );
};
