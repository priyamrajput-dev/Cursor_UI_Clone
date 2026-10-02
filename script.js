// ==========================================================
// Cursor UI Clone - Modern Interactive Controls & Theme Engine
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------------------------------------
  // 1. Toast Notification System
  // ----------------------------------------------------------
  const toast = document.getElementById("toast");
  let toastTimeout = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 2400);
  }

  // ----------------------------------------------------------
  // 2. Theme Engine (Light / Dark Mode with Persistence)
  // ----------------------------------------------------------
  const themeToggle = document.getElementById("theme-toggle");
  
  function initTheme() {
    const savedTheme = localStorage.getItem("cursor-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  initTheme();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isCurrentlyDark = document.documentElement.classList.contains("dark");
      const nextTheme = isCurrentlyDark ? "light" : "dark";
      
      document.documentElement.classList.toggle("dark");
      localStorage.setItem("cursor-theme", nextTheme);
      showToast(`Switched to ${nextTheme === "dark" ? "Dark" : "Light"} Mode`);
    });
  }

  // ----------------------------------------------------------
  // 3. Scroll Progress Bar & Floating Back-To-Top
  // ----------------------------------------------------------
  const scrollProgress = document.getElementById("scroll-progress");
  const backToTop = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${scrollPercent}%`;
    }

    if (backToTop) {
      if (scrollTop > 380) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ----------------------------------------------------------
  // 4. Quick Search Shortcut (Cmd+K / Ctrl+K & Clickable Pill)
  // ----------------------------------------------------------
  const promptInput = document.getElementById("prompt-input");
  const promptForm = document.getElementById("prompt-form");
  const shortcutPill = document.querySelector(".shortcut-pill");

  function focusPrompt() {
    if (promptInput) {
      promptInput.focus();
      promptInput.scrollIntoView({ behavior: "smooth", block: "center" });
      if (promptForm) {
        promptForm.style.transition = "box-shadow 0.3s ease, border-color 0.3s ease";
        promptForm.style.boxShadow = "0 0 0 3px rgba(255, 106, 0, 0.4)";
        promptForm.style.borderColor = "#ff6a00";
        setTimeout(() => {
          promptForm.style.boxShadow = "";
          promptForm.style.borderColor = "";
        }, 1200);
      }
      showToast("Quick Edit (⌘K) focused");
    }
  }

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      focusPrompt();
    }
  });

  if (shortcutPill) {
    shortcutPill.addEventListener("click", () => {
      focusPrompt();
    });
  }

  // ----------------------------------------------------------
  // 5. Mobile Navigation Toggle
  // ----------------------------------------------------------
  const mobileToggle = document.getElementById("mobile-toggle");
  const navLinks = document.getElementById("nav-links");

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const isOpen = navLinks.classList.contains("open");
      mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // ----------------------------------------------------------
  // 6. Smooth Scrolling for Anchor Links
  // ----------------------------------------------------------
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          if (navLinks && navLinks.classList.contains("open")) {
            navLinks.classList.remove("open");
          }
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // ----------------------------------------------------------
  // 7. Interactive Sidebar Tasks Switching
  // ----------------------------------------------------------
  const taskItems = document.querySelectorAll("#task-list li");
  const currentTaskTitle = document.getElementById("current-task-title");
  const editorOutput = document.getElementById("editor-output");

  const taskDetails = {
    "landing-page": {
      title: "Build Landing Page",
      output: "Done. Fonts preload in the head, critical CSS is inline, and I added a color-scheme meta tag so dark mode renders instantly without flash."
    },
    "tab-vs-agent": {
      title: "Analyze Tab vs Agent",
      output: "Completed focus tracking comparison. Agent reduced keystrokes by 64% while maintaining 98.4% suggestion acceptance."
    },
    "mission-control": {
      title: "Plan Mission Control",
      output: "Mission Control architecture outlined in design docs. Webhook listener and queue workers configured for low latency."
    },
    "mnist": {
      title: "PyTorch MNIST Experiments",
      output: "Trained CNN model with AdamW optimizer across 20 epochs. Test accuracy achieved 99.24% with learning rate warmup."
    },
    "bioinformatics": {
      title: "Bioinformatics Tools",
      output: "Optimized FASTQ parser using zero-copy memory buffers. Pipeline throughput increased from 120MB/s to 480MB/s."
    }
  };

  taskItems.forEach((item) => {
    item.addEventListener("click", () => {
      taskItems.forEach((t) => t.classList.remove("active"));
      item.classList.add("active");

      const taskKey = item.getAttribute("data-task");
      if (taskKey && taskDetails[taskKey]) {
        if (currentTaskTitle) {
          currentTaskTitle.textContent = taskDetails[taskKey].title;
        }
        if (editorOutput) {
          const p = editorOutput.querySelector("p");
          if (p) {
            p.style.opacity = "0";
            setTimeout(() => {
              p.textContent = taskDetails[taskKey].output;
              p.style.transition = "opacity 0.25s ease";
              p.style.opacity = "1";
            }, 150);
          }
        }
        showToast(`Switched to: ${taskDetails[taskKey].title}`);
      }
    });
  });

  // ----------------------------------------------------------
  // 8. Interactive File Diff Switcher & Copy Snippet
  // ----------------------------------------------------------
  const fileChanges = document.querySelectorAll(".file-change");
  const diffTitle = document.getElementById("diff-title");
  const diffCode = document.getElementById("diff-code");
  const diffCopyBtn = document.getElementById("diff-copy-btn");

  const diffSnippets = {
    page: {
      title: "app/page.tsx (Diff)",
      code: `<span class="diff-del">- export default function OldHome() {</span>
<span class="diff-add">+ export default async function Page() {</span>
<span class="diff-add">+   const session = await auth.getSession();</span>
<span class="diff-ctx">    return &lt;AcmeLanding session={session} /&gt;;</span>
<span class="diff-ctx">  }</span>`,
      raw: `export default async function Page() {
  const session = await auth.getSession();
  return <AcmeLanding session={session} />;
}`
    },
    globals: {
      title: "app/globals.css (Diff)",
      code: `<span class="diff-del">- :root { color-scheme: dark; }</span>
<span class="diff-add">+ :root { --font-sans: 'Geist', sans-serif; }</span>
<span class="diff-add">+ html.dark { color-scheme: dark; --bg: #14120b; }</span>
<span class="diff-ctx">  body { background: var(--bg); color: #fff; }</span>`,
      raw: `:root { --font-sans: 'Geist', sans-serif; }
html.dark { color-scheme: dark; --bg: #14120b; }
body { background: var(--bg); color: #fff; }`
    }
  };

  fileChanges.forEach((fc) => {
    fc.addEventListener("click", () => {
      fileChanges.forEach((item) => item.classList.remove("active"));
      fc.classList.add("active");

      const fileKey = fc.getAttribute("data-file") || "page";
      if (diffSnippets[fileKey]) {
        if (diffTitle) diffTitle.textContent = diffSnippets[fileKey].title;
        if (diffCode) diffCode.innerHTML = `<code>${diffSnippets[fileKey].code}</code>`;
        showToast(`Viewing ${diffSnippets[fileKey].title}`);
      }
    });
  });

  if (diffCopyBtn) {
    diffCopyBtn.addEventListener("click", () => {
      const activeFile = document.querySelector(".file-change.active");
      const fileKey = activeFile?.getAttribute("data-file") || "page";
      const snippet = diffSnippets[fileKey]?.raw || "";

      if (navigator.clipboard && snippet) {
        navigator.clipboard.writeText(snippet).then(() => {
          const span = diffCopyBtn.querySelector("span");
          if (span) span.textContent = "Copied!";
          showToast("Code diff copied to clipboard!");
          setTimeout(() => {
            if (span) span.textContent = "Copy";
          }, 2000);
        });
      }
    });
  }

  // ----------------------------------------------------------
  // 9. Quick Prompt Suggestion Chips
  // ----------------------------------------------------------
  const promptChips = document.querySelectorAll(".prompt-chip");
  promptChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const promptText = chip.getAttribute("data-prompt");
      if (promptInput && promptText) {
        promptInput.value = promptText;
        promptInput.focus();
        if (promptForm) {
          promptForm.dispatchEvent(new Event("submit"));
        }
      }
    });
  });

  // ----------------------------------------------------------
  // 10. Interactive Prompt Form Simulation
  // ----------------------------------------------------------
  if (promptForm && promptInput) {
    promptForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = promptInput.value.trim();
      if (!val) return;

      if (editorOutput) {
        const p = editorOutput.querySelector("p");
        if (p) {
          p.textContent = `✦ Agent thinking... analyzing repository context for "${val}"`;
          setTimeout(() => {
            p.textContent = `Applied changes for "${val}". Codebase indexed and all 14 integration tests passing.`;
            showToast("Agent completed instruction!");
          }, 600);
        }
      }
      promptInput.value = "";
    });
  }
});
