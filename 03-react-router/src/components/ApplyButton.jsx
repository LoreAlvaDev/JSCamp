import { useState } from "react";
import { useAuthStore } from "../store/authStore";

export const ApplyButton = ({ jobId }) => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const [isApplied, setIsApplied] = useState(false);

    const buttonClasses = `jobApplybtn ${isApplied ? "is-applied" : ""}`;
    const textBtn = isApplied ? "Aplicado" : "Aplicar ahora";
    const handleClick = () => {
        setIsApplied(!isApplied);
    };
    return (
        <>
            <button className={buttonClasses} disabled={!isLoggedIn} onClick={handleClick}>
                {isLoggedIn ? textBtn : "Inicia sesión para aplicar"}
            </button>
        </>
    );
};
