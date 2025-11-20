import { useRouter } from "../hooks/useRouter";

export const Route = ({ path, component: Component }) => {
    const { currentPath } = useRouter();
    if (currentPath !== path) return null;
    return <Component />;
};
