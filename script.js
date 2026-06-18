const characters = [
    {
        name: "Aarya Stark",
        role: "Fearless young warrior",
        house: "House Stark",
        image: "aarya  stark.jpg",
        description: "A fearless young warrior who transforms from a noble girl into one of Westeros' deadliest assassins. Driven by courage and determination, Arya seeks justice in a world filled with conflict."
    },
    {
        name: "Cersei Lannister",
        role: "Powerful queen",
        house: "House Lannister",
        image: "cersi.jpg",
        description: "A powerful and ambitious queen known for her intelligence, political skill, and unwavering determination to protect her family's legacy."
    },
    {
        name: "Jaime Lannister",
        role: "Legendary knight",
        house: "House Lannister",
        image: "jamie lannister.jpg",
        description: "A legendary knight whose journey challenges perceptions of honor, redemption, and loyalty throughout the Seven Kingdoms."
    },
    {
        name: "Daenerys Targaryen",
        role: "Mother of Dragons",
        house: "House Targaryen",
        image: "khalesi.jpg",
        description: "Known as the Mother of Dragons, Daenerys rises from exile to become a powerful leader determined to reclaim her family's lost throne."
    },
    {
        name: "Petyr Baelish",
        role: "Littlefinger",
        house: "House Baelish",
        image: "little finger.jpg",
        description: "A master strategist and political manipulator whose schemes influence the fate of kingdoms from behind the scenes."
    },
    {
        name: "Eddard Stark",
        role: "Honorable lord",
        house: "House Stark",
        image: "ned stark.jpg",
        description: "A respected lord known for his honor, integrity, and commitment to justice, even when faced with difficult choices."
    },
    {
        name: "Sansa Stark",
        role: "Resilient noblewoman",
        house: "House Stark",
        image: "sansa stark.jpg",
        description: "A resilient noblewoman who evolves from an innocent dreamer into a wise and capable leader."
    },
    {
        name: "Jon Snow",
        role: "Courageous warrior",
        house: "House Stark / Targaryen",
        image: "jon snow.jpg",
        description: "A courageous warrior and leader who dedicates himself to protecting the realm from threats beyond the Wall."
    },
    {
        name: "Tyrion Lannister",
        role: "Sharp wit and intelligence",
        house: "House Lannister",
        image: "tyron Lannister.jpg",
        description: "Renowned for his sharp wit and intelligence, Tyrion uses wisdom and diplomacy to navigate a dangerous political world."
    },
    {
        name: "Night King",
        role: "Ancient winter force",
        house: "Leader of the White Walkers",
        image: "white walker.jpg",
        description: "An ancient and mysterious force leading an army of the dead, representing one of the greatest threats to Westeros."
    }
];

const houses = [
    { name: "Stark", sigil: "S", words: "Winter is Coming", color: "#7d8792", text: "Wardens of the North, bound to endurance, loyalty, and old honor." },
    { name: "Lannister", sigil: "L", words: "Hear Me Roar", color: "#b43737", text: "A golden house built on wealth, pride, and political precision." },
    { name: "Targaryen", sigil: "T", words: "Fire and Blood", color: "#7f2424", text: "Dragonlords whose legacy burns through conquest, exile, and prophecy." },
    { name: "Baratheon", sigil: "B", words: "Ours is the Fury", color: "#b28a2f", text: "Storm-born rulers with force, fury, and disputed crowns." },
    { name: "Tyrell", sigil: "Y", words: "Growing Strong", color: "#4d8b60", text: "Elegant power brokers with deep roots and sharper thorns." }
];

const timeline = [
    { period: "The King's Peace", title: "A Fragile Realm", text: "The Seven Kingdoms appear united, but rivalries and old wounds wait beneath the royal court." },
    { period: "War of Five Kings", title: "Crowns Multiply", text: "Claims rise across Westeros as houses gamble their armies, marriages, and futures." },
    { period: "Beyond the Wall", title: "The True Threat", text: "Ancient winter returns, forcing the living to confront a war larger than politics." },
    { period: "The Last War", title: "Fire Over the Capital", text: "The struggle for the throne reaches King's Landing and changes the realm's future." }
];

const characterGrid = document.querySelector("[data-character-grid]");
const houseGrid = document.querySelector("[data-house-grid]");
const timelineTrack = document.querySelector("[data-timeline-track]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");
const loader = document.querySelector("[data-loader]");
const particleCanvas = document.querySelector("[data-particles]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function renderCharacters() {
    characterGrid.innerHTML = characters.map((character, index) => `
        <article class="character-card reveal">
            <div class="character-media">
                <img src="${character.image}" alt="${character.name} portrait" loading="${index < 2 ? "eager" : "lazy"}" decoding="async">
            </div>
            <div class="character-content">
                <h3>${character.name}</h3>
                <p class="role">${character.role}</p>
                <p class="character-house">${character.house}</p>
                <p class="character-overview">${character.description}</p>
            </div>
        </article>
    `).join("");
}

function renderHouses() {
    houseGrid.innerHTML = houses.map(house => `
        <article class="house-card reveal" style="--house-color: ${house.color}">
            <div>
                <div class="sigil" aria-hidden="true">${house.sigil}</div>
                <p class="words">"${house.words}"</p>
            </div>
            <div>
                <h3>House ${house.name}</h3>
                <p>${house.text}</p>
            </div>
        </article>
    `).join("");
}

function renderTimeline() {
    timelineTrack.innerHTML = timeline.map(event => `
        <article class="timeline-item reveal">
            <time>${event.period}</time>
            <h3>${event.title}</h3>
            <p>${event.text}</p>
        </article>
    `).join("");
}

function setupNavigation() {
    navToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("is-open");
        document.body.classList.toggle("nav-open", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
        navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navLinks.addEventListener("click", event => {
        if (event.target.matches("a")) {
            navLinks.classList.remove("is-open");
            document.body.classList.remove("nav-open");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Open navigation");
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && navLinks.classList.contains("is-open")) {
            navLinks.classList.remove("is-open");
            document.body.classList.remove("nav-open");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Open navigation");
            navToggle.focus();
        }
    });
}

function setupRevealAnimations() {
    if (prefersReducedMotion.matches) {
        document.querySelectorAll(".reveal").forEach(element => element.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });

    document.querySelectorAll(".reveal").forEach((element, index) => {
        element.style.transitionDelay = `${Math.min(index * 55, 360)}ms`;
        observer.observe(element);
    });
}

function setupActiveLinks() {
    const sections = document.querySelectorAll("main section[id]");
    const links = document.querySelectorAll(".nav-links a");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }

            links.forEach(link => {
                const isActive = link.getAttribute("href") === `#${entry.target.id}`;
                link.classList.toggle("active", isActive);

                if (isActive) {
                    link.setAttribute("aria-current", "true");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        });
    }, { rootMargin: "-45% 0px -45% 0px" });

    sections.forEach(section => observer.observe(section));
}

function setupLoadingScreen() {
    if (!loader) {
        return;
    }

    document.body.classList.add("loading");

    let hidden = false;
    const hideLoader = () => {
        if (hidden) {
            return;
        }

        hidden = true;
        loader.classList.add("is-hidden");
        document.body.classList.remove("loading");
        window.setTimeout(() => loader.setAttribute("aria-hidden", "true"), 650);
    };

    window.addEventListener("load", () => {
        window.setTimeout(hideLoader, 650);
    });

    window.setTimeout(hideLoader, 2500);
}

function setupParticles() {
    if (!particleCanvas || prefersReducedMotion.matches) {
        return;
    }

    const context = particleCanvas.getContext("2d");
    const particles = [];
    let particleCount = 64;
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let running = true;

    function resize() {
        const ratio = window.devicePixelRatio || 1;
        width = window.innerWidth;
        height = window.innerHeight;
        particleCount = Math.min(68, Math.max(28, Math.floor((width * height) / 26000)));
        particleCanvas.width = width * ratio;
        particleCanvas.height = height * ratio;
        particleCanvas.style.width = `${width}px`;
        particleCanvas.style.height = `${height}px`;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function createParticle() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.8 + 0.4,
            speedX: Math.random() * 0.25 - 0.125,
            speedY: Math.random() * 0.5 + 0.12,
            alpha: Math.random() * 0.45 + 0.1,
            tone: Math.random() > 0.5 ? "gold" : "silver"
        };
    }

    function resetParticles() {
        particles.length = 0;
        for (let index = 0; index < particleCount; index += 1) {
            particles.push(createParticle());
        }
    }

    function draw() {
        if (!running) {
            return;
        }

        context.clearRect(0, 0, width, height);

        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.y > height + 10) {
                Object.assign(particle, createParticle(), { y: -10 });
            }

            if (particle.x < -10) {
                particle.x = width + 10;
            }

            if (particle.x > width + 10) {
                particle.x = -10;
            }

            context.beginPath();
            context.fillStyle = particle.tone === "gold"
                ? `rgba(246, 221, 154, ${particle.alpha})`
                : `rgba(217, 226, 232, ${particle.alpha})`;
            context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            context.fill();
        });

        animationFrame = requestAnimationFrame(draw);
    }

    resize();
    resetParticles();
    draw();
    let resizeTimer;
    window.addEventListener("resize", () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
            resize();
            resetParticles();
        }, 120);
    });

    document.addEventListener("visibilitychange", () => {
        running = !document.hidden;

        if (running) {
            draw();
        } else {
            cancelAnimationFrame(animationFrame);
        }
    });
}

renderCharacters();
renderHouses();
renderTimeline();
setupLoadingScreen();
setupNavigation();
setupRevealAnimations();
setupActiveLinks();
setupParticles();
