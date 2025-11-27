import { useMemo } from "react";
import { DevJobsAvatar } from "./DevJobsAvatar";
import { useAuthStore } from "../store/authStore";

export const LoginButton = () => {
    const { isLoggedIn, login, logout } = useAuthStore();
    const avatar = useMemo(() => {
        return <DevJobsAvatar service="x" username="mi8dev" size="50" />;
    }, []);

    return (
        <>
            {isLoggedIn ? (
                <>
                    {avatar}
                    <button onClick={logout} className="jobApplybtn ">
                        Cerrar sesión
                    </button>
                </>
            ) : (
                <button onClick={login} className="jobApplybtn ">
                    Iniciar sesión
                </button>
            )}
        </>
    );
};
