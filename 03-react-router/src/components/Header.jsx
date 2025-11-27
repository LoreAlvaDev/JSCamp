import { NavLink as Link } from "react-router";
import { LoginButton } from "./LoginButton";
import { useFavoritesStore } from "../store/favoritesStore";
import { useAuthStore } from "../store/authStore";

export const Header = () => {
    const { isLoggedIn } = useAuthStore();
    const { countFavorites } = useFavoritesStore();

    const numberOfFavorites = countFavorites();

    return (
        <header className="headerFijado">
            <div className="barraNavegacion">
                <div className="empresa">
                    <Link to="/" className={({ isActive }) => (isActive ? "menuActivo" : "")} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
                        <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path
                                clipRule="evenodd"
                                d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
                                fill="currentColor"
                                fillRule="evenodd"></path>
                        </svg>
                        <h1 style={{ color: "white" }}>DevJobs</h1>
                    </Link>
                </div>
                <nav>
                    <Link to="/search" className={({ isActive }) => (isActive ? "menuActivo" : "")}>
                        Empleos
                    </Link>
                    {/* <Link to="">Empresas</Link>
                    <Link to="">Salarios</Link> */}
                    <Link to="/contact" className={({ isActive }) => (isActive ? "menuActivo" : "")}>
                        Contacto
                    </Link>
                    {isLoggedIn && (
                        <Link to="/profile" className={({ isActive }) => (isActive ? "menuActivo" : "")}>
                            Profile (❤️ {numberOfFavorites})
                        </Link>
                    )}
                </nav>
            </div>
            <div className="acciones">
                <a href="" className="botonAzul">
                    Subir CV
                </a>
                <LoginButton />
            </div>
        </header>
    );
};
