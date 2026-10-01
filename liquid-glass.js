/* =========================================================
   liquid-glass.js
   注入液态玻璃用的 SVG 滤镜（feTurbulence + feDisplacementMap + 镜面高光）。
   styles.css 通过 @supports (backdrop-filter: url("#...")) 选用它们，
   不支持的浏览器自动回退到普通的模糊玻璃。
   ========================================================= */
(() => {
  'use strict';

  if (document.querySelector('.liquid-glass-defs')) return;

  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.classList.add('liquid-glass-defs');

  svg.innerHTML = `
    <defs>
      <filter id="panel-lens" x="-5%" y="-8%" width="110%" height="116%" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.004 0.009" numOctaves="2" seed="9" result="panelMap"/>
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.45" result="panelBlur"/>
        <feDisplacementMap in="panelBlur" in2="panelMap" scale="3" xChannelSelector="R" yChannelSelector="G" result="panelGlass"/>
        <feSpecularLighting in="panelMap" surfaceScale="1.4" specularConstant="0.2" specularExponent="34" lighting-color="#ffffff" result="panelLight">
          <feDistantLight azimuth="225" elevation="58"/>
        </feSpecularLighting>
        <feComposite in="panelLight" in2="SourceAlpha" operator="in" result="panelRim"/>
        <feBlend in="panelGlass" in2="panelRim" mode="screen"/>
      </filter>

      <filter id="control-glass" primitiveUnits="objectBoundingBox" x="-15%" y="-35%" width="130%" height="170%" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.016 0.032" numOctaves="2" seed="4" result="controlMap"/>
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.014" result="controlBlur"/>
        <feDisplacementMap in="controlBlur" in2="controlMap" scale="0.75" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>`;

  const mount = () => document.body.prepend(svg);
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount, { once: true });

  document.documentElement.classList.add('has-liquid-glass');
})();
