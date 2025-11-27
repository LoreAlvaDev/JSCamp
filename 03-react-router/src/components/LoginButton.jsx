import { useMemo } from "react";
import { DevJobsAvatar } from "./DevJobsAvatar";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router";
import { useFavoritesStore } from "../store/favoritesStore";

export const LoginButton = () => {
    const { isLoggedIn, logout } = useAuthStore();
    const avatar = useMemo(() => {
        return <DevJobsAvatar service="x" username="mi8dev" size="50" />;
    }, []);
    const { clearFavorites } = useFavoritesStore();
    const navigate = useNavigate();
    const handleLogin = () => {
        // Aquí podrías redirigir a la página de login o abrir un modal
        // Por ejemplo, usando react-router:
        navigate("/login");
    };

    const handleLogout = () => {
        clearFavorites();
        logout();
    };

    return (
        <>
            {isLoggedIn ? (
                <>
                    {avatar}
                    <button onClick={handleLogout} className="jobApplybtn ">
                        Cerrar sesión
                    </button>
                </>
            ) : (
                <button onClick={handleLogin} className="jobApplybtn ">
                    Iniciar sesión
                </button>
            )}
        </>
    );
};
