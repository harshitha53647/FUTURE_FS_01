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


    /* Close menu after clicking a link */

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
   CONTACT FORM - FORMSPREE
========================= */

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm && formMessage) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        /* Get form values */

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const subject =
            document.getElementById("subject").value.trim();

        const message =
            document.getElementById("message").value.trim();


        /* Validate fields */

        if (!name || !email || !subject || !message) {

            formMessage.textContent =
                "Please fill in all fields.";

            formMessage.style.color = "#dc2626";

            return;
        }


        /* Show sending message */

        formMessage.textContent =
            "Sending your message...";

        formMessage.style.color = "#7b1fa2";


        /* Disable button while sending */

        const submitButton =
            contactForm.querySelector("button[type='submit']");

        if (submitButton) {
            submitButton.disabled = true;
        }


        try {

            /* Send form data to Formspree */

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


            /* Check response */

            if (response.ok) {

                formMessage.textContent =
                    "Message sent successfully! Thank you for reaching out.";

                formMessage.style.color = "#16a34a";

                /* Clear form */

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


        /* Enable button again */

        if (submitButton) {
            submitButton.disabled = false;
        }

    });

}


/* =========================
   SCROLL ANIMATION
========================= */

const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    /* Stop observing after animation */

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15
        }

    );


/* Elements to animate */

document
    .querySelectorAll(
        ".skill-card, .project-card, .certification-card, .timeline-content"
    )
    .forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        observer.observe(element);

    });


/* =========================
   ANIMATION STYLE
========================= */

const style =
    document.createElement("style");

style.innerHTML = `

    .skill-card.show,
    .project-card.show,
    .certification-card.show,
    .timeline-content.show {

        opacity: 1 !important;

        transform: translateY(0) !important;

    }

    button:disabled {

        opacity: 0.6;

        cursor: not-allowed;

    }

`;

document.head.appendChild(style);