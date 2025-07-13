import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Contacto.module.css";
import {
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaComment,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const Contacto = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const enviar = (data) => {
    /* console.log("Datos del formulario:", data); */
    // Aquí se podra agregar la lógica para enviar datos a backend

    // Simulamos el envío exitoso
    setTimeout(() => {
      setIsSubmitted(true);
      reset(); // Limpia el formulario

      // Ocultar el mensaje después de 5 segundos
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <div className={styles.contactPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Contáctanos</h1>
          <p>
            Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos
            lo antes posible.
          </p>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className={styles.contactContainer}>
          <div className={styles.contactInfo}>
            <h2>Información de Contacto</h2>
            <div className={styles.infoItem}>
              <FaMapMarkerAlt className={styles.infoIcon} />
              <div>
                <h3>Dirección</h3>
                <p>Av. Principal #123, Colonia Centro</p>
                <p>Ciudad de México, 06000</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <FaPhone className={styles.infoIcon} />
              <div>
                <h3>Teléfono</h3>
                <p>+52 55 1234 5678</p>
                <p>Lunes a Viernes: 9am - 8pm</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <FaClock className={styles.infoIcon} />
              <div>
                <h3>Horario</h3>
                <p>Lunes - Viernes: 9:00 AM - 8:00 PM</p>
                <p>Sábado: 10:00 AM - 6:00 PM</p>
                <p>Domingo: Cerrado</p>
              </div>
            </div>
          </div>

          <div className={styles.contactForm}>
            <h2>Envíanos un Mensaje</h2>
            <form onSubmit={handleSubmit(enviar)}>
              <div className={styles.formGroup}>
                <div className={styles.inputContainer}>
                  <FaUser className={styles.inputIcon} />
                  <input
                    type="text"
                    placeholder="Tu nombre completo"
                    className={`${styles.formInput} ${errors.nombre ? styles.inputError : ""}`}
                    {...register("nombre", { required: true })}
                  />
                </div>
                {errors.nombre && (
                  <span className={styles.errorMessage}>
                    Este campo es requerido
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <div className={styles.inputContainer}>
                  <FaEnvelope className={styles.inputIcon} />
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className={`${styles.formInput} ${errors.email ? styles.inputError : ""}`}
                    {...register("email", {
                      required: true,
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                  />
                </div>
                {errors.email && (
                  <span className={styles.errorMessage}>
                    {errors.email.type === "required"
                      ? "Este campo es requerido"
                      : "Ingresa un email válido"}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <div
                  className={`${styles.inputContainer} ${styles.textareaContainer}`}
                >
                  <FaComment className={styles.inputIcon} />
                  <textarea
                    className={`${styles.formInput} ${styles.formTextarea}`}
                    placeholder="Tu mensaje"
                    rows="5"
                    {...register("mensaje", { required: true })}
                  ></textarea>
                </div>
                {errors.mensaje && (
                  <span className={styles.errorMessage}>
                    Este campo es requerido
                  </span>
                )}
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                onClick={handleSubmit(enviar)}
              >
                <FaPaperPlane className={styles.buttonIcon} />
                Enviar mensaje
              </button>

              {isSubmitted && (
                <div className={styles.successMessage}>
                  <FaCheckCircle className={styles.successIcon} />
                  <span>¡Mensaje enviado correctamente!</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacto;
