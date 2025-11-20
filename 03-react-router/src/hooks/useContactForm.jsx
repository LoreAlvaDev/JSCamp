import { useState } from "react";

export const useContactForm = () => {
    const [estado, setEstado] = useState({ estado: null, loading: false, error: false });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("en submit");
        //obtenemos los datos del formulario
        const formData = new FormData(event.target);
        const title = formData.get(event.target[0].name);
        const message = formData.get(event.target[1].name);
        console.log({ title, message });
        //si son nulos, salimos
        if (!title || !message) {
            return;
        }
        setEstado({ estado: null, loading: true, error: false });
        //simular el envio de datos
        setTimeout(() => {
            //simular exito o error aleatoriamente
            const exito = Math.random() > 0.5;
            if (exito) {
                setEstado({ estado: "success", loading: false, error: false });
                //limpiar el formulario
                event.target.reset();
            } else {
                setEstado({ estado: null, loading: false, error: true });
            }
        }, 2000);
    };

    return {
        estado,
        handleSubmit,
    };
};
