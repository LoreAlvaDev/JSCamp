// import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { use } from "react";

export const useAuth = () => {
    // const context = useContext(AuthContext);
    const context = use(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
