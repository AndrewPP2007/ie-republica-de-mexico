document.addEventListener("DOMContentLoaded", () => {
    const esPaginaSecundaria = window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/") ? false : true;
    const prefijoRuta = esPaginaSecundaria ? "../" : "";
    // 1. Cargar Header de forma asíncrona con control de errores nativo
    const contenedorHeader = document.querySelector(".cabecera-premium-institucional");
    if (contenedorHeader) {
        fetch(`${prefijoRuta}components/header.html`)
            .then(res => {
                if (!res.ok) throw new Error(`Error al cargar el header: ${res.status}`);
                return res.text();
            })
            .then(html => {
                contenedorHeader.innerHTML = html;
                // Inyectar dinámicamente las rutas correctas a la insignia y enlaces del menú
                document.getElementById("enlace-logo-dinamico").href = esPaginaSecundaria ? "../index.html" : "index.html";
                contenedorHeader.querySelector(".img-escudo-global").src = `${prefijoRuta}assets/images/cropped-logo-1-300x296.png`;
                
                document.getElementById("link-inicio").href = esPaginaSecundaria ? "../index.html" : "index.html";
                document.getElementById("link-nosotros").href = esPaginaSecundaria ? "nosotros.html" : "pages/nosotros.html";
                document.getElementById("link-academico").href = esPaginaSecundaria ? "academico.html" : "pages/academico.html";
                document.getElementById("link-procesos").href = esPaginaSecundaria ? "procesos.html" : "pages/procesos.html";
                document.getElementById("link-institucional").href = esPaginaSecundaria ? "institucional.html" : "pages/institucional.html";
                document.getElementById("link-contacto").href = esPaginaSecundaria ? "contacto.html" : "pages/contacto.html";
                encenderMenuActivo();
            })
            .catch(err => console.warn("Aviso de carga del header.", err));
    }
    // 2. Cargar Footer de forma asíncrona controlado
    const contenedorFooter = document.querySelector(".pie-pagina-global-rm");
    if (contenedorFooter) {
        fetch(`${prefijoRuta}components/footer.html`)
            .then(res => {
                if (!res.ok) throw new Error(`Error al cargar el footer: ${res.status}`);
                return res.text();
            })
            .then(html => {
                contenedorFooter.innerHTML = html;
                contenedorFooter.querySelector(".enlace-logo-footer").href = esPaginaSecundaria ? "../index.html" : "index.html";
                contenedorFooter.querySelector(".img-logo-footer").src = `${prefijoRuta}assets/images/cropped-logo-1-300x296.png`;
                const enlacesFooter = contenedorFooter.querySelectorAll(".lista-enlaces-footer a");
                if (enlacesFooter.length >= 5) {
                    enlacesFooter[0].href = esPaginaSecundaria ? "../index.html" : "index.html";
                    enlacesFooter[1].href = esPaginaSecundaria ? "nosotros.html" : "pages/nosotros.html";
                    enlacesFooter[2].href = esPaginaSecundaria ? "academico.html" : "pages/academico.html";
                    enlacesFooter[3].href = esPaginaSecundaria ? "procesos.html" : "pages/procesos.html";
                    enlacesFooter[4].href = esPaginaSecundaria ? "institucional.html" : "pages/institucional.html";
                }
                if (enlacesFooter.length >= 7) {
                    enlacesFooter[6].href = esPaginaSecundaria ? "pp.html" : "pages/pp.html";
                }
                const btnLibro = contenedorFooter.querySelector(".enlace-libro-footer");
                if (btnLibro) {
                    btnLibro.href = esPaginaSecundaria ? "contacto.html" : "pages/contacto.html";
                }
            })
            .catch(err => console.warn("Aviso de carga del footer.", err));
    }
    function encenderMenuActivo() {
        const path = window.location.pathname.toLowerCase();
        const paginas = ['nosotros', 'academico', 'procesos', 'institucional', 'contacto'];
        let paginaActiva = false;

        paginas.forEach(pagina => {
            const coincide = path.includes(`/${pagina}`) || path.includes(`${pagina}.html`);
            if (coincide) {
                const enlace = document.getElementById(`link-${pagina}`);
                if (enlace) {
                    enlace.classList.add('nav-activo');
                    enlace.setAttribute('aria-current', 'page');
                    paginaActiva = true;
                }
            }
        });
        if (!paginaActiva) {
            const inicio = document.getElementById('link-inicio');
            if (inicio) {
                inicio.classList.add('nav-activo');
                inicio.setAttribute('aria-current', 'page');
            }
        }
    }
});