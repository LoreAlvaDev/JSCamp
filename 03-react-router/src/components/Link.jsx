import { Link as NavLink } from "react-router";
// import { useRouter } from "../hooks/useRouter";

export const Link = ({ href, children, ...restOfProps }) => {
    // const { currentPath } = useRouter();
    // const clase = currentPath === href ? className + "menuActivo" : className;

    return (
        <NavLink to={href} {...restOfProps}>
            {children}
        </NavLink>
    );
};
