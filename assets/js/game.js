/**
 * Game logic for the portfolio game
 */

class PortfolioGame {
  constructor() {
    // Game elements
    this.gameContainer = document.querySelector(".game-container");
    this.character = document.getElementById("character");
    this.gameWorld = document.getElementById("game-world");
    this.portals = document.querySelectorAll(".portal");
    this.progressBar = document.getElementById("progress");
    this.progressText = document.getElementById("progress-percentage");

    // Game state
    this.keys = {};
    this.gameStarted = false;
    this.characterPos = {
      x: this.gameWorld.offsetWidth / 2 - 60, // Centered for 120px character
      y: this.gameWorld.offsetHeight / 2 - 60,
    };
    this.speed = 4; // Movement speed in pixels
    this.visitedSections = new Set();
    this.totalSections = this.portals.length;
    this.nearPortal = null;
    this.lastDirection = "right";
    this.cameraTarget = { x: 0, y: 0 };
    this.cameraCurrent = { x: 0, y: 0 };
    this.currentOpenSection = null;
    this.footprintTimer = 0;
    this.lastFootprintLeft = true;

    // Audio elements
    this.sounds = {
      click: new Audio("assets/sounds/click.mp3"),
      unlock: new Audio("assets/sounds/unlock.mp3"),
      background: new Audio("assets/sounds/Background.mp3"),
      checkpoint: new Audio("assets/sounds/CheckPoint.mp3"),
    };

    // Set background music properties
    this.sounds.background.loop = true;
    this.sounds.background.volume = 0.3;
    // Start background music as soon as the website loads
    this.sounds.background.play().catch(() => {
      // Some browsers block autoplay; will start on first user interaction
      document.addEventListener(
        "click",
        () => {
          this.sounds.background.play();
        },
        { once: true }
      );
    });

    // Load lastDirection from localStorage if available
    const savedDirection = localStorage.getItem("lastDirection");
    this.lastDirection =
      savedDirection === "left" || savedDirection === "right"
        ? savedDirection
        : "right";

    // Initialize
    this.bindEventListeners();
    this.positionCharacter();
    this.character.classList.add("idle");

    // Center each portal on its world coordinates
    this.portals.forEach((portal) => {
      const portalX = parseFloat(portal.dataset.x);
      const portalY = parseFloat(portal.dataset.y);
      portal.style.left = `${portalX}px`;
      portal.style.top = `${portalY}px`;
    });

    // Pause/resume background music on tab visibility change
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.sounds.background.pause();
      } else {
        this.sounds.background.play().catch(() => {});
      }
    });
  }

  bindEventListeners() {
    // Keyboard controls
    document.addEventListener("keydown", (e) => {
      this.keys[e.key] = true;
      console.log("Keydown:", e.key);
    });

    document.addEventListener("keyup", (e) => {
      this.keys[e.key] = false;
      // Open portal on 'e' key press
      if (e.key === "e" || e.key === "E") {
        if (this.nearPortal) {
          this.openSection(this.nearPortal.dataset.section);
        }
      }
    });

    // Portal interactions
    this.portals.forEach((portal) => {
      portal.addEventListener("click", () => {
        if (this.nearPortal === portal) {
          this.openSection(portal.dataset.section);
        }
      });
    });

    // Modal close button
    const closeModalBtn = document.getElementById("close-modal");
    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", () => {
        document.getElementById("content-modal").style.display = "none";
        this.currentOpenSection = null;
      });
    }

    // Allow closing modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.getElementById("content-modal").style.display = "none";
        this.currentOpenSection = null;
      }
    });

    // Start game button
    const startGameBtn = document.getElementById("start-game");
    startGameBtn.addEventListener("click", () => {
      this.startGame();
    });
    // Allow Enter key to start the game
    document.addEventListener("keydown", (e) => {
      const welcomeScreen = document.getElementById("welcome-screen");
      if (
        (e.key === "Enter" || e.key === "NumpadEnter") &&
        welcomeScreen &&
        welcomeScreen.style.display !== "none"
      ) {
        this.startGame();
      }
    });
  }

  startGame() {
    // Hide welcome screen
    document.getElementById("welcome-screen").style.display = "none";

    // Start the game loop
    this.gameStarted = true;
    requestAnimationFrame(() => this.gameLoop());

    // Play background music
    this.sounds.background.play().catch((error) => {
      console.log("Auto-play prevented:", error);
    });

    // Position character
    this.characterPos = {
      x: this.gameWorld.offsetWidth / 2 - 60, // Centered for 120px character
      y: this.gameWorld.offsetHeight / 2 - 60,
    };
    this.positionCharacter();
  }

  gameLoop() {
    if (!this.gameStarted) return;

    this.updateCharacterPosition();
    this.checkPortalProximity();
    this.updateCamera(); // Smooth camera follow
    this.updateFootprints();

    // Continue the game loop
    requestAnimationFrame(() => this.gameLoop());
  }

  updateCharacterPosition() {
    let moved = false;
    let horizontalDirection = null;

    // Calculate movement delta
    let deltaX = 0;
    let deltaY = 0;

    if (this.keys["ArrowUp"] || this.keys["w"] || this.keys["W"]) {
      deltaY = -this.speed;
      moved = true;
    }
    if (this.keys["ArrowDown"] || this.keys["s"] || this.keys["S"]) {
      deltaY = this.speed;
      moved = true;
    }
    if (this.keys["ArrowLeft"] || this.keys["a"] || this.keys["A"]) {
      deltaX = -this.speed;
      moved = true;
      horizontalDirection = "left";
    }
    if (this.keys["ArrowRight"] || this.keys["d"] || this.keys["D"]) {
      deltaX = this.speed;
      moved = true;
      horizontalDirection = "right";
    }

    if (moved) {
      // Update character position
      this.characterPos.x += deltaX;
      this.characterPos.y += deltaY;

      // Position character on screen
      this.positionCharacter();

      // Update character direction and animation
      if (horizontalDirection) {
        this.lastDirection = horizontalDirection;
        // Save lastDirection to localStorage
        localStorage.setItem("lastDirection", this.lastDirection);
      }
      const scaleX = this.lastDirection === "left" ? -1 : 1;
      this.character.style.transform = `scaleX(${scaleX})`;

      this.character.classList.add("walking");
      this.character.classList.remove("idle");
      this.addFootprint();
    } else {
      this.character.classList.remove("walking");
      this.character.classList.add("idle");
      // Ensure character faces last direction even when idle
      const scaleX = this.lastDirection === "left" ? -1 : 1;
      this.character.style.transform = `scaleX(${scaleX})`;
    }

    // Update camera target to follow character
    const container = document.querySelector(".game-container");
    this.cameraTarget.x =
      this.characterPos.x -
      container.offsetWidth / 2 +
      this.character.offsetWidth / 2;
    this.cameraTarget.y =
      this.characterPos.y -
      container.offsetHeight / 2 +
      this.character.offsetHeight / 2;

    console.log(
      "Character position:",
      this.characterPos.x,
      this.characterPos.y
    );
  }

  positionCharacter() {
    this.character.style.left = `${this.characterPos.x}px`;
    this.character.style.top = `${this.characterPos.y}px`;
  }

  checkPortalProximity() {
    let foundActive = false;
    let activeSection = null;
    let minDistance = 80;

    this.portals.forEach((portal) => {
      const portalX = parseFloat(portal.dataset.x);
      const portalY = parseFloat(portal.dataset.y);
      const dx = this.characterPos.x - portalX;
      const dy = this.characterPos.y - portalY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < minDistance && !foundActive) {
        portal.classList.add("active");
        this.nearPortal = portal;
        foundActive = true;
        activeSection = portal.dataset.section;
      } else {
        portal.classList.remove("active");
      }
    });

    if (foundActive) {
      if (this.currentOpenSection !== activeSection) {
        this.openSection(activeSection);
        this.currentOpenSection = activeSection;
      }
    } else {
      if (this.currentOpenSection !== null) {
        document.getElementById("content-modal").style.display = "none";
        this.currentOpenSection = null;
      }
    }
  }

  openSection(sectionId) {
    if (!sectionId || !cvData[sectionId]) return;

    this.sounds.click.play();

    const section = cvData[sectionId];
    document.getElementById("modal-title").textContent = section.title;
    document.getElementById("modal-body").innerHTML = section.content;

    const modal = document.getElementById("content-modal");
    modal.style.display = "block";

    if (!this.visitedSections.has(sectionId)) {
      this.visitedSections.add(sectionId);
      this.updateProgress();
      this.sounds.unlock.play();
      // Play checkpoint sound when reaching a new section (checkpoint)
      this.sounds.checkpoint.currentTime = 0;
      this.sounds.checkpoint.play();
    }
  }

  updateProgress() {
    const progress = this.visitedSections.size;
    if (this.progressBar) {
      this.progressBar.value = progress;
      this.progressBar.max = this.totalSections;
    }
    if (this.progressText) {
      this.progressText.textContent = `${Math.round(
        (progress / this.totalSections) * 100
      )}%`;
    }
    if (progress === this.totalSections) {
      this.celebrateCompletion();
    }
  }

  celebrateCompletion() {
    // Show completion message
    setTimeout(() => {
      const modal = document.getElementById("content-modal");
      document.getElementById("modal-title").textContent =
        "Portfolio Complete!";
      document.getElementById("modal-body").innerHTML = `
              <div style="text-align: center; padding: 20px;">
                  <h3>Congratulations!</h3>
                  <p>You've explored my entire portfolio. Thank you!</p>
              </div>
          `;
      modal.style.display = "block";
    }, 1000);
  }

  updateCamera() {
    const lerp = (a, b, t) => a + (b - a) * t;
    this.cameraCurrent.x = lerp(this.cameraCurrent.x, this.cameraTarget.x, 0.1);
    this.cameraCurrent.y = lerp(this.cameraCurrent.y, this.cameraTarget.y, 0.1);

    const worldWidth = this.gameWorld.scrollWidth;
    const worldHeight = this.gameWorld.scrollHeight;
    const screenWidth = this.gameWorld.clientWidth;
    const screenHeight = this.gameWorld.clientHeight;

    const x = -this.cameraCurrent.x;
    const y = -this.cameraCurrent.y;

    this.gameWorld.style.transform = `translate(${x}px, ${y}px)`;
    this.gameContainer.style.backgroundPosition = `${x}px ${y}px`;
  }

  addFootprint() {
    // Only add a footprint every ~8px of movement
    this.footprintTimer = (this.footprintTimer || 0) + 1;
    if (this.footprintTimer < 6) return;
    this.footprintTimer = 0;
    const fp = document.createElement("div");
    fp.className = "footprint";
    // Alternate left/right
    const offsetX = this.lastFootprintLeft ? -8 : 8;
    this.lastFootprintLeft = !this.lastFootprintLeft;
    fp.style.left = this.characterPos.x + 20 + offsetX + "px";
    fp.style.top = this.characterPos.y + 38 + "px";
    this.gameWorld.appendChild(fp);
    setTimeout(() => fp.remove(), 1200);
  }

  updateFootprints() {
    // No-op, but can be used for advanced footprint logic if needed
  }
}

// Initialize the game when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const game = new PortfolioGame();
});
