// Integrated Terminal & Command Palette Simulation for Cursor UI Clone
class TerminalManager {
  constructor() {
    this.isOpen = false;
    this.activeTab = "terminal";
    this.history = [];
    this.initListeners();
  }

  initListeners() {
    // Keyboard shortcut Cmd/Ctrl + Shift + P for Command Palette
    window.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        this.toggleCommandPalette();
      }

      // Toggle terminal drawer with Ctrl + backtick
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        this.toggleTerminalDrawer();
      }
    });
  }

  toggleCommandPalette() {
    const palette = document.getElementById("command-palette");
    if (!palette) {
      console.warn("Command palette DOM element not found.");
      return;
    }
    palette.classList.toggle("active");
  }

  toggleTerminalDrawer() {
    this.isOpen = !this.isOpen;
    const drawer = document.getElementById("terminal-drawer");
    if (drawer) {
      drawer.style.display = this.isOpen ? "flex" : "none";
    }
  }

  executeCommand(command) {
    if (!command || !command.trim()) return;
    this.history.push(command);
    console.log("[Terminal] Executing command:", command);
    return { status: "success", timestamp: Date.now() };
  }
}

// Instantiate manager on load
document.addEventListener("DOMContentLoaded", () => {
  window.cursorTerminal = new TerminalManager();
});
