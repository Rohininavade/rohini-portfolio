/* ================= MOBILE MENU ================= */

const menuBtn =
    document.getElementById("menuBtn");

const header =
    document.querySelector(".header");

const navMenu =
    document.getElementById("navMenu");

if (menuBtn && header && navMenu) {

    menuBtn.addEventListener("click", () => {

        const isOpen =
            header.classList.toggle("nav-open");

        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navMenu.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                header.classList.remove("nav-open");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.setAttribute("aria-label", "Open navigation menu");

            });

        });

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            header.classList.remove("nav-open");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute("aria-label", "Open navigation menu");
        }

    });

}

/* ================= SCROLL REVEAL ================= */

const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {

    document.documentElement.classList.add("reveal-enabled");

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }
            });

        },

        {
            threshold: 0.12
        }
    );

    const revealElements =
        document.querySelectorAll(".reveal");

    revealElements.forEach(element => {

        observer.observe(element);

        const rect =
            element.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            element.classList.add("visible");
            observer.unobserve(element);
        }

    });

    window.setTimeout(() => {

        if (
            [...revealElements]
                .some(element => !element.classList.contains("visible"))
        ) {
            document.documentElement.classList.remove("reveal-enabled");
        }

    }, 2000);
}

/* ================= TYPING EFFECT ================= */

const typingElement =
    document.querySelector(".typing-text");


const words = [

    "Java.",
    "Spring Boot.",
    "Microservices.",
    "REST APIs.",
    "Azure Service Bus."

];


let wordIndex = 0;
let characterIndex = 0;

let deleting = false;


function typeEffect() {

    if (!typingElement) {
        return;
    }

    const currentWord =
        words[wordIndex];


    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (
            characterIndex ===
            currentWord.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1300
            );

            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (characterIndex === 0) {

            deleting = false;

            wordIndex =
                (wordIndex + 1)
                % words.length;

        }

    }


    setTimeout(
        typeEffect,
        deleting ? 55 : 95
    );

}


typeEffect();


/* ================= HERO 3D TILT ================= */

const heroVisual =
    document.querySelector(".hero-visual");

const codeWindow =
    document.querySelector(".code-window");


if (heroVisual && codeWindow) {

    heroVisual.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth < 900) {

                return;
            }

            const rect =
                heroVisual.getBoundingClientRect();


            const x =
                (event.clientX - rect.left)
                / rect.width
                - .5;


            const y =
                (event.clientY - rect.top)
                / rect.height
                - .5;


            const rotateY =
                x * 12;


            const rotateX =
                y * -10;


            codeWindow.style.transform =
                `perspective(1000px)
                 rotateY(${rotateY}deg)
                 rotateX(${rotateX}deg)
                 translateY(-5px)`;

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            codeWindow.style.transform =
                `perspective(1000px)
                 rotateY(-7deg)
                 rotateX(3deg)`;

        }
    );
}


/* ================= 3D SKILL SPHERES ================= */

const skillSpheres =
    document.querySelectorAll(".skill-sphere .sphere");


skillSpheres.forEach(sphere => {

    sphere.addEventListener("mousemove", event => {

        if (window.innerWidth < 800) {
            return;
        }

        const rect =
            sphere.getBoundingClientRect();


        const x =
            (event.clientX - rect.left)
            / rect.width - 0.5;


        const y =
            (event.clientY - rect.top)
            / rect.height - 0.5;


        const rotateY =
            x * 22;


        const rotateX =
            y * -22;


        sphere.style.setProperty(
            "--rx",
            `${rotateX}deg`
        );


        sphere.style.setProperty(
            "--ry",
            `${rotateY}deg`
        );

    });


    sphere.addEventListener("mouseleave", () => {

        sphere.style.setProperty(
            "--rx",
            "0deg"
        );


        sphere.style.setProperty(
            "--ry",
            "0deg"
        );

    });

});

/* ================= ACTIVE NAV ================= */

const sections =
    document.querySelectorAll("section[id]");


const navLinks =
    document.querySelectorAll(
        "#navMenu a"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;


            if (
                window.scrollY >=
                sectionTop
            ) {

                current =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute("href")
                === `#${current}`
            ) {

                link.classList.add(
                    "active"
                );

                link.setAttribute("aria-current", "location");

            } else {

                link.removeAttribute("aria-current");

            }

        });

    }
);