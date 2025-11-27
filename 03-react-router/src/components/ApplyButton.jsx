import { useAuthStore } from "../store/authStore";
import styles from "./../pages/Detail.module.css";

export const ApplyButton = () => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    return (
        <>
            <button className={styles.applyButton} disabled={!isLoggedIn}>
                {isLoggedIn ? "Aplicar ahora" : "Inicia sesión para aplicar"}
            </button>
        </>
    );
};
