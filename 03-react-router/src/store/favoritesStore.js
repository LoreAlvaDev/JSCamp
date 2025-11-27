import { create } from "zustand";

export const useFavoritesStore = create((set, get) => ({
    //estado inicial
    favorites: [],
    //acciones
    addFavorite: (jobId) => {
        set((state) => ({
            favorites: state.favorites.includes(jobId) ? state.favorites : [...state.favorites, jobId],
        }));
    },
    removeFavorite: (jobId) => {
        set((state) => ({
            favorites: state.favorites.filter((id) => id !== jobId),
        }));
    },
    isFavorite: (jobId) => {
        return get().favorites.includes(jobId);
    },
    toogleFavorite: (jobId) => {
        const { isFavorite, removeFavorite, addFavorite } = get();
        isFavorite(jobId) ? removeFavorite(jobId) : addFavorite(jobId);
    },
    clearFavorites: () => {
        set({ favorites: [] });
    },
    countFavorites: () => {
        return get().favorites.length;
    },
}));
