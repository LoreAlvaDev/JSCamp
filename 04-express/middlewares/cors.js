import cors from "cors";

const ACCEPTED_ORIGINS = ["http://localhost:5174", "http://localhost:5173"];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
    return cors({
        origin: (origin, callback) => {
            console.log("nueva comprobación cors", origin);
            if (acceptedOrigins.includes(origin) || !origin) {
                console.log("es bueno");
                return callback(null, true);
            }
            return callback(new Error("Origen no permitido " + origin));
        },
    });
};
