/**
 * Main application file for the portfolio game
 */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set current year in the footer if needed
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Initialize the game
  const game = new PortfolioGame();

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
    // Ensure character stays in bounds
    game.positionCharacter();
  });

  // Theme switcher logic
  const switchInput = document.querySelector("#theme-switch input");
  switchInput.addEventListener("change", function () {
    document.body.classList.toggle("light-mode", this.checked);
  });
});
