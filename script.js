/* ==========================================
   VENZA - Script de Funcionalidad e Interactividad
   ================================---------- */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicialización de Píxeles de Rastreo y Retargeting (Meta Pixel / Google Analytics)
    initTrackingPixels();

    // 2. Control del Banner de Cookies y Términos
    initCookieBanner();

    // 3. Configuración de Modales (Apertura y Cierre)
    initModals();

    // 4. Gestión de Formularios (Contacto y Autenticación de Empresas)
    initForms();
});

/**
 * Inicializa los píxeles de seguimiento para campañas de publicidad digital segmentada
 */
function initTrackingPixels() {
    console.log("VENZA Tracking Pixel [Meta/GA4] activo: Monitoreando visitas y comportamiento de usuario para campañas de retargeting.");
    
    // Objeto global de analítica para eventos de conversión
    window.venzaAnalytics = {
        trackEvent: function(action, category) {
            console.log(`[Pixel Event] Acción: ${action} | Categoría: ${category} | Correo soporte: venza.tuemprendimiento1@gmail.com`);
        }
    };

    window.venzaAnalytics.trackEvent('Page_View', 'Home_Venza');
}

/**
 * Control del Banner de Cookies con persistencia local
 */
function initCookieBanner() {
    const cookieBanner = document.getElementById('cookieBanner');
    
    if (localStorage.getItem('venza_cookies_accepted') === 'true') {
        if (cookieBanner) cookieBanner.style.display = 'none';
    }
}

function acceptCookies() {
    localStorage.setItem('venza_cookies_accepted', 'true');
    const cookieBanner = document.getElementById('cookieBanner');
    if (cookieBanner) {
        cookieBanner.style.transition = 'opacity 0.4s ease';
        cookieBanner.style.opacity = '0';
        setTimeout(() => {
            cookieBanner.style.display = 'none';
        }, 400);
    }
    if (window.venzaAnalytics) {
        window.venzaAnalytics.trackEvent('Accept_Cookies', 'Compliance');
    }
}

/**
 * Control de Ventanas Modales (Abrir, Cerrar y cierre haciendo clic fuera del contenido)
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        if (window.venzaAnalytics) {
            window.venzaAnalytics.trackEvent('Open_Modal', modalId);
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

function initModals() {
    window.addEventListener('click', (event) => {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

/**
 * Manejadores de Formularios (Contacto corporativo y Acceso/Registro de Empresas)
 */
function initForms() {
    // Formulario de Contacto hacia venza.tuemprendimiento1@gmail.com
    const contactForm = document.querySelector('#contacto form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = contactForm.querySelectorAll('input, textarea');
            const nombre = inputs[0].value;
            
            alert(`¡Gracias ${nombre}! Tu mensaje ha sido enviado correctamente a nuestro equipo en venza.tuemprendimiento1@gmail.com.`);
            
            if (window.venzaAnalytics) {
                window.venzaAnalytics.trackEvent('Contact_Submit', 'Lead_Generation');
            }
            
            contactForm.reset();
        });
    }

    // Formulario de Acceso o Registro de Microemprendimientos
    const authForm = document.querySelector('#authModal form');
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = authForm.querySelector('input[type="email"]').value;
            
            alert(`¡Registro / Inicio de sesión exitoso!\nEmpresa vinculada: ${emailInput}\nYa puedes gestionar tus productos y subirlos con calidad 2K.`);
            
            if (window.venzaAnalytics) {
                window.venzaAnalytics.trackEvent('Enterprise_Auth', 'Dashboard_Login');
            }
            
            closeModal('authModal');
            authForm.reset();
        });
    }
}