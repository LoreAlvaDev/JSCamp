import { useAuth } from "../hooks/useAuth";
import styles from "./../pages/Detail.module.css";

export const ApplyButton = () => {
    const { isLoggedIn } = useAuth();
    return (
        <>
            <button className={styles.applyButton} disabled={!isLoggedIn}>
                {isLoggedIn ? "Aplicar ahora" : "Inicia sesión para aplicar"}
            </button>
        </>
    );
};
