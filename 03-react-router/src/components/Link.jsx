import { useRouter } from "../hooks/useRouter";

export const Link = ({ href, children, ...restOfProps }) => {
    const { navigateTo, currentPath } = useRouter();
    const handleClick = (event) => {
        event.preventDefault();
        navigateTo(href);
    };
    const clase = currentPath === href ? "menuActivo" : "";
    return (
        <a href={href} {...restOfProps} className={clase} onClick={handleClick}>
            {children}
        </a>
    );
};
