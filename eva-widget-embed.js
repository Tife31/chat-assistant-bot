/**
 * Eva AI Widget Universal Embed Script
 * 
 * Usage:
 * 1. Upload your configured enhanced-production-widget.html to your hosting
 * 2. Update the WIDGET_URL below to point to your uploaded file
 * 3. Include this script on any website: <script src="path/to/eva-widget-embed.js"></script>
 * 4. Or copy the embed code and paste into HTML
 */

(function() {
  'use strict';

  // CONFIGURATION - Update this with your widget URL
  const WIDGET_CONFIG = {
    // Replace with your actual widget URL after uploading to ClickFunnels, Shopify, or any hosting
    url: 'https://yourfunnels.s3.amazonaws.com/files/enhanced-production-widget.html',
    
    // Widget appearance settings
    width: '400px',
    height: '600px',
    position: 'bottom-right', // Options: 'bottom-right', 'bottom-left', 'top-right', 'top-left'
    zIndex: 9999,
    
    // Widget behavior
    loadDelay: 1000, // Delay before loading widget (in milliseconds)
    
    // Mobile responsive settings
    mobile: {
      width: '90vw',
      height: '80vh',
      bottomOffset: '10px',
      sideOffset: '5vw'
    }
  };

  // Check if widget is already loaded
  if (document.getElementById('eva-ai-widget-embed')) {
    console.warn('Eva AI Widget already loaded');
    return;
  }

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function getPositionStyles(position, mobile = false) {
    const styles = {
      position: 'fixed',
      zIndex: WIDGET_CONFIG.zIndex,
      transition: 'all 0.3s ease'
    };

    if (mobile) {
      styles.width = WIDGET_CONFIG.mobile.width;
      styles.height = WIDGET_CONFIG.mobile.height;
      styles.bottom = WIDGET_CONFIG.mobile.bottomOffset;
      
      if (position.includes('right')) {
        styles.right = WIDGET_CONFIG.mobile.sideOffset;
      } else {
        styles.left = WIDGET_CONFIG.mobile.sideOffset;
      }
    } else {
      styles.width = WIDGET_CONFIG.width;
      styles.height = WIDGET_CONFIG.height;
      
      // Set position
      if (position.includes('bottom')) {
        styles.bottom = '20px';
      } else {
        styles.top = '20px';
      }
      
      if (position.includes('right')) {
        styles.right = '20px';
      } else {
        styles.left = '20px';
      }
    }

    return styles;
  }

  function createWidget() {
    // Create container
    const container = document.createElement('div');
    container.id = 'eva-ai-widget-embed';
    container.setAttribute('data-widget', 'eva-ai');

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.id = 'eva-ai-widget-iframe';
    iframe.src = WIDGET_CONFIG.url;
    iframe.setAttribute('allow', 'microphone; camera; autoplay');
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-presentation');
    iframe.setAttribute('loading', 'lazy');
    iframe.style.cssText = `
      border: none;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      width: 100%;
      height: 100%;
      background: transparent;
    `;

    // Set container styles
    const mobile = isMobile();
    const styles = getPositionStyles(WIDGET_CONFIG.position, mobile);
    
    Object.assign(container.style, styles);

    // Add iframe to container
    container.appendChild(iframe);

    // Add error handling
    iframe.onerror = function() {
      console.error('Eva AI Widget failed to load. Please check the widget URL.');
      container.innerHTML = '<div style="color: red; padding: 20px;">Widget failed to load</div>';
    };

    // Add to page
    document.body.appendChild(container);

    // Add mobile responsive listener
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        const isMobileNow = isMobile();
        const newStyles = getPositionStyles(WIDGET_CONFIG.position, isMobileNow);
        Object.assign(container.style, newStyles);
      }, 100);
    });

    console.log('Eva AI Widget loaded successfully');
  }

  function loadWidget() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createWidget);
    } else {
      // Add delay if specified
      if (WIDGET_CONFIG.loadDelay > 0) {
        setTimeout(createWidget, WIDGET_CONFIG.loadDelay);
      } else {
        createWidget();
      }
    }
  }

  // Initialize
  loadWidget();

  // Add CSS for better mobile experience
  const style = document.createElement('style');
  style.textContent = `
    #eva-ai-widget-embed {
      opacity: 0;
      animation: fadeInWidget 0.5s ease forwards;
    }
    
    @keyframes fadeInWidget {
      to { opacity: 1; }
    }
    
    @media (max-width: 768px) {
      #eva-ai-widget-embed {
        border-radius: 15px !important;
      }
    }
    
    /* Hide widget on very small screens if needed */
    @media (max-width: 320px) {
      #eva-ai-widget-embed {
        width: 95vw !important;
        height: 75vh !important;
        left: 2.5vw !important;
        right: 2.5vw !important;
      }
    }
  `;
  document.head.appendChild(style);

})();

// Global function to manually control widget (optional)
window.EvaWidget = {
  show: function() {
    const widget = document.getElementById('eva-ai-widget-embed');
    if (widget) widget.style.display = 'block';
  },
  hide: function() {
    const widget = document.getElementById('eva-ai-widget-embed');
    if (widget) widget.style.display = 'none';
  },
  remove: function() {
    const widget = document.getElementById('eva-ai-widget-embed');
    if (widget) widget.remove();
  },
  reload: function() {
    const iframe = document.getElementById('eva-ai-widget-iframe');
    if (iframe) iframe.src = iframe.src;
  }
};