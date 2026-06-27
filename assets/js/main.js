/*
 * JavaScript Main Control file for Academic Research Editing & Proofreading
 * Designed by Antigravity
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- Initialize Page Loader ---
  const loader = document.getElementById("page-loader");
  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
      }, 500); // 500ms smooth fade-out
    });
    // Fallback if window load doesn't trigger quickly
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";
    }, 2000);
  }

  // --- Theme Engine (Light / Dark) ---
  const themeToggle = document.getElementById("themeToggle");
  const currentTheme = localStorage.getItem("theme") || "light";
  
  document.documentElement.setAttribute("data-theme", currentTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      let theme = document.documentElement.getAttribute("data-theme");
      let nextTheme = theme === "dark" ? "light" : "dark";
      
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("theme", nextTheme);
    });
  }

  // --- RTL Engine (Left-to-Right / Right-to-Left) ---
  const rtlToggle = document.getElementById("rtlToggle");
  const bootstrapStyleLink = document.getElementById("bootstrap-theme-link");
  const currentDir = localStorage.getItem("dir") || "ltr";
  
  setDirection(currentDir);

  if (rtlToggle) {
    rtlToggle.addEventListener("click", () => {
      let dir = document.documentElement.getAttribute("dir");
      let nextDir = dir === "rtl" ? "ltr" : "rtl";
      setDirection(nextDir);
    });
  }

  function setDirection(dir) {
    document.documentElement.setAttribute("dir", dir);
    localStorage.setItem("dir", dir);
    
    // Swap bootstrap css file based on direction
    if (bootstrapStyleLink) {
      if (dir === "rtl") {
        bootstrapStyleLink.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css";
      } else {
        bootstrapStyleLink.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
      }
    }

    // Toggle active state styling on the toggle button itself
    if (rtlToggle) {
      if (dir === "rtl") {
        rtlToggle.classList.add("active");
        rtlToggle.querySelector("span").textContent = "LTR";
      } else {
        rtlToggle.classList.remove("active");
        rtlToggle.querySelector("span").textContent = "RTL";
      }
    }
  }

  // --- Navbar Scroll Class ---
  const navbar = document.querySelector(".navbar-custom");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  });

  // --- Scroll Reveal System (Fade Up, Staggered Reveals) ---
  const revealElements = document.querySelectorAll(".scroll-reveal");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Counters Animation (Why Choose Section) ---
  const counterElements = document.querySelectorAll(".counter-value");
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(target.getAttribute("data-target"), 10);
        animateCounter(target, targetValue);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => counterObserver.observe(el));

  function animateCounter(element, targetValue) {
    let start = 0;
    const duration = 1500; // ms
    const stepTime = Math.abs(Math.floor(duration / targetValue));
    
    // Safety fallback
    const intervalTime = Math.max(stepTime, 15);
    const increment = targetValue / (duration / intervalTime);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        element.textContent = targetValue;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start);
      }
    }, intervalTime);
  }

  // --- Back to Top ---
  const backToTopBtn = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn?.classList.add("visible");
    } else {
      backToTopBtn?.classList.remove("visible");
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // --- Expert Matching Quiz Demo (Subject Specialist Matching Section) ---
  const fieldSelect = document.getElementById("fieldSelect");
  const matchBtn = document.getElementById("matchBtn");
  const matchResult = document.getElementById("matchResult");
  const pingElement = document.querySelector(".radar-ping");
  const tagsContainer = document.getElementById("tagsContainer");

  const tagsData = {
    medicine: ["Clinical Trials", "Oncology", "Pharmacology", "Systematic Reviews", "Cardiology"],
    engineering: ["Machine Learning", "Aerospace", "Signal Processing", "Structural Mechanics", "Renewable Energy"],
    humanities: ["Linguistics", "Post-colonial Studies", "Philosophy", "Art History", "Cultural Anthropology"],
    social: ["Quantitative Psychology", "Macroeconomics", "Sociometrics", "Behavioral Finance", "Political Science"]
  };

  const expertMatches = {
    medicine: "Dr. Elena Rostova - MD, PhD (14 years editing, Lancet reviewer)",
    engineering: "Prof. Arthur Pendelton - PhD in EECS (11 years editing, IEEE Editor)",
    humanities: "Dr. Sarah Jenkins - PhD in Comparative Lit (18 years editing, Oxford Press author)",
    social: "Dr. Marcus Vance - PhD in Econometrics (9 years editing, Journal of Finance reviewer)"
  };

  if (fieldSelect) {
    fieldSelect.addEventListener("change", () => {
      const selectedField = fieldSelect.value;
      
      // Update interactive expertise tags
      if (tagsContainer && tagsData[selectedField]) {
        tagsContainer.innerHTML = "";
        tagsData[selectedField].forEach(tag => {
          const badge = document.createElement("span");
          badge.className = "tag-badge";
          badge.textContent = tag;
          badge.addEventListener("click", () => {
            badge.classList.toggle("selected");
          });
          tagsContainer.appendChild(badge);
        });
      }
    });

    // Trigger initial load
    fieldSelect.dispatchEvent(new Event("change"));
  }

  if (matchBtn) {
    matchBtn.addEventListener("click", () => {
      const selectedField = fieldSelect.value;
      if (!selectedField) return;

      if (matchResult) {
        matchResult.innerHTML = `<span class="text-muted"><i class="bi bi-hourglass-split spin-icon"></i> Scanning specialist registry...</span>`;
        if (pingElement) {
          pingElement.style.animation = "ping-wave 0.5s infinite ease-out";
        }

        setTimeout(() => {
          if (pingElement) {
            pingElement.style.animation = "ping-wave 2s infinite ease-out";
          }
          matchResult.innerHTML = `
            <div class="p-3 border rounded bg-white dark-bg-custom text-start">
              <span class="d-block text-success fw-semibold mb-1"><i class="bi bi-patch-check-fill"></i> Perfect Editor Match Found!</span>
              <strong class="text-dark-custom" style="font-size: 0.95rem;">${expertMatches[selectedField]}</strong>
              <p class="text-muted small mt-2 mb-0">This specialist has edited 70+ papers in this exact discipline with a 100% acceptance rate.</p>
            </div>
          `;
        }, 1500);
      }
    });
  }

  // --- Dynamic Document Lines Interaction ---
  const heroLines = document.querySelector(".manuscript-lines");
  if (heroLines) {
    heroLines.addEventListener("mousemove", (e) => {
      const rect = heroLines.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      heroLines.style.transform = `translateY(-10px) rotate(1deg) scale(1.02) translate(${(x - rect.width/2)/20}px, ${(y - rect.height/2)/20}px)`;
    });

    heroLines.addEventListener("mouseleave", () => {
      heroLines.style.transform = "";
    });
  }

  // --- Premium Consultation Form File Upload Simulation ---
  const fileInput = document.getElementById("fileUpload");
  const uploadZone = document.getElementById("uploadZone");
  
  if (uploadZone && fileInput) {
    uploadZone.addEventListener("click", () => {
      fileInput.click();
    });

    fileInput.addEventListener("change", () => {
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const fileSizeKB = (file.size / 1024).toFixed(1);
        uploadZone.innerHTML = `
          <i class="bi bi-file-earmark-check-fill text-success" style="font-size: 2rem;"></i>
          <p class="mt-2 mb-1 text-success fw-semibold">File Attached Successfully</p>
          <span class="text-muted small d-block">${file.name} (${fileSizeKB} KB)</span>
        `;
      }
    });

    // Drag and drop event listeners
    ["dragenter", "dragover"].forEach(eventName => {
      uploadZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = "var(--accent-blue)";
        uploadZone.style.backgroundColor = "rgba(37, 99, 235, 0.05)";
      }, false);
    });

    ["dragleave", "drop"].forEach(eventName => {
      uploadZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = "var(--border-color)";
        uploadZone.style.backgroundColor = "var(--secondary-bg)";
      }, false);
    });

    uploadZone.addEventListener("drop", (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length > 0) {
        fileInput.files = files;
        fileInput.dispatchEvent(new Event("change"));
      }
    });
  }

  // --- Premium Page Transition Animations ---
  const links = document.querySelectorAll("a");
  links.forEach(link => {
    // Intercept same-origin local HTML pages only
    if (
      link.href &&
      link.href.includes(window.location.origin) &&
      link.href.endsWith(".html") &&
      !link.getAttribute("target")
    ) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const destination = link.href;

        if (loader) {
          loader.style.opacity = "1";
          loader.style.visibility = "visible";
        }

        setTimeout(() => {
          window.location.href = destination;
        }, 300);
      });
    }
  });

  // --- Home 2: Before/After Comparative Panel ---
  const compTabs = document.querySelectorAll(".comparison-tab");
  const compContentBox = document.getElementById("comparisonContent");
  const comparisons = {
    before: `The researcher conducted <span class="text-danger fw-semibold">an investigation into</span> the chemical elements <span class="text-danger fw-semibold">which was</span> very complex, <span class="text-danger fw-semibold">and also</span> they didn't write down details of their methodology <span class="text-danger fw-semibold">which makes it hard to repeat</span>.`,
    after: `The researchers investigated the chemical components, which required complex analysis. Additionally, they omitted methodology details, preventing study replication.`
  };

  if (compContentBox) {
    compTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        compTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        
        const type = tab.getAttribute("data-type");
        compContentBox.innerHTML = comparisons[type];
      });
    });
  }

  // --- Home 2: Live Proofreading Simulator ---
  const clickableErrors = document.querySelectorAll(".clickable-error");
  const resolvedCountDisplay = document.getElementById("resolvedCount");
  const totalErrorsDisplay = document.getElementById("totalErrors");
  const scoreProgress = document.getElementById("scoreProgress");
  const scoreText = document.getElementById("scoreText");

  let resolvedErrors = 0;
  const totalErrors = clickableErrors.length;
  const initialScore = 62;
  const maxScore = 98;

  // Initialize gauge dashoffset
  function updateScoreGauge(score) {
    if (scoreProgress) {
      const perimeter = 377; // 2 * pi * r = 2 * 3.14159 * 60
      const offset = perimeter - (score / 100) * perimeter;
      scoreProgress.style.strokeDashoffset = offset;
    }
    if (scoreText) {
      scoreText.textContent = `${score}%`;
    }
  }

  // Set initial state
  updateScoreGauge(initialScore);
  if (totalErrorsDisplay) totalErrorsDisplay.textContent = totalErrors;

  clickableErrors.forEach(err => {
    err.addEventListener("click", () => {
      if (err.classList.contains("resolved")) return;

      // Mark resolved
      err.classList.add("resolved");
      const correctedText = err.getAttribute("data-resolved");
      err.textContent = correctedText;
      
      // Increment count
      resolvedErrors++;
      if (resolvedCountDisplay) resolvedCountDisplay.textContent = resolvedErrors;

      // Animate score gauge
      const currentScore = initialScore + Math.round((resolvedErrors / totalErrors) * (maxScore - initialScore));
      updateScoreGauge(currentScore);
    });
  });

  // --- Home 2: Turnaround Price Calculator ---
  const calcOptions = document.querySelectorAll(".calc-option");
  const wordCountInput = document.getElementById("calcWordCount");
  const totalCostDisplay = document.getElementById("totalCost");

  if (wordCountInput && totalCostDisplay) {
    const rates = {
      "24h": 0.12,
      "3d": 0.08,
      "7d": 0.05
    };

    let activeService = "3d";

    calcOptions.forEach(opt => {
      opt.addEventListener("click", () => {
        calcOptions.forEach(o => o.classList.remove("active"));
        opt.classList.add("active");
        
        const radio = opt.querySelector(".calc-radio");
        if (radio) {
          radio.checked = true;
          activeService = radio.value;
          calculatePrice();
        }
      });
    });

    wordCountInput.addEventListener("input", calculatePrice);

    function calculatePrice() {
      const words = parseInt(wordCountInput.value) || 0;
      const rate = rates[activeService];
      const cost = Math.round(words * rate);

      // Animate counter for price
      const currentVal = parseInt(totalCostDisplay.textContent.replace(/[^\d]/g, "")) || 0;
      animatePrice(totalCostDisplay, currentVal, cost);
    }

    function animatePrice(element, start, end) {
      let current = start;
      const duration = 400; // ms animation
      const stepTime = 15;
      const increment = (end - start) / (duration / stepTime);

      const timer = setInterval(() => {
        current += increment;
        if ((increment >= 0 && current >= end) || (increment < 0 && current <= end)) {
          element.textContent = `$${end}`;
          clearInterval(timer);
        } else {
          element.textContent = `$${Math.round(current)}`;
        }
      }, stepTime);
    }
    
    // Trigger initial pricing calculation
    calculatePrice();
  }
});

