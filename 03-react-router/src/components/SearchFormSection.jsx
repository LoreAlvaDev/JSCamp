import { useSearchForm } from "../hooks/useSearchForm";
import styles from "./SearchFormSection.module.css";
import { useId, useState } from "react";

export const SearchFormSection = ({ onSearch, onTextFilter, initialText, initialFilters }) => {
    //generamos identificadores para el formulario y sus elementos
    const searchId = useId();
    const techSelectId = useId();
    const locationSelectId = useId();
    const contractSelectId = useId();
    const experienceSelectId = useId();

    const {
        // searchText,
        filtering,
        // handleSubmit,
        handleChange,
        // handleTextChange,
        handleReset,
    } = useSearchForm({
        searchId,
        techSelectId,
        locationSelectId,
        contractSelectId,
        experienceSelectId,
        onSearch,
        onTextFilter,
    });
    //estado para saber qué campo está activo
    const [focusedField, setFocusedField] = useState(null);

    console.log(initialFilters);

    const handleSelectChange = (ev) => {
        console.log(ev.target.value);
    };

    return (
        <section>
            <h2 className="titulazo">Encuentra tu próximo trabajo</h2>
            <p>Explora miles de oportunidades en el sector tecnológico</p>
            <form role="search" id="empleos-search-form" name="formulario" onSubmit={handleChange}>
                <div className={styles.formGroup}>
                    <div className={styles.buscador}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-search">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                            <path d="M21 21l-6 -6" />
                        </svg>
                        <input
                            type="text"
                            name={searchId}
                            id="empleos-search-input"
                            placeholder="Buscar empleos por título o empresa"
                            onChange={handleChange}
                            defaultValue={initialText}
                            onFocus={() => setFocusedField("search")}
                            onBlur={() => setFocusedField(null)}
                        />
                        {focusedField === "search" && <small className={styles.inputHint}>Busca por título de trabajo o empresa</small>}
                    </div>
                </div>
                <div className="botonera">
                    <div className={styles.formGroup}>
                        <select
                            name={techSelectId}
                            id="tecnologia-select"
                            // onChange={handleChange}
                            onFocus={() => setFocusedField("tech")}
                            onBlur={() => setFocusedField(null)}
                            defaultValue={initialFilters?.technology || ""}>
                            <option value="">Todas las tecnologías</option>
                            <optgroup label="Frontend">
                                <option value="html">HTML</option>
                                <option value="css">CSS</option>
                                <option value="javascript">JavaScript</option>
                                <option value="react">React</option>
                                <option value="vue">Vue</option>
                            </optgroup>
                            <optgroup label="Backend">
                                <option value="node">Node.js</option>
                                <option value="python">Python</option>
                                <option value="php">PHP</option>
                                <option value="java">Java</option>
                            </optgroup>
                            <optgroup label="Base de datos">
                                <option value="mysql">MySQL</option>
                                <option value="mongodb">MongoDB</option>
                                <option value="postgresql">PostgreSQL</option>
                            </optgroup>
                            <option value="mobile">Móvil</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <select
                            name={locationSelectId}
                            id="ubicacion-select"
                            // onChange={handleChange}
                            defaultValue={initialFilters?.type || ""}
                            onFocus={() => setFocusedField("location")}
                            onBlur={() => setFocusedField(null)}
                            className={`${focusedField === "location" ? styles.inputFocused : ""} selectFiltro`}>
                            <option value="">Todas las ubicaciones</option>

                            <optgroup label="España">
                                <option value="madrid">Madrid</option>
                                <option value="barcelona">Barcelona</option>
                                <option value="valencia">Valencia</option>
                            </optgroup>

                            <optgroup label="México">
                                <option value="ciudad de méxico">Ciudad de México</option>
                                <option value="monterrey">Monterrey</option>
                                <option value="guadalajara">Guadalajara</option>
                            </optgroup>

                            <hr />

                            <option value="remoto">🌍 Remoto</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <select
                            name={contractSelectId}
                            id="contrato-select"
                            // onChange={handleChange}
                            defaultValue={initialFilters?.contract || ""}
                            onFocus={() => setFocusedField("contrato")}
                            onBlur={() => setFocusedField(null)}
                            className={`${focusedField === "contrato" ? styles.inputFocused : ""} selectFiltro`}>
                            <option value="">Cualquier contratos</option>
                            <option value="tiempo-completo">Tiempo completo</option>
                            <option value="medio-tiempo">Medio tiempo</option>
                            <option value="temporal">Temporal</option>
                            <option value="practicas">Prácticas</option>
                            <option value="freelance">Freelance</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <select
                            name={experienceSelectId}
                            id="experiencia-select"
                            // onChange={handleChange}
                            defaultValue={initialFilters?.level || ""}
                            onFocus={() => setFocusedField("experiencia")}
                            onBlur={() => setFocusedField(null)}
                            className={`${focusedField === "experiencia" ? styles.inputFocused : ""} selectFiltro`}>
                            <option value="">Todos los niveles</option>
                            <option value="junior">Junior</option>
                            <option value="mid">Mid-level</option>
                            <option value="senior">Senior</option>
                            <hr />
                            <option value="intern">Prácticas</option>
                            <option value="freelance">Freelance</option>
                        </select>
                    </div>

                    <button type="submit" className={styles.botonBuscar}>
                        Buscar
                    </button>
                    {filtering && (
                        <button type="reset" className={styles.botonLimpiar} onClick={handleReset}>
                            Limpiar
                        </button>
                    )}
                </div>
            </form>
        </section>
    );
};
