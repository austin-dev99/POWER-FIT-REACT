import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaDumbbell,
  FaTrophy,
  FaUsers,
  FaHeartbeat,
  FaLeaf,
  FaStar,
  FaLinkedinIn,
  FaTwitter,
  FaEnvelope,
  FaShieldAlt,
  FaBolt,
  FaFire,
  FaBullseye,
  FaEye,
} from "react-icons/fa";
import styles from "./Nosotros.module.css";
import personal from "../../data/personal.json";
const Nosotros = () => {
  const [activeTab, setActiveTab] = useState("mision");

  // Usar los datos importados del equipo
  const [teamMembers] = useState(personal);

  const stats = [
    {
      number: "10+",
      label: "Años de experiencia",
      icon: <FaTrophy className={styles["stat-icon"]} />,
    },
    {
      number: "5K+",
      label: "Clientes satisfechos",
      icon: <FaUsers className={styles["stat-icon"]} />,
    },
    {
      number: "50+",
      label: "Marcas de suplementos",
      icon: <FaDumbbell className={styles["stat-icon"]} />,
    },
    {
      number: "99%",
      label: "Efectividad comprobada",
      icon: <FaStar className={styles["stat-icon"]} />,
    },
  ];

  return (
    <div className={styles["nosotros-container"]}>
      {/* Hero Section */}
      <section className={styles["nosotros-hero"]}>
        <div className={styles["hero-overlay"]}></div>
        <div className={styles["hero-content"]}>
          <div className={styles["hero-badge"]}>
            <FaDumbbell className={styles["badge-icon"]} />
            <span>POWERFIT SUPLEMENTOS</span>
          </div>
          <h1>TU CAMINO HACIA EL ÉXITO DEPORTIVO</h1>
          <p>
            Potenciamos tu rendimiento con los mejores suplementos y asesoría
            experta
          </p>
          <div className={styles["hero-features"]}>
            <div className={styles["feature"]}>
              <FaShieldAlt className={styles["feature-icon"]} />
              <span>Productos 100% Certificados</span>
            </div>
            <div className={styles["feature"]}>
              <FaBolt className={styles["feature-icon"]} />
              <span>Envío Rápido</span>
            </div>
            <div className={styles["feature"]}>
              <FaFire className={styles["feature-icon"]} />
              <span>Asesoría experta</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles["stats-container"]}>
          {stats.map((stat, index) => (
            <div key={index} className={styles["stat-item"]}>
              <div className={styles["stat-icon"]}>{stat.icon}</div>
              <div className={styles["stat-content"]}>
                <span className={styles["stat-number"]}>{stat.number}</span>
                <span className={styles["stat-label"]}>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.mission}>
        <div className={styles.mission__container}>
          <div className={styles.section__header}>
            <h2 className={styles.section__title}>Nuestra Filosofía</h2>
            <p className={styles.section__subtitle}>
              Comprometidos con tu rendimiento y bienestar
            </p>
          </div>

          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === "mision" ? styles.tab__active : ""}`}
              onClick={() => setActiveTab("mision")}
            >
              <FaBullseye className={styles.tab__icon} />
              <span>Misión</span>
            </button>
            <button
              className={`${styles.tab} ${activeTab === "vision" ? styles.tab__active : ""}`}
              onClick={() => setActiveTab("vision")}
            >
              <FaEye className={styles.tab__icon} />
              <span>Visión</span>
            </button>
            <button
              className={`${styles.tab} ${activeTab === "valores" ? styles.tab__active : ""}`}
              onClick={() => setActiveTab("valores")}
            >
              <FaStar className={styles.tab__icon} />
              <span>Valores</span>
            </button>
          </div>

          <div className={styles.tab__content}>
            {activeTab === "mision" && (
              <div className={styles.tab__pane}>
                <h3 className={styles.tab__title}>Nuestra Misión</h3>
                <p className={styles.tab__text}>
                  Proporcionar productos de suplementación deportiva de la más
                  alta calidad, respaldados por evidencia científica, para
                  ayudar a nuestros clientes a alcanzar sus metas de rendimiento
                  físico y bienestar general.
                </p>
                <div className={styles.tab__illustration}>
                  <FaBullseye className={styles.tab__illustrationIcon} />
                </div>
              </div>
            )}
            {activeTab === "vision" && (
              <div className={styles.tab__pane}>
                <h3 className={styles.tab__title}>Nuestra Visión</h3>
                <p className={styles.tab__text}>
                  Ser reconocidos como la tienda líder en suplementación
                  deportiva, destacando por nuestra excelencia en servicio al
                  cliente, asesoramiento experto y compromiso con la calidad de
                  nuestros productos.
                </p>
                <div className={styles.tab__illustration}>
                  <FaEye className={styles.tab__illustrationIcon} />
                </div>
              </div>
            )}
            {activeTab === "valores" && (
              <div className={styles.tab__pane}>
                <h3 className={styles.tab__title}>Nuestros Valores</h3>
                <ul className={styles.values__list}>
                  <li className={styles.values__item}>
                    <div className={styles.value__icon}>
                      <FaLeaf />
                    </div>
                    <div>
                      <h4>Calidad y Pureza</h4>
                      <p>
                        Productos seleccionados con los más altos estándares
                      </p>
                    </div>
                  </li>
                  <li className={styles.values__item}>
                    <div className={styles.value__icon}>
                      <FaHeartbeat />
                    </div>
                    <div>
                      <h4>Bienestar Integral</h4>
                      <p>Compromiso con tu salud y desarrollo físico</p>
                    </div>
                  </li>
                  <li className={styles.values__item}>
                    <div className={styles.value__icon}>
                      <FaUsers />
                    </div>
                    <div>
                      <h4>Enfoque en el Cliente</h4>
                      <p>Tus necesidades son nuestra prioridad</p>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.team}>
        <div className={styles.team__container}>
          <div className={styles.section__header}>
            <h2 className={styles.section__title}>Nuestro Equipo</h2>
            <p className={styles.section__subtitle}>
              Conoce a los expertos que hacen posible nuestra misión
            </p>
          </div>

          <div className={styles.team__grid}>
            {teamMembers.map((member) => (
              <div key={member.id} className={styles.team__card}>
                <div className={styles.card__image}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className={styles.card__img}
                  />
                  <div className={styles.card__overlay}>
                    <div className={styles.social__links}>
                      <button
                        type="button"
                        className={styles.social__link}
                        aria-label="LinkedIn"
                        onClick={() =>
                          window.open("https://linkedin.com", "_blank")
                        }
                      >
                        <FaLinkedinIn />
                      </button>
                      <button
                        type="button"
                        className={styles.social__link}
                        aria-label="Twitter"
                        onClick={() =>
                          window.open("https://twitter.com", "_blank")
                        }
                      >
                        <FaTwitter />
                      </button>
                      <button
                        type="button"
                        className={styles.social__link}
                        aria-label="Email"
                        onClick={() =>
                          (window.location.href = "mailto:info@ejemplo.com")
                        }
                      >
                        <FaEnvelope />
                      </button>
                    </div>
                  </div>
                </div>
                <div className={styles.card__content}>
                  <h3 className={styles.card__title}>{member.name}</h3>
                  <p className={styles.card__role}>{member.role}</p>
                  <p className={styles.card__bio}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.cta__overlay}></div>
        <div className={styles.cta__container}>
          <div className={styles.cta__content}>
            <h2 className={styles.cta__title}>
              ¿Listo para llevar tu rendimiento al siguiente nivel?
            </h2>
            <p className={styles.cta__text}>
              Descubre nuestra selección premium de suplementos deportivos y
              accesorios de entrenamiento.
            </p>
            <div className={styles.cta__buttons}>
              <Link to="/productos" className={styles.cta__button}>
                VER PRODUCTOS
              </Link>
              <Link
                to="/contacto"
                className={`${styles.cta__button} ${styles["cta__button--outline"]}`}
              >
                CONTÁCTANOS
              </Link>
            </div>
            <div className={styles.cta__features}>
              <div className={styles.cta__feature}>
                <div className={styles.feature__icon}>
                  <FaShieldAlt />
                </div>
                <span>Garantía de calidad</span>
              </div>
              <div className={styles.cta__feature}>
                <div className={styles.feature__icon}>
                  <FaBolt />
                </div>
                <span>Envío rápido</span>
              </div>
              <div className={styles.cta__feature}>
                <div className={styles.feature__icon}>
                  <FaStar />
                </div>
                <span>Asesoría experta</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;
