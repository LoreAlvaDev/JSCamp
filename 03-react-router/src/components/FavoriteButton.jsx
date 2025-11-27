import { useAuthStore } from "../store/authStore";
import { useFavoritesStore } from "../store/favoritesStore";

export const FavoriteButton = ({ jobId }) => {
    //suscripción al store ENTERO
    const { isFavorite, toogleFavorite } = useFavoritesStore();
    //suscripción a partes del store
    // const isFavorite = useFavoritesStore((state) => state.isFavorite);
    // const toogleFavorite = useFavoritesStore((state) => state.toogleFavorite);
    //no funciona bien porque las funciones no se modifican nunca, solo el favorites

    const { isLoggedIn } = useAuthStore();
    return (
        <>
            <button onClick={() => toogleFavorite(jobId)} disabled={!isLoggedIn} className="jobApplybtn">
                {isFavorite(jobId) ? "❤️" : "🤍"}
            </button>
        </>
    );
};
