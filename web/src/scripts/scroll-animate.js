/**
 * Script para animaciones de scroll reveal
 * Muestra elementos con data-animate cuando entran en el viewport
 */

document.addEventListener('DOMContentLoaded', function() {
  // Configuración del Intersection Observer
  const observerOptions = {
    threshold: 0.1, // Trigger cuando el 10% del elemento es visible
    rootMargin: '0px 0px -50px 0px' // Activar un poco antes de que sea completamente visible
  };

  // Callback que se ejecuta cuando los elementos entran/salen del viewport
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Remover la clase de opacidad 0 y agregar la animación
        element.classList.remove('opacity-0');
        element.classList.add('animate-fadeInUp');
        
        // Una vez animado, dejar de observarlo para performance
        observer.unobserve(element);
      }
    });
  };

  // Crear el observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observar todos los elementos con data-animate
  const animatedElements = document.querySelectorAll('[data-animate]');
  animatedElements.forEach(element => {
    // Inicialmente oculto
    element.classList.add('opacity-0');
    // Observar el elemento
    observer.observe(element);
  });
});