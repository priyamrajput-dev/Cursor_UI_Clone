// ==========================================================
// Cursor UI Clone - Modern Interactive Controls
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Global quick search shortcut (Cmd+K / Ctrl+K)
  const promptInput = document.getElementById("prompt-input");
  const promptForm = document.getElementById("prompt-form");

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
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
      }
    }
  });

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.getElementById("mobile-toggle");
  const navLinks = document.getElementById("nav-links");

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const isOpen = navLinks.classList.contains("open");
      mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // 3. Smooth scrolling for internal navigation links
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

  // 4. Interactive Sidebar Tasks Switching
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
      }
    });
  });

  // 5. Interactive Prompt Form Simulation
  if (promptForm && promptInput) {
    promptForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = promptInput.value.trim();
      if (!val) return;

      if (editorOutput) {
        const p = editorOutput.querySelector("p");
        if (p) {
          p.textContent = `Processing instruction: "${val}"... Done. Updated codebase with precision.`;
        }
      }
      promptInput.value = "";
    });
  }
});
