/* ==========================================================================
   PREMIUM PORTFOLIO INTERACTIVE LOGIC
   Description: Dynamic theme customizer, high-performance canvas particle 
                background, typing subtitle, scroll animations, project modal,
                and contact form validation.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    /* --------------------------------------------------------------------------
       1. GLOBAL DOM REFERENCES & STATE
       -------------------------------------------------------------------------- */
    const body = document.body;
    
    // Configurator DOM elements
    const configPanel = document.getElementById("configPanel");
    const configToggle = document.getElementById("configToggle");
    const darkModeBtn = document.getElementById("darkModeBtn");
    const lightModeBtn = document.getElementById("lightModeBtn");
    const accentDots = document.querySelectorAll(".accent-dot");
    const particlesBgBtn = document.getElementById("particlesBgBtn");
    const gradientBgBtn = document.getElementById("gradientBgBtn");
    const themeQuickToggle = document.getElementById("themeQuickToggle");
    const quickToggleIcon = document.getElementById("quickToggleIcon");

    // Nav Header DOM elements
    const navbarHeader = document.getElementById("navbarHeader");
    const navItems = document.querySelectorAll(".nav-item");
    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");

    // Dynamic Typing
    const typingElement = document.getElementById("typingElement");
    const rolesAttr = document.body.getAttribute("data-roles");
    const roles = rolesAttr ? JSON.parse(rolesAttr) : ["Web Developer", "Backend Developer", "Flutter Developer", "MCA Student"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    // Projects Grid Database for Modals
    const projectsAttr = document.body.getAttribute("data-projects");
    const projectsData = projectsAttr ? JSON.parse(projectsAttr) : {
        "1": {
            title: "Hostello — Online Hostel Management",
            tag: "Full-Stack / Web Application",
            image: "assets/project1.jpg",
            desc: "Hostello is an administrative management system developed to streamline hostel operations. It simplifies the processes of student registrations, room allocations, check-ins, and dynamic bookings.",
            highlights: [
                "Engineered scalable backend scripts using PHP and MySQL query processing.",
                "Integrated local JSON file configurations for storing and fetching static application preferences.",
                "Created responsive, user-friendly frontend dashboards utilizing HTML5, CSS3, and Bootstrap.",
                "Implemented dynamic validation checks, interactive alert popups, and status logs with vanilla JavaScript."
            ],
            demo: "#",
            code: "#"
        },
        "2": {
            title: "Real Bus — Ticket Booking System",
            tag: "Backend & UI Template Design",
            image: "assets/project2.jpg",
            desc: "Real Bus is an interactive platform built to handle public transit ticket booking operations. It supports passenger record registrations, seat selection schedules, and admin operations logs.",
            highlights: [
                "Developed secure database relations and transactional search queries using PHP and MySQL.",
                "Assisted in formatting template designs, grid structures, and UI themes using HTML5 and CSS.",
                "Optimized application queries to reduce response latencies during ticket booking simulations."
            ],
            demo: "#",
            code: "#"
        }
    };

    /* --------------------------------------------------------------------------
       2. LOCAL STORAGE INTEGRATION (PREFERENCES PERSISTENCE)
       -------------------------------------------------------------------------- */
    const initPreferences = () => {
        // Theme (Light/Dark)
        const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
        if (savedTheme === "light") {
            enableLightTheme();
        } else {
            enableDarkTheme();
        }

        // Accent Color
        const savedAccent = localStorage.getItem("portfolio-accent") || "cyberpunk";
        setAccentColor(savedAccent);

        // Background Type
        const savedBg = localStorage.getItem("portfolio-bg") || "particles";
        setBackgroundType(savedBg);
    };

    /* --------------------------------------------------------------------------
       3. THEME CUSTOMIZATION ENGINE
       -------------------------------------------------------------------------- */
    // Open/Close Settings Panel
    configToggle.addEventListener("click", () => {
        configPanel.classList.toggle("open");
    });

    // Close settings panel when clicking outside
    document.addEventListener("click", (e) => {
        if (!configPanel.contains(e.target) && configPanel.classList.contains("open")) {
            configPanel.classList.remove("open");
        }
    });

    const enableLightTheme = () => {
        body.classList.add("light-theme");
        darkModeBtn.classList.remove("active");
        lightModeBtn.classList.add("active");
        quickToggleIcon.className = "fa-solid fa-sun";
        localStorage.setItem("portfolio-theme", "light");
    };

    const enableDarkTheme = () => {
        body.classList.remove("light-theme");
        darkModeBtn.classList.add("active");
        lightModeBtn.classList.remove("active");
        quickToggleIcon.className = "fa-solid fa-moon";
        localStorage.setItem("portfolio-theme", "dark");
    };

    // Quick Theme Toggle
    themeQuickToggle.addEventListener("click", () => {
        if (body.classList.contains("light-theme")) {
            enableDarkTheme();
        } else {
            enableLightTheme();
        }
    });

    // Sidebar Theme Toggle Buttons
    darkModeBtn.addEventListener("click", enableDarkTheme);
    lightModeBtn.addEventListener("click", enableLightTheme);

    // Accent Color Selection
    const setAccentColor = (accent) => {
        body.setAttribute("data-accent", accent);
        accentDots.forEach(dot => {
            if (dot.getAttribute("data-accent") === accent) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
        localStorage.setItem("portfolio-accent", accent);
    };

    accentDots.forEach(dot => {
        dot.addEventListener("click", () => {
            const selectedAccent = dot.getAttribute("data-accent");
            setAccentColor(selectedAccent);
        });
    });

    // Background Type Switching
    const setBackgroundType = (bgType) => {
        body.setAttribute("data-bg-type", bgType);
        if (bgType === "particles") {
            particlesBgBtn.classList.add("active");
            gradientBgBtn.classList.remove("active");
        } else {
            particlesBgBtn.classList.remove("active");
            gradientBgBtn.classList.add("active");
        }
        localStorage.setItem("portfolio-bg", bgType);
    };

    particlesBgBtn.addEventListener("click", () => setBackgroundType("particles"));
    gradientBgBtn.addEventListener("click", () => setBackgroundType("gradient"));

    /* --------------------------------------------------------------------------
       4. HIGH-PERFORMANCE CANVAS PARTICLE BACKGROUND
       -------------------------------------------------------------------------- */
    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");
    
    let particlesArray = [];
    let numberOfParticles = 75;
    let mouse = {
        x: null,
        y: null,
        radius: 130
    };

    // Track cursor movement
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener("mouseout", () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Adapt canvas size
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Adjust particle count for smaller viewports
        if (window.innerWidth < 768) {
            numberOfParticles = 30;
            mouse.radius = 80;
        } else {
            numberOfParticles = 75;
            mouse.radius = 130;
        }
        
        initParticles();
    };

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
        }

        draw() {
            // Fetch dynamically computed accent color for seamless theme matching
            const accentColor = getComputedStyle(body).getPropertyValue('--accent').trim() || "#a855f7";
            ctx.fillStyle = accentColor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        update() {
            // Drift movement
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce on screen margins
            if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
            if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

            // Mouse interaction (Repulsion mechanic)
            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = mouse.radius;
                    let force = (maxDistance - distance) / maxDistance;
                    let directionX = forceDirectionX * force * this.density * 0.4;
                    let directionY = forceDirectionY * force * this.density * 0.4;
                    
                    this.x -= directionX;
                    this.y -= directionY;
                }
            }
        }
    }

    const initParticles = () => {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    };

    // Draw interconnecting links
    const connectParticles = () => {
        const accentColorRGB = getComputedStyle(body).getPropertyValue('--accent-rgb').trim() || "168, 85, 247";
        let opacityValue = 1;
        
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 115) {
                    opacityValue = 1 - (distance / 115);
                    ctx.strokeStyle = `rgba(${accentColorRGB}, ${opacityValue * 0.12})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    };

    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Render only if particle background is selected
        if (body.getAttribute("data-bg-type") === "particles") {
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            connectParticles();
        }
        
        requestAnimationFrame(animateParticles);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animateParticles();

    /* --------------------------------------------------------------------------
       5. HERO SECTION TYPING ANIMATION
       -------------------------------------------------------------------------- */
    const typeEffect = () => {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Erasing character
            charIndex--;
            typingSpeed = 50;
        } else {
            // Typing character
            charIndex++;
            typingSpeed = 120;
        }

        typingElement.textContent = currentRole.substring(0, charIndex);

        if (!isDeleting && charIndex === currentRole.length) {
            // Delay before starting deletion
            isDeleting = true;
            typingSpeed = 1500; 
        } else if (isDeleting && charIndex === 0) {
            // Switch to next text label
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 300; 
        }

        setTimeout(typeEffect, typingSpeed);
    };

    setTimeout(typeEffect, 1000);

    /* --------------------------------------------------------------------------
       6. SCROLL OBSERVERS & METRICS COUNTER ANIMATION
       -------------------------------------------------------------------------- */
    // Scroll header styling
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbarHeader.classList.add("scrolled");
        } else {
            navbarHeader.classList.remove("scrolled");
        }
    });

    // Scroll reveal triggers
    const revealElements = document.querySelectorAll(".scroll-reveal");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-active");
                
                // Specific: Skills column entry
                if (entry.target.id === "skills") {
                    fillProgressBars();
                }

                // Specific: About section numbers counter
                if (entry.target.id === "about") {
                    animateStats();
                }
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Stats counter count-up mechanic
    let statsAnimated = false;
    const animateStats = () => {
        if (statsAnimated) return;
        statsAnimated = true;
        
        const statNums = document.querySelectorAll(".stat-num");
        statNums.forEach(num => {
            const target = parseInt(num.getAttribute("data-val"));
            let current = 0;
            const duration = 1500; // 1.5s duration
            const increment = Math.ceil(target / (duration / 16)); // ~60fps
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    num.textContent = target + (num.parentElement.id === "statCardClients" ? "%" : "+");
                    clearInterval(counter);
                } else {
                    num.textContent = current + "+";
                }
            }, 16);
        });
    };

    // Skill Bar filling
    let skillsFilled = false;
    const fillProgressBars = () => {
        if (skillsFilled) return;
        skillsFilled = true;
        
        const fills = document.querySelectorAll(".progress-bar-fill");
        fills.forEach(fill => {
            const progress = fill.getAttribute("data-progress");
            fill.style.width = progress;
        });
    };

    // Active Navigation Highlight on Scroll
    const sections = document.querySelectorAll("section");
    const navHighlightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                
                navItems.forEach(item => {
                    if (item.getAttribute("href") === `#${id}`) {
                        item.classList.add("active");
                    } else {
                        item.classList.remove("active");
                    }
                });
            }
        });
    }, {
        rootMargin: "-45% 0px -45% 0px" // Triggers when section is centered
    });

    sections.forEach(sec => navHighlightObserver.observe(sec));

    /* --------------------------------------------------------------------------
       7. MOBILE BURGER DRAWER MENU
       -------------------------------------------------------------------------- */
    const toggleMobileMenu = () => {
        mobileToggle.classList.toggle("open");
        navMenu.classList.toggle("open");
        body.classList.toggle("no-scroll");
    };

    mobileToggle.addEventListener("click", toggleMobileMenu);

    // Close menu when navigation item is clicked (Mobile viewports)
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            if (navMenu.classList.contains("open")) {
                toggleMobileMenu();
            }
        });
    });

    /* --------------------------------------------------------------------------
       8. PROJECTS FILTERING & MODAL SYSTEM
       -------------------------------------------------------------------------- */
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    // Card Gallery Filtering
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Update button active state
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const category = btn.getAttribute("data-filter");
            
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");
                
                if (category === "all" || cardCategory === category) {
                    card.style.display = "block";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.95)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 300);
                }
            });
        });
    });

    // Reusable Modal elements
    const projectModal = document.getElementById("projectModal");
    const modalImg = document.getElementById("modalImg");
    const modalTag = document.getElementById("modalTag");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const modalHighlights = document.getElementById("modalHighlights");
    const modalDemoLink = document.getElementById("modalDemoLink");
    const modalCodeLink = document.getElementById("modalCodeLink");
    
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    const modalOverlay = document.getElementById("modalOverlay");

    // Open Modal
    projectCards.forEach(card => {
        card.addEventListener("click", () => {
            const projectId = card.getAttribute("data-project-id");
            const data = projectsData[projectId];
            
            if (!data) return;

            // Load data parameters dynamically
            modalImg.src = data.image;
            modalImg.alt = data.title;
            modalTag.textContent = data.tag;
            modalTitle.textContent = data.title;
            modalDesc.textContent = data.desc;
            
            // Build list highlights
            modalHighlights.innerHTML = "";
            data.highlights.forEach(hl => {
                const li = document.createElement("li");
                li.textContent = hl;
                modalHighlights.appendChild(li);
            });

            modalDemoLink.href = data.demo;
            modalCodeLink.href = data.code;

            // Trigger visual opening
            projectModal.classList.add("active");
            body.classList.add("no-scroll");
        });
    });

    // Close Modal helpers
    const closeModal = () => {
        projectModal.classList.remove("active");
        body.classList.remove("no-scroll");
    };

    modalCloseBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && projectModal.classList.contains("active")) {
            closeModal();
        }
    });

    /* --------------------------------------------------------------------------
       9. CONTACT FORM INTERACTIVE VALIDATION
       -------------------------------------------------------------------------- */
    const contactForm = document.getElementById("contactForm");
    const contactName = document.getElementById("contactName");
    const contactEmail = document.getElementById("contactEmail");
    const contactMessage = document.getElementById("contactMessage");
    
    const formSuccessOverlay = document.getElementById("formSuccessOverlay");
    const closeSuccessBtn = document.getElementById("closeSuccessBtn");

    // Helper functions for validating formats
    const validateEmailFormat = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const validateField = (input, condition, groupElement) => {
        if (condition) {
            groupElement.classList.remove("has-error");
            return true;
        } else {
            groupElement.classList.add("has-error");
            return false;
        }
    };

    // Live validation input event listeners
    contactName.addEventListener("input", () => {
        validateField(contactName, contactName.value.trim().length >= 2, contactName.parentElement);
    });

    contactEmail.addEventListener("input", () => {
        validateField(contactEmail, validateEmailFormat(contactEmail.value.trim()), contactEmail.parentElement);
    });

    contactMessage.addEventListener("input", () => {
        validateField(contactMessage, contactMessage.value.trim().length >= 10, contactMessage.parentElement);
    });

    // Submit handler with dynamic visual success state
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const isNameValid = validateField(contactName, contactName.value.trim().length >= 2, contactName.parentElement);
        const isEmailValid = validateField(contactEmail, validateEmailFormat(contactEmail.value.trim()), contactEmail.parentElement);
        const isMessageValid = validateField(contactMessage, contactMessage.value.trim().length >= 10, contactMessage.parentElement);

        if (isNameValid && isEmailValid && isMessageValid) {
            // Trigger visual success popup screen
            formSuccessOverlay.classList.add("active");
            contactForm.reset();
            
            // Remove floating labels classes (by resetting custom states)
            document.querySelectorAll(".form-group").forEach(group => {
                group.classList.remove("has-error");
            });
        }
    });

    closeSuccessBtn.addEventListener("click", () => {
        formSuccessOverlay.classList.remove("active");
    });

    /* --------------------------------------------------------------------------
       10. BACK-TO-TOP BUTTON VISIBILITY
       -------------------------------------------------------------------------- */
    const backToTopBtn = document.getElementById("backToTopBtn");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 600) {
            backToTopBtn.style.opacity = "1";
            backToTopBtn.style.pointerEvents = "all";
            backToTopBtn.style.transform = "scale(1)";
        } else {
            backToTopBtn.style.opacity = "0";
            backToTopBtn.style.pointerEvents = "none";
            backToTopBtn.style.transform = "scale(0.8)";
        }
    });

    // Set initial state
    backToTopBtn.style.opacity = "0";
    backToTopBtn.style.pointerEvents = "none";
    backToTopBtn.style.transform = "scale(0.8)";
    backToTopBtn.style.transition = "all var(--transition-fast)";

    /* --------------------------------------------------------------------------
       11. VISUAL PAGE BUILDER (EDIT MODE) SYSTEM
       -------------------------------------------------------------------------- */
    let isEditMode = false;
    
    const editLoginModal = document.getElementById("editLoginModal");
    const enableEditModeBtn = document.getElementById("enableEditModeBtn");
    const editLoginCloseBtn = document.getElementById("editLoginCloseBtn");
    const editLoginOverlay = document.getElementById("editLoginOverlay");
    const submitEditLoginBtn = document.getElementById("submitEditLoginBtn");
    const editUsernameInput = document.getElementById("editUsername");
    const editPasswordInput = document.getElementById("editPassword");
    const editLoginError = document.getElementById("editLoginError");

    // Open login modal
    if (enableEditModeBtn) {
        enableEditModeBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // prevent document click-outside handler from firing
            configPanel.classList.remove("open"); // close settings drawer immediately
            setTimeout(() => {
                editUsernameInput.value = "";
                editPasswordInput.value = "";
                editLoginError.style.display = "none";
                editLoginModal.classList.add("active");
            }, 50); // tiny delay so panel closes before modal opens
        });
    }

    // Close login modal
    const closeLoginModal = () => {
        editLoginModal.classList.remove("active");
    };

    if (editLoginCloseBtn) editLoginCloseBtn.addEventListener("click", closeLoginModal);
    if (editLoginOverlay) editLoginOverlay.addEventListener("click", closeLoginModal);

    // Validate static credentials
    const handleLoginSubmit = () => {
        const username = editUsernameInput.value.trim();
        const password = editPasswordInput.value.trim();

        if (username === "harsh" && password === "harsh") {
            closeLoginModal();
            startEditMode();
        } else {
            editLoginError.style.display = "block";
        }
    };

    if (submitEditLoginBtn) {
        submitEditLoginBtn.addEventListener("click", handleLoginSubmit);
    }
    [editUsernameInput, editPasswordInput].forEach(input => {
        if (input) {
            input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") handleLoginSubmit();
            });
        }
    });

    // Start Edit Mode
    const startEditMode = () => {
        isEditMode = true;
        body.classList.add("edit-mode-active");

        // Save current projectsData and roles back to body data attributes just in case
        document.body.setAttribute("data-roles", JSON.stringify(roles));
        document.body.setAttribute("data-projects", JSON.stringify(projectsData));

        // Inject global editor toolbar
        createEditorToolbar();

        // Make text content editable
        enableEditableElements();

        // Inject card-level and section-level commands (Move Up, Move Down, Delete, Hide)
        injectEditorControls();

        // Setup image & icon click listeners
        setupAssetListeners();

        // Prevent link navigation during editing
        document.addEventListener("click", preventLinkNavigation, true);
    };

    const preventLinkNavigation = (e) => {
        if (!isEditMode) return;
        const link = e.target.closest("a:not(.editor-toolbar-btn):not(.editor-control-btn):not(.btn-submit)");
        if (link) {
            e.preventDefault();
            e.stopPropagation();
            // Change link URL (href) visually
            const newHref = prompt("Change link URL (href):", link.getAttribute("href") || "#");
            if (newHref !== null) {
                link.setAttribute("href", newHref);
            }
        }
    };

    // Enable contenteditable for body texts
    const enableEditableElements = () => {
        // Target h1, h2, h3, h4, h5, p, span (excluding tags inside customizers or modal controls)
        const selectors = "h1, h2, h3, h4, h5, p, span:not(.logo-accent):not(.badge-dot):not(.bar), a.nav-item, a.logo-link, .project-tag, .timeline-date, .timeline-company, .code-line";
        document.querySelectorAll(selectors).forEach(el => {
            // Exclude anything inside configuration panel, login modal, or top toolbar
            if (el.closest(".config-panel") || el.closest("#editLoginModal") || el.closest(".editor-global-toolbar") || el.closest(".editor-controls-overlay")) return;
            el.setAttribute("contenteditable", "true");
        });
    };

    const disableEditableElements = () => {
        document.querySelectorAll("[contenteditable]").forEach(el => {
            el.removeAttribute("contenteditable");
        });
    };

    // Inject Floating Quick Action Buttons for sections and containers
    const injectEditorControls = () => {
        // 1. Inject section level controls (Move Up, Move Down, Hide, Delete)
        document.querySelectorAll("section").forEach(sec => {
            sec.classList.add("editor-container-parent");
            if (!sec.querySelector(":scope > .editor-controls-overlay")) {
                const overlay = createControlsOverlay(sec, true);
                sec.appendChild(overlay);
            }
        });

        // 2. Inject item level controls (timeline cards, project cards, skills columns, stats cards)
        const cardSelectors = ".timeline-item, .project-card, .skills-column, .stat-card";
        document.querySelectorAll(cardSelectors).forEach(card => {
            card.classList.add("editor-container-parent");
            if (!card.querySelector(":scope > .editor-controls-overlay")) {
                const overlay = createControlsOverlay(card, false);
                card.appendChild(overlay);
            }
        });
    };

    const removeEditorControls = () => {
        document.querySelectorAll(".editor-controls-overlay").forEach(overlay => overlay.remove());
        document.querySelectorAll(".editor-container-parent").forEach(el => el.classList.remove("editor-container-parent"));
    };

    // Create the floating controls UI overlay
    const createControlsOverlay = (element, isSection) => {
        const overlay = document.createElement("div");
        overlay.className = "editor-controls-overlay";
        
        // Hide/Show Toggle button
        const hideBtn = document.createElement("button");
        hideBtn.className = "editor-control-btn";
        const isHidden = element.classList.contains("editor-element-hidden") || element.getAttribute("data-hidden") === "true";
        hideBtn.innerHTML = isHidden ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
        hideBtn.title = isHidden ? "Unhide Element" : "Hide Element";
        hideBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            element.classList.toggle("editor-element-hidden");
            const currentlyHidden = element.classList.contains("editor-element-hidden");
            element.setAttribute("data-hidden", currentlyHidden ? "true" : "false");
            hideBtn.innerHTML = currentlyHidden ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
            hideBtn.title = currentlyHidden ? "Unhide Element" : "Hide Element";
        });

        // Move Up button
        const upBtn = document.createElement("button");
        upBtn.className = "editor-control-btn";
        upBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
        upBtn.title = "Move Up";
        upBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const prev = element.previousElementSibling;
            if (prev && !prev.classList.contains("editor-global-toolbar") && !prev.classList.contains("config-panel") && prev.id !== "bg-canvas") {
                element.parentNode.insertBefore(element, prev);
            }
        });

        // Move Down button
        const downBtn = document.createElement("button");
        downBtn.className = "editor-control-btn";
        downBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
        downBtn.title = "Move Down";
        downBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const next = element.nextElementSibling;
            if (next) {
                element.parentNode.insertBefore(next, element);
            }
        });

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "editor-control-btn editor-control-btn-delete";
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteBtn.title = "Delete Element";
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (confirm("Are you sure you want to delete this element? This cannot be undone until reload.")) {
                element.remove();
            }
        });

        overlay.appendChild(hideBtn);
        overlay.appendChild(upBtn);
        overlay.appendChild(downBtn);
        overlay.appendChild(deleteBtn);

        return overlay;
    };

    // Global editing toolbar setup
    const createEditorToolbar = () => {
        if (document.querySelector(".editor-global-toolbar")) return;

        const toolbar = document.createElement("div");
        toolbar.className = "editor-global-toolbar";

        toolbar.innerHTML = `
            <div class="editor-toolbar-logo">
                <span class="logo-accent">&lt;</span>Harsh.Dev<span class="logo-accent"> Builder /&gt;</span>
            </div>
            <div class="editor-toolbar-actions">
                <button class="editor-toolbar-btn" id="editorBtnAddSection">
                    <i class="fa-solid fa-plus-circle"></i> Add Container
                </button>
                <button class="editor-toolbar-btn" id="editorBtnEditRoles">
                    <i class="fa-solid fa-code"></i> Edit Typing Roles
                </button>
                <button class="editor-toolbar-btn editor-toolbar-btn-save" id="editorBtnSave">
                    <i class="fa-solid fa-floppy-disk"></i> Save Portfolio
                </button>
                <button class="editor-toolbar-btn editor-toolbar-btn-exit" id="editorBtnExit">
                    <i class="fa-solid fa-right-from-bracket"></i> Exit Editor
                </button>
            </div>
        `;

        document.body.prepend(toolbar);

        // Bind toolbar events
        document.getElementById("editorBtnAddSection").addEventListener("click", showAddSectionDialog);
        document.getElementById("editorBtnEditRoles").addEventListener("click", showEditRolesDialog);
        document.getElementById("editorBtnSave").addEventListener("click", savePortfolioHTML);
        document.getElementById("editorBtnExit").addEventListener("click", exitEditMode);
    };

    const removeEditorToolbar = () => {
        const toolbar = document.querySelector(".editor-global-toolbar");
        if (toolbar) toolbar.remove();
    };

    // Dynamic modal logic to add pre-designed layout sections
    const showAddSectionDialog = () => {
        const modalHtml = `
            <div class="project-modal" id="addSectionModal" style="display: flex;">
                <div class="modal-overlay" id="addSectionOverlay"></div>
                <div class="modal-wrapper glass" style="max-width: 500px; padding: 40px; border-radius: 20px; z-index: 1000001;">
                    <button class="modal-close" id="addSectionCloseBtn" aria-label="Close modal">
                        <i class="fa-solid fa-times"></i>
                    </button>
                    <div style="text-align: center; margin-bottom: 25px;">
                        <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800;">Add New Container Section</h3>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 5px;">Select a layout template to insert</p>
                    </div>
                    <div class="editor-modal-form-group">
                        <label for="sectionLayoutSelect">Select Layout Structure</label>
                        <select id="sectionLayoutSelect" class="editor-modal-select">
                            <option value="blank">Blank Container Section</option>
                            <option value="featured">Featured Section (Headline + Text)</option>
                            <option value="grid2">2-Column Layout Grid</option>
                            <option value="grid3">3-Column Layout Grid</option>
                        </select>
                    </div>
                    <div class="editor-modal-form-group">
                        <label for="sectionHeadlineInput">Section Headline Title</label>
                        <input type="text" id="sectionHeadlineInput" class="form-input" style="position:static; width: 100%; border: 1px solid var(--glass-border); background: var(--input-bg); border-radius: 12px; padding: 14px 20px; color: var(--text-primary);" value="New Customized Section" placeholder="My New Heading">
                    </div>
                    <button class="btn btn-primary" id="addSectionConfirmBtn" style="width: 100%; margin-top: 15px;">
                        Insert Container <i class="fa-solid fa-circle-plus"></i>
                    </button>
                </div>
            </div>
        `;

        const div = document.createElement("div");
        div.innerHTML = modalHtml;
        const modalElement = div.firstElementChild;
        document.body.appendChild(modalElement);

        const closeBtn = modalElement.querySelector("#addSectionCloseBtn");
        const overlay = modalElement.querySelector("#addSectionOverlay");
        const confirmBtn = modalElement.querySelector("#addSectionConfirmBtn");

        const destroyModal = () => modalElement.remove();

        closeBtn.addEventListener("click", destroyModal);
        overlay.addEventListener("click", destroyModal);

        confirmBtn.addEventListener("click", () => {
            const layout = modalElement.querySelector("#sectionLayoutSelect").value;
            const headline = modalElement.querySelector("#sectionHeadlineInput").value || "Custom Section";
            
            insertLayoutSection(layout, headline);
            destroyModal();
        });
    };

    const insertLayoutSection = (layout, headline) => {
        const main = document.querySelector("main");
        if (!main) return;

        const sectionId = "custom-section-" + Date.now();
        const section = document.createElement("section");
        section.id = sectionId;
        section.className = "scroll-reveal reveal-active editor-container-parent";
        
        let contentHtml = "";

        if (layout === "blank") {
            contentHtml = `
                <div class="section-container" style="padding: 60px 24px;">
                    <div class="section-header">
                        <h2 class="title" contenteditable="true">${headline}</h2>
                        <div class="section-divider"></div>
                    </div>
                    <div style="min-height: 100px; text-align: center; border: 1px dashed rgba(255,255,255,0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center;" contenteditable="true">
                        <p>Write your blank customized content here...</p>
                    </div>
                </div>
            `;
        } else if (layout === "featured") {
            contentHtml = `
                <div class="section-container">
                    <div class="section-header">
                        <span class="subtitle" contenteditable="true">FEATURED SUMMARY</span>
                        <h2 class="title" contenteditable="true">${headline}</h2>
                        <div class="section-divider"></div>
                    </div>
                    <div style="max-width: 800px; margin: 0 auto; text-align: center;">
                        <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; margin-bottom: 20px;" contenteditable="true">
                            Add a prominent subtitle right here.
                        </h3>
                        <p style="color: var(--text-secondary); line-height: 1.8;" contenteditable="true">
                            This layout features a centered headline and description layout ideal for showcasing milestones, key goals, certifications, or custom declarations.
                        </p>
                    </div>
                </div>
            `;
        } else if (layout === "grid2") {
            contentHtml = `
                <div class="section-container">
                    <div class="section-header">
                        <span class="subtitle" contenteditable="true">02 COLUMNS GRID</span>
                        <h2 class="title" contenteditable="true">${headline}</h2>
                        <div class="section-divider"></div>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 40px;">
                        <div class="glass" style="padding: 30px; border-radius: 16px;">
                            <h3 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; margin-bottom: 15px;" contenteditable="true">Column Left</h3>
                            <p style="color: var(--text-secondary);" contenteditable="true">Custom grid block context details. Edit any textual strings directly in the layout.</p>
                        </div>
                        <div class="glass" style="padding: 30px; border-radius: 16px;">
                            <h3 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; margin-bottom: 15px;" contenteditable="true">Column Right</h3>
                            <p style="color: var(--text-secondary);" contenteditable="true">Custom grid block context details. Edit any textual strings directly in the layout.</p>
                        </div>
                    </div>
                </div>
            `;
        } else if (layout === "grid3") {
            contentHtml = `
                <div class="section-container">
                    <div class="section-header">
                        <span class="subtitle" contenteditable="true">03 COLUMNS GRID</span>
                        <h2 class="title" contenteditable="true">${headline}</h2>
                        <div class="section-divider"></div>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 40px;">
                        <div class="glass" style="padding: 25px; border-radius: 16px;">
                            <h3 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; margin-bottom: 15px;" contenteditable="true">Column 1</h3>
                            <p style="color: var(--text-secondary); font-size: 0.9rem;" contenteditable="true">Edit custom grid details.</p>
                        </div>
                        <div class="glass" style="padding: 25px; border-radius: 16px;">
                            <h3 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; margin-bottom: 15px;" contenteditable="true">Column 2</h3>
                            <p style="color: var(--text-secondary); font-size: 0.9rem;" contenteditable="true">Edit custom grid details.</p>
                        </div>
                        <div class="glass" style="padding: 25px; border-radius: 16px;">
                            <h3 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; margin-bottom: 15px;" contenteditable="true">Column 3</h3>
                            <p style="color: var(--text-secondary); font-size: 0.9rem;" contenteditable="true">Edit custom grid details.</p>
                        </div>
                    </div>
                </div>
            `;
        }

        section.innerHTML = contentHtml;
        
        // Add overlay controls
        const overlay = createControlsOverlay(section, true);
        section.appendChild(overlay);

        // Make new tags editable
        section.querySelectorAll("h1, h2, h3, h4, h5, p, span, div[contenteditable]").forEach(el => {
            el.setAttribute("contenteditable", "true");
        });

        // Append to main before footer or contact section
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            main.insertBefore(section, contactSection);
        } else {
            main.appendChild(section);
        }

        // Trigger reveal reflow
        if (revealObserver) revealObserver.observe(section);
    };

    // Role editing dialog
    const showEditRolesDialog = () => {
        const currentRoles = JSON.parse(document.body.getAttribute("data-roles") || JSON.stringify(roles));
        const rolesString = currentRoles.join(", ");

        const newRolesString = prompt("Edit rotating roles (comma separated values):", rolesString);
        if (newRolesString !== null) {
            const newRoles = newRolesString.split(",").map(r => r.trim()).filter(r => r.length > 0);
            if (newRoles.length > 0) {
                document.body.setAttribute("data-roles", JSON.stringify(newRoles));
                alert("Roles updated successfully! Exit Edit Mode or save/reload the page to see changes.");
            }
        }
    };

    // Edit prompt dialogs for changing images and icons
    const setupAssetListeners = () => {
        // Image update listener
        document.querySelectorAll("img").forEach(img => {
            img.addEventListener("click", handleImageClick);
        });

        // Icon class update listener
        document.querySelectorAll("i:not(.editor-btn i):not(.editor-control-btn i)").forEach(icon => {
            icon.addEventListener("click", handleIconClick);
        });
    };

    const removeAssetListeners = () => {
        document.querySelectorAll("img").forEach(img => {
            img.removeEventListener("click", handleImageClick);
        });
        document.querySelectorAll("i").forEach(icon => {
            icon.removeEventListener("click", handleIconClick);
        });
    };

    const handleImageClick = (e) => {
        if (!isEditMode) return;
        e.stopPropagation();
        const img = e.target;
        const currentSrc = img.getAttribute("src") || "";
        
        const newSrc = prompt("Enter new Image Path / URL:", currentSrc);
        if (newSrc !== null && newSrc.trim() !== "") {
            img.setAttribute("src", newSrc.trim());
        }
    };

    const handleIconClick = (e) => {
        if (!isEditMode) return;
        e.stopPropagation();
        const icon = e.target;
        const currentClass = icon.className || "";

        const newClass = prompt("Enter new FontAwesome classes (e.g., 'fa-solid fa-laptop-code'):", currentClass);
        if (newClass !== null && newClass.trim() !== "") {
            icon.className = newClass.trim();
        }
    };

    // Exit Edit Mode and revert editor classes
    const exitEditMode = () => {
        if (!isEditMode) return;
        if (confirm("Are you sure you want to exit Edit Mode? Any unsaved edits will remain visible until page refresh, but builder controls will hide.")) {
            isEditMode = false;
            body.classList.remove("edit-mode-active");

            // Strip editor UI components
            removeEditorToolbar();
            disableEditableElements();
            removeEditorControls();
            removeAssetListeners();

            document.removeEventListener("click", preventLinkNavigation, true);
        }
    };

    // Serialize DOM, remove editor classes/wrappers, and prompt download of updated index.html
    const savePortfolioHTML = () => {
        // Clone document to strip builder tools cleanly
        const cloneDoc = document.cloneNode(true);
        const cloneBody = cloneDoc.body;

        // 1. Remove editor elements
        const toolbar = cloneBody.querySelector(".editor-global-toolbar");
        if (toolbar) toolbar.remove();

        const loginModal = cloneBody.querySelector("#editLoginModal");
        if (loginModal) loginModal.remove();

        cloneBody.querySelectorAll(".editor-controls-overlay").forEach(c => c.remove());

        // 2. Remove all editor classes and contenteditable states
        cloneBody.classList.remove("edit-mode-active");
        cloneBody.querySelectorAll("[contenteditable]").forEach(el => {
            el.removeAttribute("contenteditable");
        });
        cloneBody.querySelectorAll(".editor-container-parent").forEach(el => {
            el.classList.remove("editor-container-parent");
        });

        // 3. For elements marked hidden in editor, ensure we save styling `display: none;`
        cloneBody.querySelectorAll(".editor-element-hidden").forEach(el => {
            el.style.display = "none";
        });

        // Serialize back to HTML string
        const doctypeString = "<!DOCTYPE html>\n";
        const completeHTML = doctypeString + cloneDoc.documentElement.outerHTML;

        // Trigger file download
        const blob = new Blob([completeHTML], { type: "text/html" });
        const downloadUrl = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.download = "index.html";
        
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadUrl);

        alert("Save complete! The modified 'index.html' file has been downloaded. Copy it into your project folder to replace the original index.html.");
    };

    // Run preferences startup
    initPreferences();
});
