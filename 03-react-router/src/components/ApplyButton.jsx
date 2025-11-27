import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "./../pages/Detail.module.css";

export const ApplyButton = () => {
    const { isLoggedIn } = useContext(AuthContext);
    return (
        <>
            <button className={styles.applyButton} disabled={!isLoggedIn}>
                {isLoggedIn ? "Aplicar ahora" : "Inicia sesión para aplicar"}
            </button>
        </>
    );
};
