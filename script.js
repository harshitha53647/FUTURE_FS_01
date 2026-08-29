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

}


/* =========================
   CLOSE MENU AFTER CLICKING
========================= */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================
   CONTACT FORM - FORMSPREE
========================= */

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");


if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        const formData = new FormData(contactForm);


        formMessage.textContent = "Sending message...";
        formMessage.style.color = "#b94f5d";


        try {

            const response = await fetch(
                contactForm.action,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


            if (response.ok) {

                formMessage.textContent =
                    "Message sent successfully! Thank you.";

                formMessage.style.color = "#16a34a";


                contactForm.reset();

            } else {

                formMessage.textContent =
                    "Oops! Something went wrong. Please try again.";

                formMessage.style.color = "#dc2626";

            }

        } catch (error) {

            formMessage.textContent =
                "Network error. Please try again.";

            formMessage.style.color = "#dc2626";

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


/* Elements to animate */

const animatedElements = document.querySelectorAll(

    ".skill-card, " +
    ".project-card, " +
    ".certification-card, " +
    ".timeline-content, " +
    ".about-box"

);


animatedElements.forEach(element => {

    element.classList.add("hidden-animation");

    observer.observe(element);

});