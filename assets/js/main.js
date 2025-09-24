/* ==========================================================================
   main.js — Nirav Ramidi Portfolio
   Lightweight enhancements: year, smooth-scroll, copy buttons, external links,
   contact form fetch, and small reveal-on-view (respecting reduced motion).
   ========================================================================== */

(function () {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ----------------------------------------
     1) Current year in footer
     ---------------------------------------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----------------------------------------
     2) External links: open in new tab + noopener
     ---------------------------------------- */
  const { host, protocol } = window.location;
  $$("a[href^='http']").forEach((a) => {
    try {
      const url = new URL(a.href);
      if (url.host !== host || url.protocol !== protocol) {
        a.target = "_blank";
        // preserve any existing rel values
        const rel = new Set((a.getAttribute("rel") || "").split(" ").filter(Boolean));
        rel.add("noopener"); rel.add("noreferrer");
        a.setAttribute("rel", Array.from(rel).join(" "));
        a.classList.add("external-link");
      }
    } catch (_) { /* ignore malformed hrefs */ }
  });

  /* ----------------------------------------
     3) Smooth-scroll for hash links (a[href^="#"])
     Respects prefers-reduced-motion.
     ---------------------------------------- */
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      // ignore if just "#" or empty
      if (!id || id === "#") return;
      const target = document.getElementById(id.slice(1));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
      // Move focus for accessibility
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });

  /* ----------------------------------------
     4) Active nav state (aria-current)
     ---------------------------------------- */
  const path = window.location.pathname.replace(/\/index\.html$/, "/");
  $$(".site-nav a[href]").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;
    // Resolve relative hrefs to absolute path
    const linkPath = new URL(href, window.location.origin).pathname.replace(/\/index\.html$/, "/");
    if (path === linkPath) a.setAttribute("aria-current", "page");
  });

  /* ----------------------------------------
     5) Copy-to-clipboard buttons for code blocks
     Works on: <pre class="code-block"><code>...</code></pre> or plain <pre><code>
     ---------------------------------------- */
  function addCopyButtons() {
    const blocks = $$("pre");
    blocks.forEach((pre) => {
      if (pre.dataset.copyEnhanced) return;
      const code = $("code", pre);
      if (!code) return;

      // Positioning
      pre.style.position = pre.style.position || "relative";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy-btn";
      btn.innerText = "Copy";
      Object.assign(btn.style, {
        position: "absolute",
        top: "8px",
        right: "8px",
        padding: "6px 10px",
        fontSize: "12px",
        fontWeight: "700",
        borderRadius: "9999px",
        border: "1px solid var(--border)",
        background: "var(--soft)",
        color: "var(--text)",
        cursor: "pointer",
        opacity: "0.85"
      });

      btn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(code.innerText);
          const original = btn.innerText;
          btn.innerText = "Copied!";
          btn.style.background = "color-mix(in oklab, var(--success), var(--bg) 70%)";
          setTimeout(() => { btn.innerText = original; btn.style.background = "var(--soft)"; }, 1200);
        } catch {
          // Fallback for older browsers
          const range = document.createRange();
          range.selectNodeContents(code);
          const sel = window.getSelection();
          sel.removeAllRanges(); sel.addRange(range);
          document.execCommand("copy");
          sel.removeAllRanges();
          btn.innerText = "Copied!";
          setTimeout(() => (btn.innerText = "Copy"), 1200);
        }
      });

      pre.appendChild(btn);
      pre.dataset.copyEnhanced = "true";
    });
  }
  addCopyButtons();

  /* ----------------------------------------
     6) Progressive enhancement for contact form
     Expect a form with id="contact-form" or [data-enhance]
     Submits via fetch to form.action (POST).
     ---------------------------------------- */
  const form = $("#contact-form") || $("form[data-enhance]");
  if (form && form.getAttribute("method")?.toLowerCase() !== "get" && form.getAttribute("action")) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const status = $("#form-status") || Object.assign(document.createElement("div"), { id: "form-status" });
      if (!status.parentNode) form.appendChild(status);
      status.textContent = "Sending…";
      status.className = "small muted";

      const fd = new FormData(form);
      // If backend expects JSON, uncomment the JSON version
      // const body = JSON.stringify(Object.fromEntries(fd.entries()));
      try {
        const res = await fetch(form.action, {
          method: form.getAttribute("method") || "POST",
          body: fd,
          headers: { "Accept": "application/json" }
          // For JSON:
          // headers: { "Content-Type": "application/json", "Accept": "application/json" },
          // body
        });

        if (res.ok) {
          form.reset();
          status.textContent = "Thanks! Your message has been sent.";
          status.className = "small";
        } else {
          const data = await res.json().catch(() => ({}));
          status.textContent = data.error || "Oops — something went wrong. Please try again or email me directly.";
          status.className = "small";
        }
      } catch (_) {
        status.textContent = "Network error — please try again later.";
        status.className = "small";
      }
    });
  }

  /* ----------------------------------------
     7) Reveal-on-view for cards (skips if reduced motion)
     ---------------------------------------- */
  if (!prefersReduced && "IntersectionObserver" in window) {
    const reveal = (el) => {
      el.style.transform = "translateY(8px)";
      el.style.opacity = "0";
      el.style.transition = "opacity .5s ease, transform .5s ease";
      observer.observe(el);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transform = "none";
          entry.target.style.opacity = "1";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    $$(".card, .project-card").forEach(reveal);
  }

  /* ----------------------------------------
     8) Little helper: warn if PDF links missing (dev-only)
     Console hint when a .pdf link 404s after click.
     ---------------------------------------- */
  $$(".actions a[href$='.pdf'], .list a[href$='.pdf']").forEach((a) => {
    a.addEventListener("click", async (e) => {
      // HEAD check (best effort; some hosts block it)
      try {
        const res = await fetch(a.href, { method: "HEAD" });
        if (!res.ok) console.warn("PDF not found (check filename/path):", a.href);
      } catch { /* ignore */ }
    });
  });
})();
