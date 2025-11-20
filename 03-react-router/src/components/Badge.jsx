import styles from "./Badge.module.css";
export function Badge({ children, type = "default" }) {
    return <span className={`${styles.badge} ${styles[type]}`}>{children}</span>;
}
