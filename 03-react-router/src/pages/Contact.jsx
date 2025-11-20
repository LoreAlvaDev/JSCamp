import { ContactForm } from "../components/ContactForm";
import { useContactForm } from "../hooks/useContactForm";

export const ContactPage = () => {
    const { estado, handleSubmit } = useContactForm();

    return (
        <div className="contact-page">
            <main>
                <title>Contacto - DevJobs</title>
                <ContactForm onSubmit={handleSubmit} estado={estado} />
                <section>
                    {estado.error ? (
                        <p className="error-message">Ha habido un error, vuélvelo a intentar en unos minutos.</p>
                    ) : estado.loading ? ( // mostrar un spinner de carga mientras se obtienen los datos
                        <div className="spinner"></div>
                    ) : estado.estado === "success" ? (
                        <>
                            <p>Nos pondremos en contacto contigo pronto. ¡Gracias por comunicarte con nosotros!</p>
                        </>
                    ) : null}
                </section>
            </main>
        </div>
    );
};
