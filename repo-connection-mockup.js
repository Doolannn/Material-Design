import './all.js';
import './icon/icon.js';
import './labs/card/elevated-card.js';
import './labs/card/outlined-card.js';
import './menu/menu.js';
import './menu/menu-item.js';
import './select/outlined-select.js';
import './select/select-option.js';
import './tabs/primary-tab.js';
import {styles as typescaleStyles} from './typography/md-typescale-styles.js';

document.adoptedStyleSheets.push(typescaleStyles.styleSheet);

const summaryDialog = document.querySelector('#summary-dialog');
const openSummaryButton = document.querySelector('#open-summary-dialog');
const summaryMenu = document.querySelector('#summary-menu');
const menuAnchor = document.querySelector('#menu-anchor');
const panels = [
  document.querySelector('#overview-panel'),
  document.querySelector('#steps-panel'),
  document.querySelector('#components-panel'),
];
const tabs = [
  document.querySelector('#overview-tab'),
  document.querySelector('#steps-tab'),
  document.querySelector('#components-tab'),
];
const reveals = document.querySelectorAll('.reveal');

openSummaryButton?.addEventListener('click', () => {
  summaryDialog?.show();
});

menuAnchor?.addEventListener('click', () => {
  summaryMenu.open = !summaryMenu.open;
});

function setActiveTab(index) {
  tabs.forEach((tab, tabIndex) => {
    tab.active = tabIndex === index;
  });

  panels.forEach((panel, panelIndex) => {
    panel.hidden = panelIndex !== index;
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => setActiveTab(index));
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    {threshold: 0.12},
  );

  reveals.forEach((node) => observer.observe(node));
} else {
  reveals.forEach((node) => node.classList.add('is-visible'));
}

setActiveTab(0);
