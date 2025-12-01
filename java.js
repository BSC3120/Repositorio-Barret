/* aca van todos los Scripts */

/* aca van todos los Scipts */

document.addEventListener('DOMContentLoaded', function() {

    // =======================================================================
    // LÓGICA DEL MODAL DE CONTACTO (USADO EN index.html)
    // =======================================================================
    const contactModal = document.getElementById('contactModal');
    const closeContactModal = document.getElementById('closeContactModal');
    const openContactModalFromNav = document.getElementById('openContactModalFromNav');

    // Función para abrir el modal de contacto
    function openContact() {
        if (contactModal) {
            contactModal.classList.add('open');
            document.body.style.overflow = 'hidden'; // Evita el scroll en el cuerpo
            contactModal.focus(); 
        }
    }

    // Función para cerrar el modal de contacto
    function closeContact() {
        if (contactModal) {
            contactModal.classList.remove('open');
            document.body.style.overflow = '';
            // Resetea el formulario al cerrar
            const contactForm = document.getElementById('modal-contact-form');
            if (contactForm) contactForm.reset();
        }
    }

    // Event Listener para abrir el modal desde el menú
    if (openContactModalFromNav) {
        openContactModalFromNav.addEventListener('click', (e) => {
            e.preventDefault(); // Detiene el comportamiento predeterminado del enlace (scroll)
            openContact();
        });
    }

    // Event Listener para cerrar con el botón X
    if (closeContactModal) {
        closeContactModal.addEventListener('click', closeContact);
    }

    // Cerrar modal de contacto al hacer click fuera del panel
    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) closeContact();
        });
    }


    // =======================================================================
    // LÓGICA DEL MODAL DE CV/EQUIPO (USADO EN nosotros.html)
    // =======================================================================
    const cvModal = document.getElementById('cv-modal');
    const cvIframe = document.getElementById('cv-iframe');
    const modalTitle = document.getElementById('modal-title');
    const btnCloseCV = document.getElementById('btn-close');
    const modalActions = document.getElementById('modal-actions');
    const cardWrappers = document.querySelectorAll('.card-wrap');

    if (cvModal) { // Solo si el modal de CV existe (estamos en nosotros.html)
        
        function openCVModal(cvPath, name) {
            modalTitle.textContent = name;
            cvIframe.src = cvPath; // Carga el CV en el iframe
            
            // Actualiza el botón de descarga solo para archivos
            const isFile = cvPath.endsWith('.pdf');
            const downloadButton = document.getElementById('btn-download');

            if (downloadButton) {
                if (isFile) {
                    downloadButton.style.display = 'inline-block';
                    downloadButton.dataset.href = cvPath;
                    downloadButton.textContent = 'Descargar CV'; 
                } else {
                    // Ocultar botón si es una página HTML (que se muestra en el iframe)
                    downloadButton.style.display = 'none';
                    downloadButton.dataset.href = '';
                }
            }

            cvModal.classList.add('open');
            document.body.style.overflow = 'hidden'; // Evita el scroll en el cuerpo
            if (btnCloseCV) btnCloseCV.focus(); // Mueve el foco al botón de cerrar para accesibilidad
        }

        function closeCVModal() {
            cvModal.classList.remove('open');
            document.body.style.overflow = '';
            cvIframe.src = ''; // Limpia el iframe al cerrar
        }

        // Event Listener para cada tarjeta de CV
        cardWrappers.forEach(wrap => {
            const card = wrap.querySelector('.card');
            
            // Manejar el click en la tarjeta
            card.addEventListener('click', () => {
                const cv = card.getAttribute('data-cv');
                const name = card.getAttribute('data-name') || '';
                if (cv) openCVModal(cv, name);
            });

            // Manejar la pulsación de Enter/Espacio en la tarjeta (accesibilidad)
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });

        if (btnCloseCV) btnCloseCV.addEventListener('click', closeCVModal);
        
        // Manejo de la descarga (delegación de eventos)
        if (modalActions) {
            modalActions.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn-download')) {
                    const href = e.target.dataset.href;
                    if (href) {
                        const a = document.createElement('a');
                        a.href = href;
                        a.download = '';
                        a.rel = 'noopener';
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                    }
                }
            });
        }
        
        // Cerrar modal de CV al hacer click fuera del panel
        cvModal.addEventListener('click', (e) => {
            if (e.target === cvModal) closeCVModal();
        });


        // Focus Trap para accesibilidad - solo si el modal de CV existe
        document.addEventListener('focus', function (e) {
          if (cvModal.classList.contains('open') && btnCloseCV && !cvModal.contains(e.target)) {
            e.stopPropagation();
            btnCloseCV.focus(); 
          }
        }, true);
    }
    
    // =======================================================================
    // CERRAR MODALES CON TECLA ESCAPE (para ambos)
    // =======================================================================

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Cierra el modal de contacto si está abierto
            if (contactModal && contactModal.classList.contains('open')) {
                closeContact();
            }
            // Cierra el modal de CV si está abierto
            else if (cvModal && cvModal.classList.contains('open')) {
                closeCVModal();
            }
        }
    });
    
});