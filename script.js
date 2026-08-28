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


    /* Close mobile menu after clicking */

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

const contactForm =
    document.getElementById("contact-form");

const formMessage =
    document.getElementById("form-message");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );


            const originalButtonText =
                submitButton.innerHTML;


            /* Show sending message */

            submitButton.disabled = true;

            submitButton.innerHTML =
                'Sending... <i class="fas fa-spinner fa-spin"></i>';

            formMessage.textContent =
                "";


            const formData =
                new FormData(contactForm);


            try {

                const response =
                    await fetch(
                        contactForm.action,
                        {
                            method: "POST",

                            body: formData,

                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                if (response.ok) {

                    formMessage.textContent =
                        "Thank you! Your message has been sent successfully.";

                    formMessage.style.color =
                        "#16a34a";


                    /* Clear form */

                    contactForm.reset();

                } else {

                    formMessage.textContent =
                        "Something went wrong. Please try again.";

                    formMessage.style.color =
                        "#dc2626";

                }


            } catch (error) {

                formMessage.textContent =
                    "Unable to send the message. Please try again.";

                formMessage.style.color =
                    "#dc2626";

            }


            /* Restore button */

            submitButton.disabled = false;

            submitButton.innerHTML =
                originalButtonText;

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

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15
        }

    );


document
    .querySelectorAll(
        ".skill-card, .project-card, .certification-card, .timeline-content"
    )
    .forEach(element => {

        observer.observe(element);

    });


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections =
    document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 120;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});