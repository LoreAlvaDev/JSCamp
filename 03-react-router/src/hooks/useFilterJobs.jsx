import { useEffect, useState } from "react";
//import jobs from "../data.json";
import { useSearchParams } from "react-router";
import { useRouter } from "./useRouter";

export const RESULTS_PER_PAGE = 10;

export const useFilterJobs = () => {
    const [textFilter, setTextFilter] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get("text") || "";
    });
    const [filters, setFilters] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return {
            level: params.get("level") || "",
            contract: params.get("contract") || "",
            type: params.get("type") || "",
            technology: params.get("technology") || "",
        };
    });
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const [jobs, setJobs] = useState([]);
    const [totalJobs, setTotalJobs] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const { navigateTo } = useRouter();

    const fetchJobs = async () => {
        try {
            const params = new URLSearchParams();
            if (textFilter) {
                params.append("text", textFilter);
            }
            Object.entries(filters).forEach(([key, value]) => {
                if (value) {
                    params.append(key, value);
                }
            });
            params.append("offset", (currentPage - 1) * RESULTS_PER_PAGE);
            params.append("limit", RESULTS_PER_PAGE);

            const queryString = params.toString() ? `?${params.toString()}` : "";

            setLoading(true);
            const response = await fetch(`https://jscamp-api.vercel.app/api/jobs${queryString}`);
            const data = await response.json();
            setJobs(data.data);
            setTotalJobs(data.total);
            setError(false);
        } catch (error) {
            console.error("Error fetching jobs:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    useEffect(() => {
        fetchJobs();
    }, [textFilter, filters, currentPage]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (textFilter) {
            params.append("text", textFilter);
        }
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                params.append(key, value);
            }
        });
        if (currentPage > 1) params.append("page", currentPage);
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        navigateTo(newUrl);
    }, [textFilter, filters, currentPage, navigateTo]);

    const handlePageChange = (page) => {
        // setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setSearchParams({ page });
    };

    const handleSearch = (filter) => {
        setFilters(filter);
        // setCurrentPage(1); // Reiniciar a la primera página al cambiar los filtros de búsqueda
        window.scrollTo({ top: 0, behavior: "smooth" });
        setSearchParams({ page: 1 });
    };

    const handleTextFilter = (newText) => {
        setTextFilter(newText);
        // setCurrentPage(1); // Reiniciar a la primera página al cambiar el filtro de texto
        window.scrollTo({ top: 0, behavior: "smooth" });
        setSearchParams({ page: 1 });
    };

    return { jobs, totalJobs, loading, currentPage, error, textFilter, filters, handlePageChange, handleSearch, handleTextFilter };
};
