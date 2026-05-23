/* ==========================================================================
   PORTFOLIO CONFIGURATION DATA
   This block holds the editable content of the site. It is updated and saved.
   ========================================================================== */
const PORTFOLIO_DATA = {
    heroTitle: "Hi, I'm <span class=\"accent-text gradient-text\">Harsh Patel</span>",
    heroBadge: "<span class=\"badge-dot\"></span> Available for Web & Mobile Development",
    heroDesc: "Developing secure backend systems and cross-platform mobile solutions. Seamlessly bridging structured databases with interactive, user-focused architectures.",
    aboutTitle: "Fusing backend engineering with responsive web & mobile design.",
    aboutDesc1: "I am a dedicated Master of Computer Application (MCA) student with a solid foundation in web application and mobile development. I specialize in leveraging technologies like PHP, ASP.NET, and Flutter to build secure, robust backend systems and intuitive cross-platform user interfaces.",
    aboutDesc2: "With hands-on experience in database management (MySQL), backend scripting, and UI/UX prototyping (Figma), I strive to create highly efficient, scalable solutions that solve real-world problems and deliver seamless user experiences.",
    contactTitle: "Have a project in mind, or just want to chat?",
    contactDesc: "Feel free to reach out. I am always open to discussing new digital creations, responsive products, code performance, or standard design processes.",
    roles: [
        "Web Developer",
        "Backend Developer",
        "Flutter Developer",
        "MCA Student"
    ],
    projects: {
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
        },
        "3": {
            title: "Flutter Mobile Application",
            tag: "Mobile / Cross-Platform",
            image: "assets/project3.jpg",
            desc: "A cross-platform mobile application built with Flutter and Dart. Delivers a seamless native experience on both Android and iOS with a beautiful, responsive UI and smooth animations powered by Flutter's widget system.",
            highlights: [
                "Built fully cross-platform app targeting Android and iOS from a single Dart codebase.",
                "Integrated Firebase for real-time database, authentication, and cloud storage services.",
                "Designed intuitive Material UI components with smooth page transitions and micro-animations.",
                "Implemented state management and responsive layout adapting to multiple screen sizes."
            ],
            demo: "#",
            code: "#"
        }
    }
};

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
    const roles = rolesAttr ? JSON.parse(rolesAttr) : PORTFOLIO_DATA.roles;
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    // Projects Grid Database for Modals
    const projectsAttr = document.body.getAttribute("data-projects");
    const projectsData = projectsAttr ? JSON.parse(projectsAttr) : PORTFOLIO_DATA.projects;

    /* --------------------------------------------------------------------------
       DYNAMIC CONTENT INITIALIZATION
       -------------------------------------------------------------------------- */
    const initContentFromData = () => {
        Object.keys(PORTFOLIO_DATA).forEach(key => {
            if (key === 'roles' || key === 'projects') return;
            const elements = document.querySelectorAll(`[data-field="${key}"]`);
            elements.forEach(el => {
                el.innerHTML = PORTFOLIO_DATA[key];
            });
        });
    };
    initContentFromData();

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

        createEditorToolbar();
        enableEditableElements();
        injectEditorControls();
        injectAddProjectCard();

        // Inject visible "+" add-bar inside every content container
        injectSectionAddBars();

        setupAssetListeners();
        document.addEventListener("click", preventLinkNavigation, true);
    };

    const preventLinkNavigation = (e) => {
        if (!isEditMode) return;
        const link = e.target.closest("a:not(.editor-toolbar-btn):not(.editor-control-btn):not(.btn-submit)");
        if (link) {
            e.preventDefault();
            e.stopPropagation();
            showPrompt("Change link URL (href):", link.getAttribute("href") || "#", (newHref) => {
                if (newHref !== null && newHref.trim() !== "") {
                    link.setAttribute("href", newHref.trim());
                }
            });
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

    /* --------------------------------------------------------------------------
       CUSTOM DIALOG HELPERS (replaces native prompt/confirm/alert for Firebase)
       -------------------------------------------------------------------------- */
    const showConfirm = (message, onYes) => {
        const el = document.createElement("div");
        el.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.65);backdrop-filter:blur(8px);";
        el.innerHTML = `
            <div style="background:rgba(18,20,34,0.98);border:1px solid rgba(var(--accent-rgb),0.3);border-radius:20px;padding:36px;max-width:380px;width:90%;box-shadow:0 25px 60px rgba(0,0,0,0.6);text-align:center;">
                <div style="width:52px;height:52px;background:rgba(239,68,68,0.15);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
                    <i class="fa-solid fa-triangle-exclamation" style="color:#f87171;font-size:1.3rem;"></i>
                </div>
                <p style="font-family:var(--font-heading);font-size:1rem;font-weight:600;color:var(--text-primary);line-height:1.6;margin-bottom:24px;">${message}</p>
                <div style="display:flex;gap:12px;justify-content:center;">
                    <button id="_cdNo" style="padding:10px 24px;border-radius:10px;border:1px solid var(--glass-border);background:transparent;color:var(--text-secondary);font-family:var(--font-heading);font-size:0.9rem;font-weight:600;cursor:pointer;">Cancel</button>
                    <button id="_cdYes" style="padding:10px 24px;border-radius:10px;border:none;background:#ef4444;color:#fff;font-family:var(--font-heading);font-size:0.9rem;font-weight:700;cursor:pointer;">Delete</button>
                </div>
            </div>`;
        document.body.appendChild(el);
        el.querySelector("#_cdNo").onclick  = () => el.remove();
        el.querySelector("#_cdYes").onclick = () => { el.remove(); onYes(); };
    };

    const showPrompt = (message, defaultVal, onOk) => {
        const el = document.createElement("div");
        el.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.65);backdrop-filter:blur(8px);";
        el.innerHTML = `
            <div style="background:rgba(18,20,34,0.98);border:1px solid rgba(var(--accent-rgb),0.3);border-radius:20px;padding:36px;max-width:420px;width:90%;box-shadow:0 25px 60px rgba(0,0,0,0.6);">
                <p style="font-family:var(--font-heading);font-size:1rem;font-weight:600;color:var(--text-primary);margin-bottom:14px;">${message}</p>
                <input id="_promptInput" type="text" value="${defaultVal.replace(/"/g,'&quot;')}" style="width:100%;box-sizing:border-box;padding:12px 16px;border-radius:12px;border:1px solid var(--glass-border);background:rgba(255,255,255,0.05);color:var(--text-primary);font-family:var(--font-body);font-size:0.95rem;outline:none;margin-bottom:18px;">
                <div style="display:flex;gap:12px;justify-content:flex-end;">
                    <button id="_promptCancel" style="padding:10px 22px;border-radius:10px;border:1px solid var(--glass-border);background:transparent;color:var(--text-secondary);font-family:var(--font-heading);font-size:0.9rem;font-weight:600;cursor:pointer;">Cancel</button>
                    <button id="_promptOk" style="padding:10px 22px;border-radius:10px;border:none;background:var(--gradient-accent);color:#fff;font-family:var(--font-heading);font-size:0.9rem;font-weight:700;cursor:pointer;">OK</button>
                </div>
            </div>`;
        document.body.appendChild(el);
        const inp = el.querySelector("#_promptInput");
        inp.focus(); inp.select();
        el.querySelector("#_promptCancel").onclick = () => el.remove();
        el.querySelector("#_promptOk").onclick = () => { el.remove(); onOk(inp.value); };
        inp.addEventListener("keydown", (e) => { if (e.key === "Enter") { el.remove(); onOk(inp.value); } });
    };

    const showAlert = (message) => {
        const el = document.createElement("div");
        el.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.65);backdrop-filter:blur(8px);";
        el.innerHTML = `
            <div style="background:rgba(18,20,34,0.98);border:1px solid rgba(var(--accent-rgb),0.3);border-radius:20px;padding:36px;max-width:380px;width:90%;box-shadow:0 25px 60px rgba(0,0,0,0.6);text-align:center;">
                <div style="width:52px;height:52px;background:rgba(var(--accent-rgb),0.12);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
                    <i class="fa-solid fa-circle-check" style="color:var(--accent);font-size:1.3rem;"></i>
                </div>
                <p style="font-family:var(--font-heading);font-size:1rem;font-weight:600;color:var(--text-primary);line-height:1.6;margin-bottom:24px;">${message}</p>
                <button id="_alertOk" style="padding:10px 28px;border-radius:10px;border:none;background:var(--gradient-accent);color:#fff;font-family:var(--font-heading);font-size:0.9rem;font-weight:700;cursor:pointer;">OK</button>
            </div>`;
        document.body.appendChild(el);
        el.querySelector("#_alertOk").onclick = () => el.remove();
    };

    // Create the floating controls UI overlay
    const createControlsOverlay = (element, isSection) => {
        const overlay = document.createElement("div");
        overlay.className = "editor-controls-overlay";

        // ── "Add Item" button (only for sections) ──────────────────────────
        if (isSection) {
            const addBtn = document.createElement("button");
            addBtn.className = "editor-control-btn editor-control-btn-add";
            addBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
            addBtn.title = "Add New Item";
            addBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                addItemToSection(element);
            });
            overlay.appendChild(addBtn);
        }

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
            showConfirm("Are you sure you want to delete this element?<br>This cannot be undone until reload.", () => {
                element.remove();
            });
        });

        overlay.appendChild(hideBtn);
        overlay.appendChild(upBtn);
        overlay.appendChild(downBtn);
        overlay.appendChild(deleteBtn);

        return overlay;
    };

    /* --------------------------------------------------------------------------
       CONTEXT-AWARE ADD ITEM — detects section type and shows appropriate form
       -------------------------------------------------------------------------- */
    const addItemToSection = (section) => {
        const id = section.id || "";
        const cls = section.className || "";

        if (id === "experience" || cls.includes("experience")) {
            showAddTimelineItemDialog(section);
        } else if (id === "skills" || cls.includes("skills")) {
            showAddSkillColumnDialog(section);
        } else if (id === "about" || cls.includes("about")) {
            showAddStatCardDialog(section);
        } else if (id === "projects" || cls.includes("projects")) {
            showAddProjectDialog();
        } else {
            showAddSectionDialog();
        }
    };

    /* ── Add Timeline Item ─────────────────────────────────────────────────── */
    const showAddTimelineItemDialog = (section) => {
        const panel = document.createElement("div");
        panel.className = "project-modal active";
        panel.innerHTML = `
            <div class="modal-overlay" id="atOverlay"></div>
            <div class="modal-wrapper glass" style="max-width:480px;padding:36px;border-radius:24px;overflow:auto;">
                <button class="modal-close" id="atClose"><i class="fa-solid fa-times"></i></button>
                <div style="text-align:center;margin-bottom:22px;">
                    <div style="width:48px;height:48px;background:var(--gradient-accent);border-radius:12px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:10px;"><i class="fa-solid fa-graduation-cap" style="color:#fff;font-size:1.2rem;"></i></div>
                    <h3 style="font-family:var(--font-heading);font-size:1.3rem;font-weight:800;">Add Timeline Item</h3>
                </div>
                <div style="display:flex;flex-direction:column;gap:12px;">
                    <div><label style="font-size:0.75rem;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:5px;text-transform:uppercase;">Date / Period</label>
                        <input id="at-date" type="text" placeholder="Jul 2021 - Apr 2024" style="width:100%;box-sizing:border-box;padding:11px 14px;border-radius:11px;border:1px solid var(--glass-border);background:rgba(255,255,255,0.05);color:var(--text-primary);font-family:var(--font-body);font-size:0.92rem;outline:none;"></div>
                    <div><label style="font-size:0.75rem;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:5px;text-transform:uppercase;">Degree / Title</label>
                        <input id="at-title" type="text" placeholder="Bachelor of Computer Application" style="width:100%;box-sizing:border-box;padding:11px 14px;border-radius:11px;border:1px solid var(--glass-border);background:rgba(255,255,255,0.05);color:var(--text-primary);font-family:var(--font-body);font-size:0.92rem;outline:none;"></div>
                    <div><label style="font-size:0.75rem;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:5px;text-transform:uppercase;">Institution</label>
                        <input id="at-inst" type="text" placeholder="University Name" style="width:100%;box-sizing:border-box;padding:11px 14px;border-radius:11px;border:1px solid var(--glass-border);background:rgba(255,255,255,0.05);color:var(--text-primary);font-family:var(--font-body);font-size:0.92rem;outline:none;"></div>
                    <div><label style="font-size:0.75rem;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:5px;text-transform:uppercase;">Description</label>
                        <textarea id="at-desc" rows="3" placeholder="Describe your studies..." style="width:100%;box-sizing:border-box;padding:11px 14px;border-radius:11px;border:1px solid var(--glass-border);background:rgba(255,255,255,0.05);color:var(--text-primary);font-family:var(--font-body);font-size:0.92rem;outline:none;resize:none;"></textarea></div>
                    <div><label style="font-size:0.75rem;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:5px;text-transform:uppercase;">Side (Layout)</label>
                        <select id="at-side" style="width:100%;box-sizing:border-box;padding:11px 14px;border-radius:11px;border:1px solid var(--glass-border);background:rgba(18,20,34,0.9);color:var(--text-primary);font-family:var(--font-body);font-size:0.92rem;outline:none;cursor:pointer;">
                            <option value="left">Left Side</option>
                            <option value="right">Right Side</option>
                        </select></div>
                    <button id="at-confirm" style="width:100%;padding:13px;border-radius:12px;background:var(--gradient-accent);color:#fff;font-family:var(--font-heading);font-size:0.95rem;font-weight:700;border:none;cursor:pointer;margin-top:4px;">
                        <i class="fa-solid fa-circle-plus"></i> Add Timeline Item
                    </button>
                </div>
            </div>`;
        document.body.appendChild(panel);
        const destroy = () => panel.remove();
        panel.querySelector("#atClose").onclick = destroy;
        panel.querySelector("#atOverlay").onclick = destroy;
        panel.querySelector("#at-confirm").onclick = () => {
            const date  = panel.querySelector("#at-date").value.trim()  || "Date";
            const title = panel.querySelector("#at-title").value.trim() || "Title";
            const inst  = panel.querySelector("#at-inst").value.trim()  || "Institution";
            const desc  = panel.querySelector("#at-desc").value.trim()  || "Description";
            const side  = panel.querySelector("#at-side").value;

            const timeline = section.querySelector(".timeline");
            if (!timeline) return;

            const item = document.createElement("div");
            item.className = `timeline-item ${side} editor-container-parent`;
            item.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-card glass">
                    <span class="timeline-date" contenteditable="true">${date}</span>
                    <h3 contenteditable="true">${title}</h3>
                    <h4 class="timeline-company" contenteditable="true">${inst}</h4>
                    <p contenteditable="true">${desc}</p>
                </div>`;
            const ctrlOverlay = createControlsOverlay(item, false);
            item.appendChild(ctrlOverlay);
            timeline.appendChild(item);
            destroy();
        };
    };

    /* ── Add Skill Column ──────────────────────────────────────────────────── */
    const showAddSkillColumnDialog = (section) => {
        const panel = document.createElement("div");
        panel.className = "project-modal active";
        panel.innerHTML = `
            <div class="modal-overlay" id="asOverlay"></div>
            <div class="modal-wrapper glass" style="max-width:440px;padding:36px;border-radius:24px;overflow:auto;">
                <button class="modal-close" id="asClose"><i class="fa-solid fa-times"></i></button>
                <div style="text-align:center;margin-bottom:22px;">
                    <div style="width:48px;height:48px;background:var(--gradient-accent);border-radius:12px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:10px;"><i class="fa-solid fa-bars-progress" style="color:#fff;font-size:1.2rem;"></i></div>
                    <h3 style="font-family:var(--font-heading);font-size:1.3rem;font-weight:800;">Add Skill Column</h3>
                </div>
                <div style="display:flex;flex-direction:column;gap:12px;">
                    <div><label style="font-size:0.75rem;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:5px;text-transform:uppercase;">Column Title</label>
                        <input id="as-title" type="text" placeholder="e.g. DevOps & Cloud" style="width:100%;box-sizing:border-box;padding:11px 14px;border-radius:11px;border:1px solid var(--glass-border);background:rgba(255,255,255,0.05);color:var(--text-primary);font-family:var(--font-body);font-size:0.92rem;outline:none;"></div>
                    <div><label style="font-size:0.75rem;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:5px;text-transform:uppercase;">Icon (FontAwesome class)</label>
                        <input id="as-icon" type="text" placeholder="fa-solid fa-cloud" style="width:100%;box-sizing:border-box;padding:11px 14px;border-radius:11px;border:1px solid var(--glass-border);background:rgba(255,255,255,0.05);color:var(--text-primary);font-family:var(--font-body);font-size:0.92rem;outline:none;"></div>
                    <div><label style="font-size:0.75rem;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:5px;text-transform:uppercase;">Skills <span style="text-transform:none;font-weight:400;">(one per line: Name, %)</span></label>
                        <textarea id="as-skills" rows="4" placeholder="Docker, 75&#10;Kubernetes, 65&#10;AWS, 60" style="width:100%;box-sizing:border-box;padding:11px 14px;border-radius:11px;border:1px solid var(--glass-border);background:rgba(255,255,255,0.05);color:var(--text-primary);font-family:var(--font-body);font-size:0.92rem;outline:none;resize:none;"></textarea></div>
                    <button id="as-confirm" style="width:100%;padding:13px;border-radius:12px;background:var(--gradient-accent);color:#fff;font-family:var(--font-heading);font-size:0.95rem;font-weight:700;border:none;cursor:pointer;margin-top:4px;">
                        <i class="fa-solid fa-circle-plus"></i> Add Skill Column
                    </button>
                </div>
            </div>`;
        document.body.appendChild(panel);
        const destroy = () => panel.remove();
        panel.querySelector("#asClose").onclick = destroy;
        panel.querySelector("#asOverlay").onclick = destroy;
        panel.querySelector("#as-confirm").onclick = () => {
            const colTitle = panel.querySelector("#as-title").value.trim() || "New Skills";
            const icon     = panel.querySelector("#as-icon").value.trim()  || "fa-solid fa-star";
            const skillLines = panel.querySelector("#as-skills").value.split("\n").filter(l => l.trim());

            let barsHtml = skillLines.map(line => {
                const parts = line.split(",");
                const name  = (parts[0] || "Skill").trim();
                const pct   = (parts[1] || "80").trim().replace("%","") + "%";
                return `<div class="skill-bar-wrapper">
                    <div class="skill-info"><span contenteditable="true">${name}</span><span contenteditable="true">${pct}</span></div>
                    <div class="progress-bar-bg"><div class="progress-bar-fill" data-progress="${pct}" style="width:${pct}"></div></div>
                </div>`;
            }).join("");

            const grid = section.querySelector(".skills-grid");
            if (!grid) return;
            const col = document.createElement("div");
            col.className = "skills-column glass editor-container-parent";
            col.innerHTML = `
                <div class="column-header">
                    <i class="${icon} icon-tech"></i>
                    <h3 contenteditable="true">${colTitle}</h3>
                </div>
                <div class="skills-list">${barsHtml}</div>`;
            const ctrlOverlay = createControlsOverlay(col, false);
            col.appendChild(ctrlOverlay);
            grid.appendChild(col);
            destroy();
        };
    };

    /* ── Add Stat Card ─────────────────────────────────────────────────────── */
    const showAddStatCardDialog = (section) => {
        const panel = document.createElement("div");
        panel.className = "project-modal active";
        panel.innerHTML = `
            <div class="modal-overlay" id="ascOverlay"></div>
            <div class="modal-wrapper glass" style="max-width:400px;padding:36px;border-radius:24px;overflow:auto;">
                <button class="modal-close" id="ascClose"><i class="fa-solid fa-times"></i></button>
                <div style="text-align:center;margin-bottom:22px;">
                    <div style="width:48px;height:48px;background:var(--gradient-accent);border-radius:12px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:10px;"><i class="fa-solid fa-chart-simple" style="color:#fff;font-size:1.2rem;"></i></div>
                    <h3 style="font-family:var(--font-heading);font-size:1.3rem;font-weight:800;">Add Stat Card</h3>
                </div>
                <div style="display:flex;flex-direction:column;gap:12px;">
                    <div><label style="font-size:0.75rem;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:5px;text-transform:uppercase;">Number Value</label>
                        <input id="asc-val" type="number" placeholder="10" style="width:100%;box-sizing:border-box;padding:11px 14px;border-radius:11px;border:1px solid var(--glass-border);background:rgba(255,255,255,0.05);color:var(--text-primary);font-family:var(--font-body);font-size:0.92rem;outline:none;"></div>
                    <div><label style="font-size:0.75rem;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:5px;text-transform:uppercase;">Label</label>
                        <input id="asc-label" type="text" placeholder="Certifications" style="width:100%;box-sizing:border-box;padding:11px 14px;border-radius:11px;border:1px solid var(--glass-border);background:rgba(255,255,255,0.05);color:var(--text-primary);font-family:var(--font-body);font-size:0.92rem;outline:none;"></div>
                    <button id="asc-confirm" style="width:100%;padding:13px;border-radius:12px;background:var(--gradient-accent);color:#fff;font-family:var(--font-heading);font-size:0.95rem;font-weight:700;border:none;cursor:pointer;margin-top:4px;">
                        <i class="fa-solid fa-circle-plus"></i> Add Stat Card
                    </button>
                </div>
            </div>`;
        document.body.appendChild(panel);
        const destroy = () => panel.remove();
        panel.querySelector("#ascClose").onclick = destroy;
        panel.querySelector("#ascOverlay").onclick = destroy;
        panel.querySelector("#asc-confirm").onclick = () => {
            const val   = panel.querySelector("#asc-val").value.trim()   || "0";
            const label = panel.querySelector("#asc-label").value.trim() || "Stat";
            const grid  = section.querySelector(".stats-counter-grid");
            if (!grid) return;
            const card = document.createElement("div");
            card.className = "stat-card glass editor-container-parent";
            card.innerHTML = `
                <div class="stat-num" data-val="${val}" contenteditable="true">${val}+</div>
                <div class="stat-label" contenteditable="true">${label}</div>`;
            const ctrlOverlay = createControlsOverlay(card, false);
            card.appendChild(ctrlOverlay);
            grid.appendChild(card);
            destroy();
        };
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
        const panel = document.createElement("div");
        // ✅ Use .active class so CSS shows it (opacity:1, pointer-events:all)
        panel.className = "project-modal active";
        panel.innerHTML = `
            <div class="modal-overlay" id="addSectionOverlay"></div>
            <div class="modal-wrapper glass" style="max-width:500px;padding:40px;border-radius:20px;overflow:auto;">
                <button class="modal-close" id="addSectionCloseBtn" aria-label="Close modal">
                    <i class="fa-solid fa-times"></i>
                </button>
                <div style="text-align:center;margin-bottom:25px;">
                    <div style="width:52px;height:52px;background:var(--gradient-accent);border-radius:14px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:12px;">
                        <i class="fa-solid fa-table-columns" style="color:#fff;font-size:1.2rem;"></i>
                    </div>
                    <h3 style="font-family:var(--font-heading);font-size:1.4rem;font-weight:800;">Add New Container Section</h3>
                    <p style="font-size:0.85rem;color:var(--text-secondary);margin-top:5px;">Select a layout template to insert</p>
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
                    <input type="text" id="sectionHeadlineInput" class="editor-modal-select" style="padding:14px 20px;" value="New Customized Section" placeholder="My New Heading">
                </div>
                <button class="btn btn-primary" id="addSectionConfirmBtn" style="width:100%;margin-top:15px;">
                    Insert Container <i class="fa-solid fa-circle-plus"></i>
                </button>
            </div>`;
        document.body.appendChild(panel);

        const destroyModal = () => panel.remove();
        panel.querySelector("#addSectionCloseBtn").onclick = destroyModal;
        panel.querySelector("#addSectionOverlay").onclick  = destroyModal;
        panel.querySelector("#addSectionConfirmBtn").onclick = () => {
            const layout   = panel.querySelector("#sectionLayoutSelect").value;
            const headline = panel.querySelector("#sectionHeadlineInput").value || "Custom Section";
            insertLayoutSection(layout, headline);
            destroyModal();
        };
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
        showPrompt("Edit rotating roles (comma separated):", currentRoles.join(", "), (val) => {
            if (val !== null) {
                const newRoles = val.split(",").map(r => r.trim()).filter(r => r.length > 0);
                if (newRoles.length > 0) {
                    document.body.setAttribute("data-roles", JSON.stringify(newRoles));
                    showAlert("Roles updated! They will animate on next reload.");
                }
            }
        });
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

    // ── Image Picker Panel ──────────────────────────────────────────────────
    let activeImagePicker = null;

    const showImagePicker = (img) => {
        // Remove any existing picker
        if (activeImagePicker) activeImagePicker.remove();

        const panel = document.createElement("div");
        panel.id = "image-picker-panel";
        panel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.95);
            background: rgba(18,20,34,0.97);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(var(--accent-rgb),0.35);
            border-radius: 20px;
            padding: 32px;
            z-index: 999999;
            width: 380px;
            max-width: 95vw;
            box-shadow: 0 25px 60px rgba(0,0,0,0.6);
            animation: imagepickerIn 0.2s cubic-bezier(0.1,0.8,0.25,1) forwards;
        `;

        panel.innerHTML = `
            <style>
                @keyframes imagepickerIn {
                    from { opacity:0; transform:translate(-50%,-50%) scale(0.9); }
                    to   { opacity:1; transform:translate(-50%,-50%) scale(1); }
                }
                #image-picker-panel .ip-title {
                    font-family: var(--font-heading);
                    font-size: 1.15rem;
                    font-weight: 800;
                    margin-bottom: 6px;
                    color: var(--text-primary);
                    display:flex; align-items:center; gap:10px;
                }
                #image-picker-panel .ip-subtitle {
                    font-size: 0.82rem;
                    color: var(--text-secondary);
                    margin-bottom: 22px;
                }
                #image-picker-panel .ip-section-label {
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: var(--text-secondary);
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    margin-bottom: 8px;
                }
                #image-picker-panel .ip-divider {
                    display:flex; align-items:center; gap:10px;
                    margin: 18px 0;
                    color: var(--text-muted);
                    font-size: 0.78rem;
                }
                #image-picker-panel .ip-divider::before,
                #image-picker-panel .ip-divider::after {
                    content:''; flex:1;
                    height:1px; background: var(--glass-border);
                }
                #ip-upload-zone {
                    border: 2px dashed rgba(var(--accent-rgb),0.4);
                    border-radius: 14px;
                    padding: 22px 16px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    background: rgba(var(--accent-rgb),0.04);
                    position: relative;
                }
                #ip-upload-zone:hover {
                    border-color: var(--accent);
                    background: rgba(var(--accent-rgb),0.08);
                }
                #ip-upload-zone.dragover {
                    border-color: var(--accent);
                    background: rgba(var(--accent-rgb),0.14);
                }
                #ip-file-input { display:none; }
                #ip-preview {
                    width: 100%;
                    max-height: 80px;
                    object-fit: cover;
                    border-radius: 8px;
                    margin-top: 10px;
                    display: none;
                }
                #ip-url-input {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 12px 16px;
                    border-radius: 12px;
                    border: 1px solid var(--glass-border);
                    background: rgba(255,255,255,0.05);
                    color: var(--text-primary);
                    font-family: var(--font-body);
                    font-size: 0.9rem;
                    outline: none;
                    transition: border 0.2s;
                }
                #ip-url-input:focus { border-color: var(--accent); }
                #ip-apply-btn {
                    width: 100%;
                    margin-top: 18px;
                    padding: 13px;
                    border-radius: 12px;
                    background: var(--gradient-accent);
                    color: #fff;
                    font-family: var(--font-heading);
                    font-size: 0.95rem;
                    font-weight: 700;
                    border: none;
                    cursor: pointer;
                    transition: opacity 0.2s, transform 0.2s;
                }
                #ip-apply-btn:hover { opacity:0.88; transform:translateY(-1px); }
                #ip-close-btn {
                    position: absolute;
                    top: 14px; right: 14px;
                    background: rgba(255,255,255,0.07);
                    border: none;
                    border-radius: 8px;
                    width: 32px; height: 32px;
                    color: var(--text-secondary);
                    cursor: pointer;
                    font-size: 0.9rem;
                    display:flex; align-items:center; justify-content:center;
                    transition: background 0.2s;
                }
                #ip-close-btn:hover { background: rgba(239,68,68,0.2); color:#f87171; }
            </style>
            <button id="ip-close-btn"><i class="fa-solid fa-times"></i></button>
            <div class="ip-title"><i class="fa-solid fa-image" style="color:var(--accent);"></i> Change Image</div>
            <p class="ip-subtitle">Upload from your device or paste a URL</p>

            <div class="ip-section-label">Upload from Device</div>
            <div id="ip-upload-zone">
                <i class="fa-solid fa-cloud-arrow-up" style="font-size:1.6rem;color:var(--accent);margin-bottom:8px;display:block;"></i>
                <span style="font-size:0.88rem;color:var(--text-secondary);">Click to browse or drag &amp; drop image here</span>
                <input type="file" id="ip-file-input" accept="image/*">
                <img id="ip-preview" alt="Preview">
            </div>

            <div class="ip-divider">or</div>

            <div class="ip-section-label">Image URL / Path</div>
            <input type="text" id="ip-url-input" placeholder="https://... or assets/myimage.jpg" value="${img.getAttribute('src') || ''}">

            <button id="ip-apply-btn"><i class="fa-solid fa-check"></i> Apply Image</button>
        `;

        document.body.appendChild(panel);
        activeImagePicker = panel;

        let localDataURL = null;

        // File input
        const fileInput = panel.querySelector("#ip-file-input");
        const uploadZone = panel.querySelector("#ip-upload-zone");
        const preview = panel.querySelector("#ip-preview");
        const urlInput = panel.querySelector("#ip-url-input");

        uploadZone.addEventListener("click", () => fileInput.click());

        uploadZone.addEventListener("dragover", (ev) => {
            ev.preventDefault();
            uploadZone.classList.add("dragover");
        });
        uploadZone.addEventListener("dragleave", () => uploadZone.classList.remove("dragover"));
        uploadZone.addEventListener("drop", (ev) => {
            ev.preventDefault();
            uploadZone.classList.remove("dragover");
            const file = ev.dataTransfer.files[0];
            if (file && file.type.startsWith("image/")) loadFile(file);
        });

        fileInput.addEventListener("change", () => {
            if (fileInput.files[0]) loadFile(fileInput.files[0]);
        });

        const loadFile = (file) => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                localDataURL = ev.target.result;
                preview.src = localDataURL;
                preview.style.display = "block";
                urlInput.value = "";
                urlInput.placeholder = "(file selected — will use uploaded image)";
            };
            reader.readAsDataURL(file);
        };

        // Apply
        panel.querySelector("#ip-apply-btn").addEventListener("click", () => {
            if (localDataURL) {
                img.setAttribute("src", localDataURL);
            } else if (urlInput.value.trim()) {
                img.setAttribute("src", urlInput.value.trim());
            }
            panel.remove();
            activeImagePicker = null;
        });

        // Close
        panel.querySelector("#ip-close-btn").addEventListener("click", () => {
            panel.remove();
            activeImagePicker = null;
        });
    };

    const handleImageClick = (e) => {
        if (!isEditMode) return;
        e.stopPropagation();
        e.preventDefault();
        showImagePicker(e.target);
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

    // ── Add Project Card (+) ───────────────────────────────────────────────
    const injectAddProjectCard = () => {
        const grid = document.getElementById("projectsGrid");
        if (!grid || grid.querySelector(".add-project-card")) return;

        const card = document.createElement("div");
        card.className = "add-project-card glass";
        card.innerHTML = `
            <div class="add-project-card-inner">
                <div class="add-project-icon"><i class="fa-solid fa-plus"></i></div>
                <span>Add New Project</span>
            </div>
        `;
        card.addEventListener("click", showAddProjectDialog);
        grid.appendChild(card);
    };

    const removeAddProjectCard = () => {
        const card = document.querySelector(".add-project-card");
        if (card) card.remove();
    };

    /* ═══════════════════════════════════════════════════════════════════════
       SECTION ADD-BARS  —  Visible "+" strips inside every content container
       Only injected in Edit Mode, fully removed on exit. NEVER on live site.
       ═══════════════════════════════════════════════════════════════════════ */
    const SECTION_ADD_CONFIGS = [
        {
            container: () => document.querySelector("#experience .timeline"),
            label:  "+ Add Timeline Item",
            icon:   "fa-solid fa-graduation-cap",
            action: () => document.querySelector("#experience .timeline") &&
                         showAddTimelineItemDialog(document.getElementById("experience"))
        },
        {
            container: () => document.querySelector("#skills .skills-grid"),
            label:  "+ Add Skill Column",
            icon:   "fa-solid fa-bars-progress",
            action: () => showAddSkillColumnDialog(document.getElementById("skills"))
        },
        {
            container: () => document.querySelector("#about .stats-counter-grid"),
            label:  "+ Add Stat Card",
            icon:   "fa-solid fa-chart-simple",
            action: () => showAddStatCardDialog(document.getElementById("about"))
        }
    ];

    const injectSectionAddBars = () => {
        SECTION_ADD_CONFIGS.forEach(cfg => {
            const container = cfg.container();
            if (!container || container.querySelector(".section-add-bar")) return;

            const bar = document.createElement("div");
            bar.className = "section-add-bar";
            bar.innerHTML = `
                <button class="section-add-bar-btn">
                    <span class="section-add-bar-icon"><i class="${cfg.icon}"></i></span>
                    <span>${cfg.label}</span>
                </button>`;
            bar.querySelector(".section-add-bar-btn").addEventListener("click", (e) => {
                e.stopPropagation();
                cfg.action();
            });
            container.appendChild(bar);
        });
    };

    const removeSectionAddBars = () => {
        document.querySelectorAll(".section-add-bar").forEach(el => el.remove());
    };

    const showAddProjectDialog = () => {
        let uploadedImageDataURL = null;

        const panel = document.createElement("div");
        // Use .active so CSS transitions work (opacity/pointer-events)
        panel.className = "project-modal active";
        panel.innerHTML = `
            <div class="modal-overlay" id="apOverlay"></div>
            <div class="modal-wrapper glass" style="max-width:500px;padding:36px;border-radius:24px;overflow:auto;">
                <button class="modal-close" id="apClose" aria-label="Close">
                    <i class="fa-solid fa-times"></i>
                </button>
                <div style="text-align:center;margin-bottom:24px;">
                    <div style="width:52px;height:52px;background:var(--gradient-accent);border-radius:14px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:12px;">
                        <i class="fa-solid fa-folder-plus" style="font-size:1.3rem;color:#fff;"></i>
                    </div>
                    <h3 style="font-family:var(--font-heading);font-size:1.35rem;font-weight:800;">Add New Project</h3>
                    <p style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;">Fill in the details for your new project card</p>
                </div>
                <div style="display:flex;flex-direction:column;gap:14px;">
                    <div>
                        <label style="font-size:0.78rem;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:5px;text-transform:uppercase;letter-spacing:0.06em;">Project Title</label>
                        <input id="ap-title" type="text" placeholder="My Awesome Project"
                            style="width:100%;box-sizing:border-box;padding:12px 16px;border-radius:12px;border:1px solid var(--glass-border);background:rgba(255,255,255,0.05);color:var(--text-primary);font-size:0.92rem;font-family:var(--font-body);outline:none;">
                    </div>
                    <div>
                        <label style="font-size:0.78rem;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:5px;text-transform:uppercase;letter-spacing:0.06em;">Category Tag</label>
                        <input id="ap-tag" type="text" placeholder="Full-Stack / Web Application"
                            style="width:100%;box-sizing:border-box;padding:12px 16px;border-radius:12px;border:1px solid var(--glass-border);background:rgba(255,255,255,0.05);color:var(--text-primary);font-size:0.92rem;font-family:var(--font-body);outline:none;">
                    </div>
                    <div>
                        <label style="font-size:0.78rem;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:5px;text-transform:uppercase;letter-spacing:0.06em;">Short Description</label>
                        <textarea id="ap-desc" rows="3" placeholder="Briefly describe what this project does..."
                            style="width:100%;box-sizing:border-box;padding:12px 16px;border-radius:12px;border:1px solid var(--glass-border);background:rgba(255,255,255,0.05);color:var(--text-primary);font-size:0.92rem;font-family:var(--font-body);outline:none;resize:none;"></textarea>
                    </div>
                    <div>
                        <label style="font-size:0.78rem;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:5px;text-transform:uppercase;letter-spacing:0.06em;">Tech Tags <span style="font-weight:400;text-transform:none;">(comma separated)</span></label>
                        <input id="ap-tech" type="text" placeholder="PHP, MySQL, Bootstrap, JavaScript"
                            style="width:100%;box-sizing:border-box;padding:12px 16px;border-radius:12px;border:1px solid var(--glass-border);background:rgba(255,255,255,0.05);color:var(--text-primary);font-size:0.92rem;font-family:var(--font-body);outline:none;">
                    </div>
                    <div>
                        <label style="font-size:0.78rem;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:5px;text-transform:uppercase;letter-spacing:0.06em;">Project Image</label>
                        <div id="ap-upload-zone" style="border:2px dashed rgba(var(--accent-rgb),0.4);border-radius:14px;padding:18px;text-align:center;cursor:pointer;transition:all 0.2s;background:rgba(var(--accent-rgb),0.04);">
                            <i class="fa-solid fa-cloud-arrow-up" style="font-size:1.4rem;color:var(--accent);display:block;margin-bottom:6px;"></i>
                            <span id="ap-upload-label" style="font-size:0.84rem;color:var(--text-secondary);">Click to upload or drag image here</span>
                            <input type="file" id="ap-file-input" accept="image/*" style="display:none;">
                            <img id="ap-preview" style="width:100%;max-height:80px;object-fit:cover;border-radius:8px;margin-top:10px;display:none;" alt="Preview">
                        </div>
                        <input id="ap-img-url" type="text" placeholder="or paste image URL / path"
                            style="width:100%;box-sizing:border-box;padding:10px 14px;border-radius:10px;border:1px solid var(--glass-border);background:rgba(255,255,255,0.05);color:var(--text-primary);font-size:0.88rem;font-family:var(--font-body);outline:none;margin-top:8px;">
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                        <div>
                            <label style="font-size:0.78rem;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:5px;text-transform:uppercase;letter-spacing:0.06em;">Filter Category</label>
                            <select id="ap-category" style="width:100%;box-sizing:border-box;padding:11px 14px;border-radius:12px;border:1px solid var(--glass-border);background:rgba(18,20,34,0.9);color:var(--text-primary);font-family:var(--font-body);font-size:0.9rem;outline:none;cursor:pointer;">
                                <option value="fullstack">Full-Stack</option>
                                <option value="web">Web App</option>
                                <option value="mobile">Mobile</option>
                            </select>
                        </div>
                        <div>
                            <label style="font-size:0.78rem;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:5px;text-transform:uppercase;letter-spacing:0.06em;">Demo URL</label>
                            <input id="ap-demo" type="text" placeholder="https://..."
                                style="width:100%;box-sizing:border-box;padding:11px 14px;border-radius:12px;border:1px solid var(--glass-border);background:rgba(255,255,255,0.05);color:var(--text-primary);font-size:0.9rem;font-family:var(--font-body);outline:none;">
                        </div>
                    </div>
                    <p id="ap-error" style="display:none;color:#ff4d6d;font-size:0.82rem;font-weight:600;text-align:center;padding:8px 12px;background:rgba(255,77,109,0.1);border-radius:8px;">
                        <i class="fa-solid fa-circle-exclamation"></i> Please fill in at least the Title and Description.
                    </p>
                    <button id="ap-confirm" style="width:100%;padding:14px;border-radius:12px;background:var(--gradient-accent);color:#fff;font-family:var(--font-heading);font-size:0.95rem;font-weight:700;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
                        <i class="fa-solid fa-circle-plus"></i> Add Project Card
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(panel);

        // Image upload zone
        const uploadZone = panel.querySelector("#ap-upload-zone");
        const fileInput  = panel.querySelector("#ap-file-input");
        const preview    = panel.querySelector("#ap-preview");
        const uploadLabel = panel.querySelector("#ap-upload-label");
        const imgUrlInput = panel.querySelector("#ap-img-url");

        uploadZone.addEventListener("click", () => fileInput.click());
        uploadZone.addEventListener("dragover", ev => { ev.preventDefault(); uploadZone.style.borderColor="var(--accent)"; });
        uploadZone.addEventListener("dragleave", () => uploadZone.style.borderColor="");
        uploadZone.addEventListener("drop", ev => {
            ev.preventDefault();
            uploadZone.style.borderColor = "";
            if (ev.dataTransfer.files[0]) loadAPFile(ev.dataTransfer.files[0]);
        });
        fileInput.addEventListener("change", () => { if (fileInput.files[0]) loadAPFile(fileInput.files[0]); });

        const loadAPFile = (file) => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                uploadedImageDataURL = ev.target.result;
                preview.src = uploadedImageDataURL;
                preview.style.display = "block";
                uploadLabel.textContent = file.name;
                imgUrlInput.value = "";
            };
            reader.readAsDataURL(file);
        };

        // Close
        const destroyPanel = () => panel.remove();
        panel.querySelector("#apClose").addEventListener("click", destroyPanel);
        panel.querySelector("#apOverlay").addEventListener("click", destroyPanel);

        // Confirm
        panel.querySelector("#ap-confirm").addEventListener("click", () => {
            const title    = panel.querySelector("#ap-title").value.trim();
            const tag      = panel.querySelector("#ap-tag").value.trim() || "Project";
            const desc     = panel.querySelector("#ap-desc").value.trim();
            const techRaw  = panel.querySelector("#ap-tech").value.trim();
            const category = panel.querySelector("#ap-category").value;
            const demo     = panel.querySelector("#ap-demo").value.trim() || "#";
            const imgSrc   = uploadedImageDataURL || imgUrlInput.value.trim() || "";

            if (!title || !desc) {
                panel.querySelector("#ap-error").style.display = "block";
                return;
            }

            // Build tech tags HTML
            const techTags = techRaw
                ? techRaw.split(",").map(t => `<span>${t.trim()}</span>`).join("")
                : "";

            // Assign a new unique ID
            const newId = "p" + Date.now();

            // Create card
            const grid = document.getElementById("projectsGrid");
            const addCard = grid.querySelector(".add-project-card");

            const card = document.createElement("div");
            card.className = "project-card glass editor-container-parent";
            card.setAttribute("data-category", category);
            card.setAttribute("data-project-id", newId);
            card.innerHTML = `
                <div class="project-image">
                    ${imgSrc ? `<img src="${imgSrc}" alt="${title}">` : `<div style="width:100%;height:220px;background:rgba(var(--accent-rgb),0.08);display:flex;align-items:center;justify-content:center;"><i class="fa-solid fa-image" style="font-size:2rem;color:var(--accent);"></i></div>`}
                    <div class="project-hover-overlay">
                        <span class="btn-view-details">Explore System Details <i class="fa-solid fa-up-right-from-square"></i></span>
                    </div>
                </div>
                <div class="project-info">
                    <span class="project-tag" contenteditable="true">${tag}</span>
                    <h3 contenteditable="true">${title}</h3>
                    <p contenteditable="true">${desc}</p>
                    <div class="project-tech-tags">${techTags}</div>
                </div>
            `;

            // Inject editor controls overlay
            const overlay = createControlsOverlay(card, false);
            card.appendChild(overlay);

            // Insert before the + card
            grid.insertBefore(card, addCard);

            // Add data to projectsData in memory
            projectsData[newId] = {
                title, tag, image: imgSrc,
                desc,
                highlights: ["Click to edit project highlights in the modal."],
                demo, code: "#"
            };

            // Bind click for modal
            card.addEventListener("click", (ev) => {
                if (isEditMode) return; // skip modal in edit mode
                const pid = card.getAttribute("data-project-id");
                const data = projectsData[pid];
                if (!data) return;
                modalImg.src = data.image;
                modalImg.alt = data.title;
                modalTag.textContent = data.tag;
                modalTitle.textContent = data.title;
                modalDesc.textContent = data.desc;
                modalHighlights.innerHTML = "";
                data.highlights.forEach(hl => {
                    const li = document.createElement("li");
                    li.textContent = hl;
                    modalHighlights.appendChild(li);
                });
                modalDemoLink.href = data.demo;
                modalCodeLink.href = data.code;
                projectModal.classList.add("active");
                body.classList.add("no-scroll");
            });

            // Bind image listener on new img
            const newImg = card.querySelector("img");
            if (newImg) newImg.addEventListener("click", handleImageClick);

            destroyPanel();
        });
    };

    // Exit Edit Mode and revert editor classes
    const exitEditMode = () => {
        if (!isEditMode) return;
        showConfirm("Are you sure you want to exit Edit Mode?<br>Builder controls will hide but content changes stay.", () => {
            isEditMode = false;
            body.classList.remove("edit-mode-active");

            // Close any open image picker
            if (activeImagePicker) { activeImagePicker.remove(); activeImagePicker = null; }

            // Strip ALL editor UI components
            removeEditorToolbar();
            disableEditableElements();
            removeEditorControls();
            removeAddProjectCard();
            removeSectionAddBars();       // ← remove inline "+" bars from all sections
            removeAssetListeners();

            document.removeEventListener("click", preventLinkNavigation, true);
        });
    };

    // Serialize DOM, extract JS data, and prompt download of updated script.js and index.html
    const savePortfolioHTML = async () => {
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

        // 4. Update JS Data config and fetch script.js
        const updatedData = { ...PORTFOLIO_DATA };
        document.querySelectorAll("[data-field]").forEach(el => {
            updatedData[el.getAttribute("data-field")] = el.innerHTML;
        });
        updatedData.roles = roles;
        updatedData.projects = projectsData;

        try {
            const res = await fetch("script.js");
            let scriptText = await res.text();
            
            // Replace PORTFOLIO_DATA in text
            const jsonStr = JSON.stringify(updatedData, null, 4);
            const regex = /const PORTFOLIO_DATA = \{[\s\S]*?\};\n/;
            scriptText = scriptText.replace(regex, `const PORTFOLIO_DATA = ${jsonStr};\n`);

            const jsBlob = new Blob([scriptText], { type: "application/javascript" });
            const jsUrl = URL.createObjectURL(jsBlob);
            const jsLink = document.createElement("a");
            jsLink.href = jsUrl;
            jsLink.download = "script.js";
            document.body.appendChild(jsLink);
            jsLink.click();
            document.body.removeChild(jsLink);
            URL.revokeObjectURL(jsUrl);
        } catch(e) {
            console.error("Error fetching or saving script.js", e);
        }

        // Serialize back to HTML string
        const doctypeString = "<!DOCTYPE html>\n";
        const completeHTML = doctypeString + cloneDoc.documentElement.outerHTML;

        // Trigger HTML file download
        const blob = new Blob([completeHTML], { type: "text/html" });
        const downloadUrl = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.download = "index.html";
        
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadUrl);

        showAlert("Save complete! The modified 'index.html' and 'script.js' files have been downloaded. Replace them in your code folder.");
    };

    // Run preferences startup
    initPreferences();
});
