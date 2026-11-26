/* ==========================================================================
   Vitor Paz — mathematics & software
   ========================================================================== */

(() => {
  "use strict";

  const escapeHTML = (value) =>
    String(value).replace(/[&<>"']/g, (char) => {
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };
      return map[char];
    });

  const safeUrl = (value) => {
    if (!value) return "";
    try {
      const url = new URL(value, window.location.href);
      return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
    } catch {
      return "";
    }
  };

  const formatUpdated = (value) => {
    if (!value) return "";
    const date = new Date(`${value}T12:00:00`);
    if (Number.isNaN(date.getTime())) return "";
    return `Updated ${date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })}`;
  };

  const renderProject = (project) => {
    const meta = [project.year, project.category, project.status]
      .filter(Boolean)
      .map(escapeHTML)
      .join(" / ");

    const site = safeUrl(project.links && project.links.site);
    const repo = safeUrl(project.links && project.links.repo);

    const title = site
      ? `<a href="${escapeHTML(site)}" target="_blank" rel="noopener noreferrer">${escapeHTML(project.title)}</a>`
      : escapeHTML(project.title);

    const links = [];
    if (site) {
      links.push(
        `<a href="${escapeHTML(site)}" target="_blank" rel="noopener noreferrer">Visit site</a>`
      );
    }
    if (repo) {
      links.push(
        `<a href="${escapeHTML(repo)}" target="_blank" rel="noopener noreferrer">Repository</a>`
      );
    }

    const linkMarkup = links.length
      ? `<div class="work-item__links">${links.join("")}</div>`
      : '<p class="work-item__links">Private repository</p>';

    const tags =
      Array.isArray(project.tags) && project.tags.length
        ? `<p class="work-item__tags">${project.tags.map(escapeHTML).join(", ")}</p>`
        : "";

    return `
      <article class="work-item">
        <p class="work-item__meta">${meta}</p>
        <h3 class="work-item__title">${title}</h3>
        <p class="work-item__desc">${escapeHTML(project.description || "")}</p>
        ${tags}
        ${linkMarkup}
      </article>`;
  };

  const initWork = () => {
    const container = document.querySelector("#work-items");
    const error = document.querySelector("#work-error");
    const updated = document.querySelector("#work-updated");

    if (!container) return;

    fetch("projects.json", { cache: "no-cache" })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : data.projects;
        if (!Array.isArray(list)) throw new Error("invalid format");

        const projects = list.filter((project) => project && project.title);
        container.innerHTML = projects.length
          ? projects.map(renderProject).join("")
          : '<p class="work-error">No projects listed yet.</p>';
        container.setAttribute("aria-busy", "false");

        if (updated && !Array.isArray(data)) {
          updated.textContent = formatUpdated(data.updated);
        }
      })
      .catch((err) => {
        console.error("[work]", err);
        container.setAttribute("aria-busy", "false");
        if (error) error.hidden = false;
      });
  };

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWork);
  } else {
    initWork();
  }
})();
