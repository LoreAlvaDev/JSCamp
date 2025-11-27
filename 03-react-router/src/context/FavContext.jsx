import { useState } from "react";
import { createContext } from "react";

export const FavContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (job) => {
        setFavorites((prev) => [...prev, job]);
    };

    const removeFavorite = (jobId) => {
        setFavorites((prev) => prev.filter((job) => job.id !== jobId));
    };

    const isFavorite = (jobId) => {
        return favorites.some((job) => job.id === jobId);
    };

    const value = {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
    };
    return <FavContext value={value}>{children}</FavContext>;
};
