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


    /* Close mobile menu after clicking a link */

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
   FORMSPREE
========================= */

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        if (formMessage) {

            formMessage.textContent = "Sending message...";
            formMessage.style.color = "#7c3aed";

        }

        const formData = new FormData(contactForm);

        try {

            const response = await fetch(contactForm.action, {

                method: "POST",

                body: formData,

                headers: {
                    "Accept": "application/json"
                }

            });


            if (response.ok) {

                if (formMessage) {

                    formMessage.textContent =
                        "Message sent successfully! Thank you for contacting me.";

                    formMessage.style.color = "#16a34a";

                }

                contactForm.reset();

            } else {

                if (formMessage) {

                    formMessage.textContent =
                        "Something went wrong. Please try again.";

                    formMessage.style.color = "#dc2626";

                }

            }

        } catch (error) {

            if (formMessage) {

                formMessage.textContent =
                    "Unable to send the message. Please try again.";

                formMessage.style.color = "#dc2626";

            }

        }

    });

}


/* =========================
   SCROLL ANIMATION
========================= */

const animatedElements = document.querySelectorAll(
    ".skill-card, .project-card, .certification-card, .timeline-content"
);


const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {
        threshold: 0.15
    }

);


animatedElements.forEach(element => {

    element.classList.add("animate-on-scroll");

    observer.observe(element);

});