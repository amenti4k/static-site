/**
 * Vinyl Universe - Metallic Effects
 * Adds realistic metallic reflections and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements that will have metallic reflections
  const metallicElements = [
    '.turntable-container',
    '.platter-base',
    '.tonearm-base',
    '.tonearm',
    '.control-button',
    '.now-playing-card'
  ];
  
  // Add light reflection effect to metallic elements
  function addMetallicReflections() {
    metallicElements.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      
      elements.forEach(element => {
        // Create reflection overlay if it doesn't exist
        if (!element.querySelector('.metallic-reflection')) {
          const reflection = document.createElement('div');
          reflection.className = 'metallic-reflection';
          reflection.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%);
            pointer-events: none;
            z-index: 10;
            opacity: 0.5;
            transition: opacity 0.3s ease, background 0.3s ease;
            border-radius: inherit;
          `;
          element.style.position = element.style.position || 'relative';
          element.style.overflow = element.style.overflow || 'hidden';
          element.appendChild(reflection);
        }
      });
    });
  }
  
  // Update reflections based on mouse position
  function updateReflections(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    metallicElements.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      
      elements.forEach(element => {
        const reflection = element.querySelector('.metallic-reflection');
        if (!reflection) return;
        
        const rect = element.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;
        
        // Calculate angle from mouse to element center
        const angleX = (mouseX - elementCenterX) / (window.innerWidth / 2);
        const angleY = (mouseY - elementCenterY) / (window.innerHeight / 2);
        
        // Calculate distance for intensity
        const distance = Math.sqrt(
          Math.pow(mouseX - elementCenterX, 2) + 
          Math.pow(mouseY - elementCenterY, 2)
        );
        
        const maxDistance = Math.sqrt(
          Math.pow(window.innerWidth / 2, 2) + 
          Math.pow(window.innerHeight / 2, 2)
        );
        
        const intensity = 1 - Math.min(distance / maxDistance, 1);
        
        // Update reflection gradient based on mouse position
        reflection.style.background = `
          linear-gradient(
            ${135 + angleX * 30}deg, 
            rgba(255,255,255,${0.1 + intensity * 0.2}) 0%, 
            transparent 50%, 
            rgba(255,255,255,${0.05 + intensity * 0.1}) 100%
          )
        `;
        
        // Add subtle transform for 3D effect
        if (selector !== '.turntable-container') { // Skip main container to avoid layout shifts
          element.style.transform = `
            perspective(1000px) 
            rotateX(${angleY * -2}deg) 
            rotateY(${angleX * 2}deg)
          `;
        }
      });
    });
  }
  
  // Add metallic shine effect to vinyl
  function addVinylShine() {
    const records = document.querySelectorAll('.playing-record, .album-vinyl, .flying-record');
    
    records.forEach(record => {
      if (!record.querySelector('.vinyl-shine')) {
        const shine = document.createElement('div');
        shine.className = 'vinyl-shine';
        shine.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 5;
        `;
        record.appendChild(shine);
      }
    });
  }
  
  // Update vinyl shine based on mouse position
  function updateVinylShine(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const records = document.querySelectorAll('.playing-record, .album-vinyl, .flying-record');
    
    records.forEach(record => {
      const shine = record.querySelector('.vinyl-shine');
      if (!shine) return;
      
      const rect = record.getBoundingClientRect();
      const recordCenterX = rect.left + rect.width / 2;
      const recordCenterY = rect.top + rect.height / 2;
      
      // Calculate angle from mouse to record center
      const angleX = (mouseX - recordCenterX) / (window.innerWidth / 2);
      const angleY = (mouseY - recordCenterY) / (window.innerHeight / 2);
      
      // Update shine gradient based on mouse position
      shine.style.background = `
        linear-gradient(
          ${135 + angleX * 30}deg, 
          rgba(255,255,255,0.1) 0%, 
          transparent 50%
        )
      `;
    });
  }
  
  // Initialize effects
  function initMetallicEffects() {
    addMetallicReflections();
    addVinylShine();
    
    // Add event listeners
    document.addEventListener('mousemove', (e) => {
      updateReflections(e);
      updateVinylShine(e);
    });
    
    // Periodically check for new elements (for dynamically added content)
    setInterval(() => {
      addMetallicReflections();
      addVinylShine();
    }, 1000);
  }
  
  // Initialize after a short delay to ensure all elements are loaded
  setTimeout(initMetallicEffects, 500);
});
