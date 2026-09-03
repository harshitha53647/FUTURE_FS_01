/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm && formMessage) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {

            formMessage.textContent = "Please fill in all fields.";
            formMessage.style.color = "#dc2626";

            return;

        }

        formMessage.textContent = "Sending your message...";
        formMessage.style.color = "#7b1fa2";

        const submitButton =
            contactForm.querySelector("button[type='submit']");

        if (submitButton) {
            submitButton.disabled = true;
        }

        try {

            const response = await fetch(
                "https://formspree.io/f/xzebpqpn",
                {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            if (response.ok) {

                formMessage.textContent =
                    "Message sent successfully! Thank you for reaching out.";

                formMessage.style.color = "#16a34a";

                contactForm.reset();

            } else {

                formMessage.textContent =
                    "Something went wrong. Please try again.";

                formMessage.style.color = "#dc2626";

            }

        } catch (error) {

            formMessage.textContent =
                "Unable to send message. Please try again later.";

            formMessage.style.color = "#dc2626";

            console.error("Formspree Error:", error);

        }

        if (submitButton) {
            submitButton.disabled = false;
        }

    });

}


/* =========================
   SCROLL ANIMATION
========================= */

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);


document.querySelectorAll(
    ".skill-card, .project-card, .certificate-card, .timeline-content"
).forEach(element => {

    observer.observe(element);

});


/* =========================
   CERTIFICATE POPUP
========================= */

const certificateModal =
    document.getElementById("certificate-modal");

const modalImage =
    document.getElementById("modal-image");

const modalClose =
    document.getElementById("modal-close");


document.querySelectorAll(".certificate-card").forEach(card => {

    card.addEventListener("click", () => {

        const certificateImage =
            card.querySelector(".certificate-image img");

        if (certificateImage && certificateModal && modalImage) {

            modalImage.src = certificateImage.src;

            modalImage.alt = certificateImage.alt;

            certificateModal.classList.add("active");

            document.body.style.overflow = "hidden";

        }

    });

});


/* Close Button */

if (modalClose && certificateModal) {

    modalClose.addEventListener("click", () => {

        certificateModal.classList.remove("active");

        document.body.style.overflow = "auto";

    });

}


/* Close when clicking outside */

if (certificateModal) {

    certificateModal.addEventListener("click", (event) => {

        if (event.target === certificateModal) {

            certificateModal.classList.remove("active");

            document.body.style.overflow = "auto";

        }

    });

}


/* Close using ESC key */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape" && certificateModal) {

        certificateModal.classList.remove("active");

        document.body.style.overflow = "auto";

    }

});
/* =========================
   TYPING ANIMATION
========================= */

const typingText = document.getElementById("typing-text");

const words = [
    "CSE-AIML Student",
    "Python Enthusiast",
    "AI & ML Learner",
    "Technology Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (!isDeleting) {

        typingText.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingText.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            isDeleting = false;

            wordIndex =
                (wordIndex + 1) % words.length;

        }

    }

    setTimeout(
        typeEffect,
        isDeleting ? 60 : 100
    );

}

typeEffect();
/* =========================
   SCROLL PROGRESS BAR
========================= */

const scrollProgress =
    document.getElementById("scroll-progress");


window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const scrollHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const scrollPercentage =
        (scrollTop / scrollHeight) * 100;

    if (scrollProgress) {

        scrollProgress.style.width =
            scrollPercentage + "%";

    }

});
/* =========================
   ACTIVE NAVBAR LINKS
========================= */

const sections = document.querySelectorAll(
    "section[id]"
);

const navItems = document.querySelectorAll(
    ".nav-links a"
);


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
                sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navItems.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});
/* =========================
   BACK TO TOP BUTTON
========================= */

const backToTop =
    document.getElementById("back-to-top");


window.addEventListener("scroll", () => {

    if (backToTop) {

        if (window.scrollY > 400) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }

});


if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}
/* =========================
   PRELOADER
========================= */

window.addEventListener("load", () => {

    const preloader =
        document.getElementById("preloader");

    setTimeout(() => {

        if (preloader) {

            preloader.classList.add("hide");

        }

    }, 1200);

});
/* =========================
   SKILLS PROGRESS ANIMATION
========================= */

const skillProgressSection =
    document.querySelector(".skills-progress-container");

const progressBars =
    document.querySelectorAll(".progress-fill");


const skillObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    progressBars.forEach(bar => {

                        const progress =
                            bar.getAttribute("data-progress");

                        bar.style.width =
                            progress + "%";

                    });

                    skillObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.3
        }

    );


if (skillProgressSection) {

    skillObserver.observe(skillProgressSection);

}
/* =========================
   SCROLL REVEAL ANIMATIONS
========================= */

const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-zoom"
);

const revealOnScroll = () => {

    const windowHeight = window.innerHeight;

    revealElements.forEach((element) => {

        const elementTop =
            element.getBoundingClientRect().top;

        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {

            element.classList.add("active");

        }

    });

};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();
/* =====================================================
   PROFESSIONAL CUSTOM CURSOR
===================================================== */

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

if (cursorDot && cursorOutline) {

    document.addEventListener("mousemove", (e) => {

        cursorDot.style.left = e.clientX + "px";
        cursorDot.style.top = e.clientY + "px";

        cursorOutline.animate(
            {
                left: e.clientX + "px",
                top: e.clientY + "px"
            },
            {
                duration: 180,
                fill: "forwards"
            }
        );

    });


    /* CURSOR HOVER EFFECT */

    const hoverElements = document.querySelectorAll(
        "a, button, .project-card, .skill-card, .certificate-card"
    );

    hoverElements.forEach((element) => {

        element.addEventListener("mouseenter", () => {

            cursorOutline.classList.add("hover");

        });

        element.addEventListener("mouseleave", () => {

            cursorOutline.classList.remove("hover");

        });

    });

}


/* =====================================================
   MAGNETIC BUTTON EFFECT
===================================================== */

const magneticButtons = document.querySelectorAll(
    ".btn, .project-btn, .project-link"
);

magneticButtons.forEach((button) => {

    button.classList.add("magnetic");

    button.addEventListener("mousemove", (e) => {

        const position = button.getBoundingClientRect();

        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;

        button.style.transform =
            `translate(${x * 0.18}px, ${y * 0.18}px)`;

    });


    button.addEventListener("mouseleave", () => {

        button.style.transform = "translate(0, 0)";

    });

});
/* =====================================================
   GITHUB LIVE STATISTICS
===================================================== */

const githubUsername = "harshitha53647";


async function loadGitHubStats() {

    try {

        const response = await fetch(
            `https://api.github.com/users/${githubUsername}`
        );

        const data = await response.json();


        document.getElementById("repo-count").textContent =
            data.public_repos ?? "0";


        document.getElementById("followers-count").textContent =
            data.followers ?? "0";


        document.getElementById("following-count").textContent =
            data.following ?? "0";


        const repoResponse = await fetch(
            `https://api.github.com/users/${githubUsername}/repos?per_page=100`
        );

        const repositories =
            await repoResponse.json();


        let totalStars = 0;


        repositories.forEach(repo => {

            totalStars +=
                repo.stargazers_count;

        });


        document.getElementById("stars-count").textContent =
            totalStars;


    } catch (error) {

        console.error(
            "Unable to load GitHub statistics:",
            error
        );

    }

}


loadGitHubStats();
/* =========================================
   REAL MOUSE FOLLOWING 3D CARDS
========================================= */

const cards = document.querySelectorAll(
    ".project-card, .skill-card, .certificate-card, .github-stat-card"
);

cards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-10px)`;
    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });

});
/* =========================================
   ANIMATED SECTION TITLES
========================================= */

const sectionTitles = document.querySelectorAll(".section-title");

const titleObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    },
    {
        threshold: 0.2
    }
);

sectionTitles.forEach((title) => {
    titleObserver.observe(title);
});
/* =========================================
   FLOATING PARTICLES
========================================= */

const particlesContainer = document.querySelector(".particles");

if (particlesContainer) {

    for (let i = 0; i < 40; i++) {

        const particle = document.createElement("span");

        particle.classList.add("particle");

        const size = Math.random() * 8 + 3;

        particle.style.width = size + "px";
        particle.style.height = size + "px";

        particle.style.left = Math.random() * 100 + "%";

        particle.style.animationDuration =
            Math.random() * 12 + 8 + "s";

        particle.style.animationDelay =
            Math.random() * 10 + "s";

        particlesContainer.appendChild(particle);

    }

}

 /* =========================================
   DARK / LIGHT MODE
========================================= */

const themeToggle = document.getElementById("theme-toggle");

const themeIcon = themeToggle
    ? themeToggle.querySelector("i")
    : null;


/* Load Saved Theme */

if (localStorage.getItem("theme") === "light") {

    document.body.classList.add("light-mode");

    if (themeIcon) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    }

}


/* Toggle Theme */

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");


        if (document.body.classList.contains("light-mode")) {

            localStorage.setItem("theme", "light");

            if (themeIcon) {

                themeIcon.classList.remove("fa-moon");
                themeIcon.classList.add("fa-sun");

            }

        } else {

            localStorage.setItem("theme", "dark");

            if (themeIcon) {

                themeIcon.classList.remove("fa-sun");
                themeIcon.classList.add("fa-moon");

            }

        }

    });

}
/* =========================================
   ANIMATED ABOUT COUNTERS
========================================= */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                const counter = entry.target;

                const target =
                    parseFloat(counter.getAttribute("data-target"));

                const decimals =
                    parseInt(counter.getAttribute("data-decimals")) || 0;

                const suffix =
                    counter.getAttribute("data-suffix") || "";

                const duration = 1500;

                const startTime = performance.now();

                function updateCounter(currentTime) {

                    const progress =
                        Math.min(
                            (currentTime - startTime) / duration,
                            1
                        );

                    const value =
                        target * progress;

                    counter.textContent =
                        value.toFixed(decimals) + suffix;

                    if (progress < 1) {

                        requestAnimationFrame(updateCounter);

                    } else {

                        counter.textContent =
                            target.toFixed(decimals) + suffix;

                    }

                }

                requestAnimationFrame(updateCounter);

                counterObserver.unobserve(counter);

            }

        });

    },
    {
        threshold: 0.7
    }
);


counters.forEach((counter) => {

    counterObserver.observe(counter);

});
/* =========================================
   PROJECT SCREENSHOT POPUP
========================================= */

const projectModal =
    document.getElementById("project-modal");

const projectModalImage =
    document.getElementById("project-modal-image");

const projectModalClose =
    document.getElementById("project-modal-close");


/* Open Project Screenshot */

document.querySelectorAll(".project-clickable").forEach(card => {

    card.addEventListener("click", (event) => {

        /*
         * Do not open popup when clicking
         * GitHub or Live Demo buttons.
         */

        if (event.target.closest("a")) {
            return;
        }

        const imagePath =
            card.getAttribute("data-project-image");

        if (
            imagePath &&
            projectModal &&
            projectModalImage
        ) {

            projectModalImage.src = imagePath;

            projectModal.classList.add("active");

            document.body.style.overflow = "hidden";
        }

    });

});


/* Close Button */

if (projectModalClose && projectModal) {

    projectModalClose.addEventListener("click", () => {

        projectModal.classList.remove("active");

        projectModalImage.src = "";

        document.body.style.overflow = "auto";

    });

}


/* Close when clicking outside */

if (projectModal) {

    projectModal.addEventListener("click", (event) => {

        if (event.target === projectModal) {

            projectModal.classList.remove("active");

            projectModalImage.src = "";

            document.body.style.overflow = "auto";

        }

    });

}


/* Close using ESC */

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        projectModal
    ) {

        projectModal.classList.remove("active");

        projectModalImage.src = "";

        document.body.style.overflow = "auto";

    }

});