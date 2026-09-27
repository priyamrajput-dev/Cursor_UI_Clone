// Cursor UI Clone interactive controls
document.addEventListener("DOMContentLoaded", () => {
  // Global quick search shortcut (Cmd+K / Ctrl+K)
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      const searchInput = document.querySelector('input[type="text"], input[type="search"]');
      if (searchInput) {
        searchInput.focus();
        searchInput.select?.();
      }
    }

    // Dismiss active search on Escape
    if (e.key === "Escape") {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) {
        activeEl.blur();
      }
    }
  });

  // Smooth scroll for internal navigation links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId && targetId !== "#") {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
});
