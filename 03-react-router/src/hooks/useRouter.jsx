import { useNavigate, useLocation } from "react-router";
// Custom hook to get the current path
export const useRouter = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navigateTo = (path) => {
        console.log("navego a ", path);

        navigate(path);
    };
    return { currentPath: location.pathname, navigateTo };
};
