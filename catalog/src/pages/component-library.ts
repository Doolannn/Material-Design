/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';

function initializeComponentLibrarySearch() {
  const search = document.querySelector<HTMLInputElement>(
    '#component-library-search',
  );

  if (!search) {
    return;
  }

  const cards = Array.from(
    document.querySelectorAll<HTMLElement>('[data-component-card]'),
  );

  const filterCards = () => {
    const query = search.value.trim().toLowerCase();

    for (const card of cards) {
      const name = card.dataset.componentName ?? '';
      const dir = card.dataset.componentDir ?? '';
      const matches =
        query === '' || name.includes(query) || dir.includes(query);

      card.hidden = !matches;
    }
  };

  search.addEventListener('input', filterCards);
}

initializeComponentLibrarySearch();
