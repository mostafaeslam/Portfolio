/**
 * Main application file for the portfolio game
 */

// Mobile device detection function
function isMobileDevice() {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) ||
    (window.innerWidth <= 768 && window.innerHeight <= 1024)
  );
}

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is on mobile device
  if (isMobileDevice()) {
    const mobileWarning = document.getElementById("mobile-warning");
    if (mobileWarning) {
      mobileWarning.classList.add("show");
      return; // Don't initialize the game on mobile
    }
  }
  // Set current year in the footer if needed
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Initialize the game (only if not on mobile)
  let game;
  if (!isMobileDevice()) {
    game = new PortfolioGame();
  }

  // Ensure proper loading of assets before showing welcome screen
  window.addEventListener("load", () => {
    // Add any additional initialization here
  });

  // Handle modal click events (close when clicking outside the content)
  const modal = document.getElementById("content-modal");
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Handle window resize (adjust character position if needed)
  window.addEventListener("resize", () => {
    // Check if device became mobile after resize
    if (isMobileDevice()) {
      const mobileWarning = document.getElementById("mobile-warning");
      if (mobileWarning && !mobileWarning.classList.contains("show")) {
        mobileWarning.classList.add("show");
        return;
      }
    }

    // Ensure character stays in bounds (only if not on mobile)
    if (!isMobileDevice()) {
      game.positionCharacter();
    }
  });

  // Theme switcher logic
  const switchInput = document.querySelector("#theme-switch input");
  switchInput.addEventListener("change", function () {
    document.body.classList.toggle("light-mode", this.checked);
  });
});
