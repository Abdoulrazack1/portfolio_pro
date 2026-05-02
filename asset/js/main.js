/* ===================================================================
   PORTFOLIO · ABDOULRAZACK ABDILLAHI
   Sticky nav, mobile menu, reveal-on-scroll, magnetic cursor, scroll
   progress, project tilt, Three.js scenes (hero + skills)
   =================================================================== */

(() => {
    'use strict';

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const isMobile = window.matchMedia('(max-width: 720px)').matches;

    /* ----------------------------------------------------------------
       1 · Sticky nav background on scroll
    ---------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
        if (window.scrollY > 24) navbar.classList.add('is-scrolled');
        else navbar.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ----------------------------------------------------------------
       2 · Scroll progress bar
    ---------------------------------------------------------------- */
    const progressBar = document.getElementById('scrollProgress');
    const updateProgress = () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
        progressBar.style.width = `${Math.min(100, pct)}%`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    /* ----------------------------------------------------------------
       3 · Mobile menu toggle
    ---------------------------------------------------------------- */
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    const closeMenu = () => {
        navToggle.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };
    const openMenu = () => {
        navToggle.classList.add('is-open');
        mobileMenu.classList.add('is-open');
        navToggle.setAttribute('aria-expanded', 'true');
        mobileMenu.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    navToggle.addEventListener('click', () => {
        if (mobileMenu.classList.contains('is-open')) closeMenu();
        else openMenu();
    });
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) closeMenu();
    });

    /* ----------------------------------------------------------------
       4 · Reveal on scroll (cascade + staggered)
    ---------------------------------------------------------------- */
    const revealTargets = document.querySelectorAll(
        '.section-head, .about__visual, .about__text, .skill-card, .project, .timeline__item, .contact-form, .channel, .status, .footer__top'
    );
    revealTargets.forEach(el => el.classList.add('reveal'));

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const siblings = entry.target.parentElement?.querySelectorAll('.reveal');
                if (siblings) {
                    const index = Array.from(siblings).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${Math.min(index * 80, 320)}ms`;
                }
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(el => io.observe(el));

    /* ----------------------------------------------------------------
       5 · Custom cursor (desktop only) + magnetic effect
    ---------------------------------------------------------------- */
    const cursor = document.querySelector('.cursor');

    if (cursor && !isCoarsePointer) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let cursorVisible = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!cursorVisible) {
                cursor.style.opacity = '1';
                cursorVisible = true;
            }
        });
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorVisible = false;
        });

        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.18;
            cursorY += (mouseY - cursorY) * 0.18;
            cursor.style.transform = `translate(${cursorX - 14}px, ${cursorY - 14}px)`;
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        document.querySelectorAll('a, button, input, textarea, select, .project, .skill-card, .channel').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('is-active'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
        });
    }

    /* ----------------------------------------------------------------
       6 · Smooth scroll with nav offset
    ---------------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href.length <= 1) return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const navHeight = navbar.offsetHeight;
            const top = target.getBoundingClientRect().top + window.scrollY - navHeight + 2;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    /* ----------------------------------------------------------------
       7 · Active nav link
    ---------------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    const setActiveLink = () => {
        let current = '';
        const offset = navbar.offsetHeight + 80;
        sections.forEach(section => {
            const top = section.offsetTop - offset;
            if (window.scrollY >= top) current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`);
        });
    };
    window.addEventListener('scroll', setActiveLink, { passive: true });

    /* ----------------------------------------------------------------
       8 · Skill cards : radial light follows mouse
    ---------------------------------------------------------------- */
    if (!isCoarsePointer) {
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                card.style.setProperty('--mx', `${x}%`);
                card.style.setProperty('--my', `${y}%`);
            });
        });
    }

    /* ----------------------------------------------------------------
       9 · Project cards : 3D tilt on hover
    ---------------------------------------------------------------- */
    if (!isCoarsePointer && !prefersReduced) {
        document.querySelectorAll('.project').forEach(project => {
            const visual = project.querySelector('.project__visual');
            if (!visual) return;

            project.addEventListener('mousemove', (e) => {
                const rect = visual.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const cx = rect.width / 2;
                const cy = rect.height / 2;
                const rotateY = ((x - cx) / cx) * 6;
                const rotateX = -((y - cy) / cy) * 6;
                visual.style.transform = `translateY(-6px) perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            project.addEventListener('mouseleave', () => {
                visual.style.transform = '';
            });
        });
    }

    /* ----------------------------------------------------------------
       10 · Contact form
    ---------------------------------------------------------------- */
    const form = document.getElementById('contactForm');
    const hint = document.getElementById('formHint');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const subject = form.subject.value.trim();
            const message = form.message.value.trim();

            if (!name || !email || !message) {
                hint.textContent = 'Merci de remplir le nom, l\'email et le message.';
                hint.classList.remove('is-success');
                hint.classList.add('is-error');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                hint.textContent = 'L\'email semble invalide.';
                hint.classList.remove('is-success');
                hint.classList.add('is-error');
                return;
            }

            const finalSubject = subject || `Message de ${name}`;
            const body = `${message}\n\n—\n${name}\n${email}`;
            const mailto = `mailto:abdoul.abdillahi@gmail.com?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(body)}`;
            hint.textContent = 'Ouverture de votre client mail…';
            hint.classList.remove('is-error');
            hint.classList.add('is-success');
            window.location.href = mailto;
            setTimeout(() => {
                hint.textContent = 'Si rien ne s\'ouvre, écrivez directement à abdoul.abdillahi@gmail.com';
            }, 1800);
        });
    }

    /* ================================================================
       THREE.JS SCENES
       ================================================================ */
    if (typeof THREE === 'undefined' || prefersReduced) return;

    /* ----------------------------------------------------------------
       Scene 1 : HERO — wireframe sphere with displacement that follows mouse
       Inspired by editorial sites: a slowly rotating geometric form that
       reacts to cursor proximity.
    ---------------------------------------------------------------- */
    const initHeroScene = () => {
        const canvas = document.getElementById('heroCanvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 5.5;

        const renderer = new THREE.WebGLRenderer({
            canvas, alpha: true, antialias: true, powerPreference: 'high-performance'
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

        // ---- Object 1 : Icosahedron wireframe (main centerpiece) ----
        const ico = new THREE.IcosahedronGeometry(1.8, 1);
        const wire = new THREE.WireframeGeometry(ico);
        const lineMat = new THREE.LineBasicMaterial({
            color: 0xff5e3a,
            transparent: true,
            opacity: 0.6,
        });
        const wireMesh = new THREE.LineSegments(wire, lineMat);
        scene.add(wireMesh);

        // ---- Inner solid (low opacity, accent glow) ----
        const innerMat = new THREE.MeshBasicMaterial({
            color: 0xff5e3a,
            transparent: true,
            opacity: 0.04,
            wireframe: false,
        });
        const innerMesh = new THREE.Mesh(ico, innerMat);
        scene.add(innerMesh);

        // ---- Outer particles ring ----
        const particleCount = isMobile ? 80 : 200;
        const particleGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const r = 3 + Math.random() * 2.5;
            const theta = Math.random() * Math.PI * 2;
            const phi = (Math.random() - 0.5) * Math.PI * 0.6;
            positions[i * 3] = r * Math.cos(theta) * Math.cos(phi);
            positions[i * 3 + 1] = r * Math.sin(phi);
            positions[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi);
        }
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particleMat = new THREE.PointsMaterial({
            color: 0xd4a574,
            size: 0.025,
            transparent: true,
            opacity: 0.7,
            sizeAttenuation: true,
        });
        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        // ---- Mouse tracking ----
        let mouseX = 0, mouseY = 0;
        let targetRotX = 0, targetRotY = 0;
        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        }, { passive: true });

        // ---- Resize ----
        const onResize = () => {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h, false);
        };
        window.addEventListener('resize', onResize);

        // ---- Animation loop ----
        let frame = 0;
        const animate = () => {
            frame++;
            // Smooth follow mouse
            targetRotX += (mouseY * 0.3 - targetRotX) * 0.04;
            targetRotY += (mouseX * 0.3 - targetRotY) * 0.04;

            wireMesh.rotation.x = targetRotX + frame * 0.001;
            wireMesh.rotation.y = targetRotY + frame * 0.0015;
            innerMesh.rotation.x = wireMesh.rotation.x;
            innerMesh.rotation.y = wireMesh.rotation.y;

            particles.rotation.y = frame * 0.0008;
            particles.rotation.x = frame * 0.0004;

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        // Position : slightly off-center to the right for editorial composition
        wireMesh.position.set(1.5, -0.2, 0);
        innerMesh.position.copy(wireMesh.position);
    };

    /* ----------------------------------------------------------------
       Scene 2 : SKILLS — exploded view of floating tech blocks
       Cubes with the names of the technologies, exploding outward
       and slowly drifting in 3D space.
    ---------------------------------------------------------------- */
    const initSkillsScene = () => {
        const canvas = document.getElementById('skillsCanvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 8;

        const renderer = new THREE.WebGLRenderer({
            canvas, alpha: true, antialias: true, powerPreference: 'high-performance'
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

        // ---- Floating geometric cluster ----
        const shapes = [];
        const COUNT = isMobile ? 8 : 14;
        const palette = [0xff5e3a, 0xd4a574, 0x4dd0c4, 0xff7e5f, 0xb0a99c];

        for (let i = 0; i < COUNT; i++) {
            // Variety of geometries
            const r = Math.random();
            let geo;
            if (r < 0.3) geo = new THREE.BoxGeometry(0.6, 0.6, 0.6);
            else if (r < 0.6) geo = new THREE.TetrahedronGeometry(0.55);
            else if (r < 0.85) geo = new THREE.OctahedronGeometry(0.5);
            else geo = new THREE.SphereGeometry(0.35, 8, 8);

            const wire = new THREE.WireframeGeometry(geo);
            const mat = new THREE.LineBasicMaterial({
                color: palette[i % palette.length],
                transparent: true,
                opacity: 0.35,
            });
            const mesh = new THREE.LineSegments(wire, mat);

            // Spread on a sphere
            const phi = Math.acos(1 - 2 * (i + 0.5) / COUNT);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;
            const radius = 4 + Math.random() * 1.5;
            mesh.position.x = radius * Math.cos(theta) * Math.sin(phi);
            mesh.position.y = radius * Math.sin(theta) * Math.sin(phi);
            mesh.position.z = radius * Math.cos(phi) - 1;

            mesh.userData.rotSpeed = {
                x: (Math.random() - 0.5) * 0.005,
                y: (Math.random() - 0.5) * 0.005,
                z: (Math.random() - 0.5) * 0.003,
            };
            mesh.userData.driftPhase = Math.random() * Math.PI * 2;

            scene.add(mesh);
            shapes.push(mesh);
        }

        // ---- Resize ----
        const onResize = () => {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h, false);
        };
        window.addEventListener('resize', onResize);

        // ---- Render only when section is visible (perf) ----
        let visible = false;
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const obs = new IntersectionObserver(
                ([entry]) => { visible = entry.isIntersecting; },
                { threshold: 0.05 }
            );
            obs.observe(skillsSection);
        }

        let frame = 0;
        const animate = () => {
            requestAnimationFrame(animate);
            if (!visible) return;
            frame++;
            shapes.forEach(s => {
                s.rotation.x += s.userData.rotSpeed.x;
                s.rotation.y += s.userData.rotSpeed.y;
                s.rotation.z += s.userData.rotSpeed.z;
                // Subtle floating drift
                s.position.y += Math.sin(frame * 0.008 + s.userData.driftPhase) * 0.002;
            });
            scene.rotation.y = frame * 0.0008;
            renderer.render(scene, camera);
        };
        animate();
    };

    // Lazy-init Three.js scenes after the page is laid out
    requestAnimationFrame(() => {
        try { initHeroScene(); } catch (e) { console.warn('Hero scene failed:', e); }
        try { initSkillsScene(); } catch (e) { console.warn('Skills scene failed:', e); }
    });
})();
