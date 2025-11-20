import { useId } from "react";
import styles from "./ContactForm.module.css";
export const ContactForm = ({ onSubmit, estado }) => {
    const titleId = useId();
    const messageId = useId();
    // si el estado es loading, deshabilitar el boton
    const buttonDisabled = estado.loading;

    return (
        <>
            <section>
                <img className={styles.imageBackground} src="./background.webp" alt="" srcSet="" width="200" />
                <h2 className="titulazo">Contáctanos</h2>
                <p>Quieres ponerte en contacto con nosotros? Llena el formulario abajo.</p>
                <form role="form" id="contact-form" name="formulario" onSubmit={onSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="title-input">
                            Título
                        </label>
                        <div className={styles.buscador}>
                            <input className={styles.inputTema} type="text" name={titleId} id="title-input" placeholder="Título de tu consulta" />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="message">
                            Mensaje
                        </label>
                        <textarea className={styles.buscador} name={messageId} id="message" cols="80" rows="10"></textarea>
                    </div>
                    <div className="botonera">
                        <button type="submit" className={styles.botonEnviar} disabled={buttonDisabled}>
                            Enviar
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
};
