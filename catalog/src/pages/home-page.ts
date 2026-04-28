/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/text-button.js';
import '@material/web/checkbox/checkbox.js';
import '@material/web/chips/assist-chip.js';
import '@material/web/chips/chip-set.js';
import '@material/web/divider/divider.js';
import '@material/web/switch/switch.js';
import '../components/theme-changer.js';

import {getCurrentMode, getCurrentSeedColor} from '../utils/theme.js';

function updateThemeSnapshot() {
  const rootStyles = getComputedStyle(document.documentElement);

  document.querySelectorAll<HTMLElement>('[data-token-value]').forEach((node) => {
    const cssVar = node.dataset.tokenValue;
    if (!cssVar) {
      return;
    }

    node.textContent = rootStyles.getPropertyValue(cssVar).trim();
  });

  const modeNode = document.querySelector<HTMLElement>('[data-theme-mode]');
  if (modeNode) {
    const mode = getCurrentMode() ?? 'auto';
    modeNode.textContent = mode.slice(0, 1).toUpperCase() + mode.slice(1);
  }

  const seedNode = document.querySelector<HTMLElement>('[data-seed-color]');
  if (seedNode) {
    seedNode.textContent = (getCurrentSeedColor() ?? '#ECAA2E').toUpperCase();
  }
}

function initializeRevealAnimations() {
  const sections = document.querySelectorAll<HTMLElement>('.reveal');
  if (!('IntersectionObserver' in window)) {
    sections.forEach((section) => section.classList.add('is-visible'));
    return;
  }

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
    {
      threshold: 0.15,
    },
  );

  sections.forEach((section) => observer.observe(section));
}

updateThemeSnapshot();
initializeRevealAnimations();

window.addEventListener('theme-changed', updateThemeSnapshot);
