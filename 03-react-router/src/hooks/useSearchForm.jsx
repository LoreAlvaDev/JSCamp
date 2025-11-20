import { useRef, useState } from "react";

//let timeoutRef = null;

export const useSearchForm = ({ searchId, techSelectId, locationSelectId, contractSelectId, experienceSelectId, onSearch, onTextFilter }) => {
    const timeoutRef = useRef(null);
    const [searchText, setSearchText] = useState("");
    const [filtering, setFiltering] = useState(false);

    const handleChange = (event) => {
        // Detectar submit (onSubmit) o cambio (onChange)
        const isSubmit = event.type === "submit" || (event.target && event.target.tagName === "FORM");

        if (isSubmit) {
            event.preventDefault();
        }

        // Si es el input de búsqueda de texto
        if (!isSubmit && event.target && event.target.name === searchId) {
            const text = event.target.value;
            setSearchText(text);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => onTextFilter(text), 750);
            setFiltering(text.length > 0);
            return;
        }

        // Obtener el formulario (si es submit, event.target es el form)
        const form = isSubmit ? event.target : event.target.form;
        if (!form) return;

        const formData = new FormData(form);
        const searchParams = {
            technology: formData.get(techSelectId),
            type: formData.get(locationSelectId),
            contract: formData.get(contractSelectId),
            level: formData.get(experienceSelectId),
        };

        onSearch(searchParams);
        setFiltering(Object.values(searchParams).some((v) => v));
    };

    // Conservamos wrapper por compatibilidad si algún componente sigue llamando handleSubmit
    // const handleSubmit = (event) => handleChange(event);

    const handleReset = (ev) => {
        // ev puede venir de un botón dentro del form: ev.target.form es el form
        const form = ev.target.form ?? ev.target;
        if (form && typeof form.reset === "function") form.reset();
        setFiltering(false);
        setSearchText("");
        onSearch({});
    };

    return {
        searchText,
        filtering,
        handleReset,
        // handleSubmit, // opcional, delega en handleChange
        handleChange, // ahora maneja tanto change como submit
    };
};
