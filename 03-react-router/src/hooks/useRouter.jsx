import { useEffect, useState } from "react";

// Custom hook to get the current path
export const useRouter = () => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener("popstate", onLocationChange);

        return () => {
            //limpieza del evento para no dejar listeners colgados
            window.removeEventListener("popstate", onLocationChange);
        };
    }, []);
    const navigateTo = (path) => {
        window.history.pushState({}, "", path);
        window.dispatchEvent(new PopStateEvent("popstate"));
    };
    return { currentPath, navigateTo };
};
