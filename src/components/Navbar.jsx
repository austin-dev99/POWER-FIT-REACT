import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import CartWidget from "./carrito/CartWidget";
import styles from "../CSSmodules/Navbar.module.css";
import Buscador from "../buscador/Buscador";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const location = useLocation();

  // Cerrar el menú móvil al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
    setOpenSubmenu(null);
  }, [location]);

  // Efecto para manejar el scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  // Categorías de productos
  const categories = [
    { link: "Suplementos", path: "/productos/Suplementos" },
    { link: "Hombres", path: "/productos/hombres" },
    { link: "Mujeres", path: "/productos/mujeres" },
  ];

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo} aria-label="Inicio">
            <h1>POWERFIT</h1>
          </Link>

          {/* Menú de navegación */}
          <nav className={`${styles.nav} ${isOpen ? styles.active : ""}`}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link to="/" className={styles.navLink}>
                  Inicio
                </Link>
              </li>

              <li
                className={`${styles.navItem} ${styles.hasDropdown}`}
                onMouseEnter={() => toggleSubmenu("productos")}
                onMouseLeave={() => setOpenSubmenu(null)}
              >
                <button
                  className={`${styles.navLink} ${styles.dropdownToggle}`}
                  aria-expanded={openSubmenu === "productos"}
                  aria-haspopup="true"
                  onClick={() => toggleSubmenu("productos")}
                >
                  Productos
                  <FaChevronDown className={styles.dropdownIcon} />
                </button>
                <ul
                  className={`${styles.dropdownMenu} ${openSubmenu === "productos" ? styles.show : ""}`}
                  aria-label="Categorías de productos"
                >
                  {categories.map((category) => (
                    <li key={category.path} className={styles.dropdownItem}>
                      <Link to={category.path} className={styles.dropdownLink}>
                        {category.link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className={styles.navItem}>
                <Link to="/nosotros" className={styles.navLink}>
                  Nosotros
                </Link>
              </li>

              <li className={styles.navItem}>
                <Link to="/contacto" className={styles.navLink}>
                  Contacto
                </Link>
              </li>
            </ul>

            <div className={styles.navbarRight}>
              <Buscador />
            </div>
            <div className={styles.navActions}>
              <CartWidget />
            </div>
          </nav>

          {/* Botón de menú móvil */}
          <button
            className={styles.menuToggle}
            onClick={toggleMenu}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* Overlay para móviles */}
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={toggleMenu}
          role="button"
          tabIndex="0"
          onKeyDown={(e) => e.key === "Escape" && toggleMenu()}
          aria-label="Cerrar menú"
        />
      )}
    </>
  );
};

export default Navbar;
