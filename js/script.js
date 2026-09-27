/* ==========================================================================
   MUHAMMAD TAHMASAP — PORTFOLIO SCRIPT
   Reads SITE_CONFIG and PROJECTS from js/projects-data.js (loaded first).
   Sections: config wiring, nav, work rendering + filtering, modal, reveal.
   ========================================================================== */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------ */
  /* Footer year                                                        */
  /* ------------------------------------------------------------------ */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------ */
  /* Wire SITE_CONFIG into hero / contact / footer links                */
  /* ------------------------------------------------------------------ */
  function wireConfigLinks() {
    const githubEls = [
      document.getElementById("heroGithub"),
      document.getElementById("contactGithub"),
      document.getElementById("footerGithub"),
    ];
    githubEls.forEach((el) => {
      if (!el) return;
      el.href = SITE_CONFIG.github;
    });

    const contactGithubValue = document.querySelector("#contactGithub .contact-link__value");
    if (contactGithubValue) contactGithubValue.textContent = SITE_CONFIG.github;

    const emailEl = document.getElementById("contactEmail");
    if (emailEl) {
      emailEl.href = "mailto:" + SITE_CONFIG.email;
      const val = emailEl.querySelector(".contact-link__value");
      if (val) val.textContent = SITE_CONFIG.email;
    }

    const linkedinEl = document.getElementById("contactLinkedin");
    if (linkedinEl) {
      linkedinEl.href = SITE_CONFIG.linkedin;
      const val = linkedinEl.querySelector(".contact-link__value");
      if (val) val.textContent = SITE_CONFIG.linkedin;
    }
  }
  wireConfigLinks();

  /* ------------------------------------------------------------------ */
  /* Mobile navigation                                                   */
  /* ------------------------------------------------------------------ */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  function closeMobileMenu() {
    navToggle.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("is-open");
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("[data-nav-link]").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMobileMenu();
    });
  }

  /* ------------------------------------------------------------------ */
  /* Active nav link highlighting on scroll                              */
  /* ------------------------------------------------------------------ */
  const navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = "#" + entry.target.id;
          const link = navLinks.find((l) => l.getAttribute("href") === id);
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove("is-active"));
            link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => navObserver.observe(section));
  }

  /* ------------------------------------------------------------------ */
  /* Helpers                                                             */
  /* ------------------------------------------------------------------ */
  const CATEGORY_LABELS = {
    development: "Development",
    design: "Graphic Design",
    document: "Document Design",
  };

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }

  function toolsMarkup(tools, chipClass) {
    if (!tools || !tools.length) return "";
    return tools
      .map((t) => `<li class="chip${chipClass ? " " + chipClass : ""}">${escapeHTML(t)}</li>`)
      .join("");
  }

  function linkButtons(project, variant) {
    const primaryClass = variant === "featured" ? "btn btn--primary" : "btn btn--secondary";
    const secondaryClass = "btn btn--secondary";
    let html = "";
    if (project.github) {
      html += `<a href="${escapeHTML(project.github)}" class="${secondaryClass}" target="_blank" rel="noopener">View on GitHub</a>`;
    }
    if (project.demo) {
      const label = project.category === "development" ? "Demo / Invite" : "View Live";
      html += `<a href="${escapeHTML(project.demo)}" class="${primaryClass}" target="_blank" rel="noopener">${label}</a>`;
    }
    return html;
  }

  /* ------------------------------------------------------------------ */
  /* Render: Featured project                                           */
  /* ------------------------------------------------------------------ */
  const featuredWrap = document.getElementById("featuredWork");
  const featured = PROJECTS.find((p) => p.featured);

  if (featured && featuredWrap) {
    featuredWrap.innerHTML = `
      <article class="featured-card" data-project-id="${escapeHTML(featured.id)}">
        <div class="featured-card__media">
          <img src="${escapeHTML(featured.image)}" alt="${escapeHTML(featured.title)} preview" loading="lazy">
        </div>
        <div class="featured-card__body">
          <span class="featured-card__badge">Featured Project</span>
          <h3 class="featured-card__title">${escapeHTML(featured.title)}</h3>
          <p class="featured-card__subtitle">${escapeHTML(featured.subtitle || "")}</p>
          <p class="featured-card__desc">${escapeHTML(featured.description)}</p>
          <ul class="chip-list featured-card__tools">${toolsMarkup(featured.tools)}</ul>
          <div class="featured-card__actions">${linkButtons(featured, "featured") || '<span class="chip">Links coming soon</span>'}</div>
        </div>
      </article>
    `;

    featuredWrap.querySelector(".featured-card__media").addEventListener("click", () => openModal(featured));
    featuredWrap.querySelector(".featured-card__media").style.cursor = "pointer";
  }

  /* ------------------------------------------------------------------ */
  /* Render: Work grid (non-featured projects) + empty states           */
  /* ------------------------------------------------------------------ */
  const workGrid = document.getElementById("workGrid");
  const nonFeatured = PROJECTS.filter((p) => !p.featured);

  const EMPTY_MESSAGES = {
    development: "More development projects will be added here as they're finished.",
    design: "More graphic designs will be added here soon.",
    document: "Document design examples will be added here soon.",
  };

  function cardMarkup(project) {
    return `
      <div class="project-card" data-project-id="${escapeHTML(project.id)}" data-category="${escapeHTML(project.category)}" role="button" tabindex="0" aria-label="Open ${escapeHTML(project.title)} details">
        <div class="project-card__media">
          <img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.title)} preview" loading="lazy">
        </div>
        <div class="project-card__body">
          <span class="project-card__category project-card__category--${escapeHTML(project.category)}">${CATEGORY_LABELS[project.category] || project.category}</span>
          <h3 class="project-card__title">${escapeHTML(project.title)}</h3>
          <p class="project-card__desc">${escapeHTML(project.description)}</p>
          <ul class="chip-list project-card__tools">${toolsMarkup(project.tools)}</ul>
        </div>
      </div>
    `;
  }

  function renderGrid(filter) {
    if (!workGrid) return;
    const items = nonFeatured.filter((p) => filter === "all" || p.category === filter);

    let html = items.map(cardMarkup).join("");

    // Empty-state placeholders: if a specific category filter has nothing, say so clearly.
    if (filter !== "all" && items.length === 0) {
      html = `<div class="empty-state">${EMPTY_MESSAGES[filter] || "Nothing here yet."}</div>`;
    }

    // On "All", also flag categories with zero items so the site never implies
    // more work exists than actually does.
    if (filter === "all") {
      Object.keys(EMPTY_MESSAGES).forEach((cat) => {
        const hasFeatured = featured && featured.category === cat;
        const hasItem = nonFeatured.some((p) => p.category === cat);
        if (!hasFeatured && !hasItem) {
          html += `<div class="empty-state">${EMPTY_MESSAGES[cat]}</div>`;
        }
      });
    }

    workGrid.innerHTML = html;

    workGrid.querySelectorAll(".project-card").forEach((card) => {
      const trigger = () => {
        const project = PROJECTS.find((p) => p.id === card.dataset.projectId);
        if (project) openModal(project);
      };
      card.addEventListener("click", trigger);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          trigger();
        }
      });
    });
  }

  renderGrid("all");

  /* ------------------------------------------------------------------ */
  /* Filtering                                                           */
  /* ------------------------------------------------------------------ */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const featuredCardEl = () => document.querySelector(".featured-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const filter = btn.dataset.filter;
      renderGrid(filter);

      // Hide the featured card if it doesn't match the active filter.
      if (featuredWrap) {
        const show = !featured || filter === "all" || featured.category === filter;
        featuredWrap.style.display = show ? "" : "none";
      }
    });
  });

  /* ------------------------------------------------------------------ */
  /* Modal / lightbox                                                    */
  /* ------------------------------------------------------------------ */
  const modal = document.getElementById("projectModal");
  const modalImage = document.getElementById("modalImage");
  const modalCategory = document.getElementById("modalCategory");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalTools = document.getElementById("modalTools");
  const modalActions = document.getElementById("modalActions");
  let lastFocusedEl = null;

  function openModal(project) {
    lastFocusedEl = document.activeElement;

    modalImage.src = project.image;
    modalImage.alt = project.title + " preview";
    modalCategory.textContent = CATEGORY_LABELS[project.category] || project.category;
    modalCategory.className = "modal__category project-card__category--" + project.category;
    modalTitle.textContent = project.title;
    modalDesc.textContent = project.description;
    modalTools.innerHTML = toolsMarkup(project.tools);
    modalActions.innerHTML = linkButtons(project, "modal") || "";

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal__close").focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  modal.querySelectorAll("[data-modal-close]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  // Basic focus trap while modal is open.
  modal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab" || modal.hidden) return;
    const focusable = modal.querySelectorAll('button, a[href]');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
})();
