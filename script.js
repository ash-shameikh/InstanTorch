document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SMOOTH SCROLLING & PERFORMANCE ---
    const lenis = new Lenis({ lerp: 0.1 });
    let scrollTimeout;
    const galleryItemsForAnimation = document.querySelectorAll('.gallery-item');

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', () => {
        document.body.classList.add('is-scrolling');
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => { document.body.classList.remove('is-scrolling'); }, 250);

        if (window.innerWidth > 768) {
            const parallaxStrength = 15;
            galleryItemsForAnimation.forEach(item => {
                const image = item.querySelector('img');
                const rect = item.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0 && image) {
                    const progress = (rect.top + rect.height) / (window.innerHeight + rect.height);
                    const y = (progress - 0.5) * parallaxStrength * -2;
                    image.style.transform = `translateY(${y}px)`;
                }
            });
        }
    });

    if (window.innerWidth <= 768) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, { threshold: 0.1 });
        galleryItemsForAnimation.forEach(item => {
            observer.observe(item);
        });
    }

    // --- 2. LANGUAGE & THEME ENGINE ---
    const translations = {
        en: {
            nav_home: "Home", nav_gallery: "Services", nav_locations: "Our Locations",
            brand_name_part1: "INSTANT", brand_name_part2: " TORCH",
            welcome_message: "Welcome To",
            hero_title: "Your First Line of Defense",
            hero_subtitle: "Protecting Riyadh, Saving Lives",
            hero_button: "View Our Services", gallery_title: "Our Services",
            g1_title: "Fire Suppression Systems", g1_desc: "Advanced sprinkler and gas suppression systems for all property types.",
            g2_title: "Fire Alarm Installation", g2_desc: "Installation and maintenance of reliable fire detection and alarm systems.",
            g3_title: "Fire Extinguisher Maintenance", g3_desc: "Regular inspection and refilling services for all types of extinguishers.",
            g4_title: "Emergency Evacuation Plans", g4_desc: "Custom-designed escape plans and signage for commercial and residential buildings.",
            g5_title: "Fire Safety Training", g5_desc: "Comprehensive training programs for your staff on fire prevention and response.",
            g6_title: "Hydrant Systems", g6_desc: "Installation and testing of wet and dry riser hydrant systems.",
            loc1_button: "Headquarters", loc2_button: "Central Branch", loc3_button: "Industrial Zone",
            address_title: "Address:",
            loc1_address: "King Fahd Rd, Al Sahafah, Riyadh, Saudi Arabia",
            loc2_address: "King Abdulaziz Rd, Al Hamra, Riyadh, Saudi Arabia",
            loc3_address: "Industrial City 2, Riyadh, Saudi Arabia",
            call_us: "Call Us", whatsapp: "WhatsApp", follow_us: "Follow Us",
            footer_text: `© ${new Date().getFullYear()} INSTANT TORCH. All Rights Reserved.`,
        },
        ar: {
            nav_home: "الرئيسية", nav_gallery: "خدماتنا", nav_locations: "فروعنا",
            brand_name_part1: "الشعلة", brand_name_part2: " الفورية",
            welcome_message: "مرحباً بكم في",
            welcome_message1: "",
            hero_title: "خط دفاعك الأول",
            hero_subtitle: "حماية الرياض، إنقاذ الأرواح",
            hero_button: "شاهد خدماتنا", gallery_title: "خدماتنا",
            g1_title: "أنظمة إطفاء الحريق", g1_desc: "أنظمة رشاشات وأنظمة إخماد متقدمة لجميع أنواع الممتلكات.",
            g2_title: "تركيب أنظمة الإنذار", g2_desc: "تركيب وصيانة أنظمة الكشف عن الحرائق والإنذار الموثوقة.",
            g3_title: "صيانة طفايات الحريق", g3_desc: "خدمات فحص وإعادة تعبئة دورية لجميع أنواع الطفايات.",
            g4_title: "خطط الإخلاء في حالات الطوارئ", g4_desc: "خطط إخلاء مخصصة ولوحات إرشادية للمباني التجارية والسكنية.",
            g5_title: "التدريب على السلامة من الحرائق", g5_desc: "برامج تدريب شاملة لموظفيك على الوقاية من الحرائق والاستجابة لها.",
            g6_title: "أنظمة فوهات الحريق", g6_desc: "تركيب واختبار أنظمة فوهات الحريق الرطبة والجافة.",
            loc1_button: "المقر الرئيسي", loc2_button: "الفرع المركزي", loc3_button: "المنطقة الصناعية",
            address_title: "العنوان:",
            loc1_address: "طريق الملك فهد، حي الصحافة، الرياض، المملكة العربية السعودية",
            loc2_address: "طريق الملك عبدالعزيز، حي الحمراء، الرياض، المملكة العربية السعودية",
            loc3_address: "المدينة الصناعية الثانية، الرياض، المملكة العربية السعودية",
            call_us: "اتصل بنا", whatsapp: "واتساب", follow_us: "تابعنا",
            footer_text: `© ${new Date().getFullYear()} الشعلة الفورية. جميع الحقوق محفوظة.`,
        }
    };

    let typingInterval;
    let typingTimeout;

    function startTypewriter(element, text) {
        element.textContent = '';
        element.classList.add('is-typing');
        let i = 0;
        typingInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                element.classList.remove('is-typing');
                typingTimeout = setTimeout(() => startTypewriter(element, text), 2000);
            }
        }, 120);
    }

    const setLanguage = (lang) => {
        if (!lang) lang = 'en';
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem('language', lang);

        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                if (key !== 'hero_title') {
                    element.textContent = translations[lang][key];
                }
            }
        });

        const heroTitle = document.querySelector('h1[data-key="hero_title"]');
        if (heroTitle) {
            clearInterval(typingInterval);
            clearTimeout(typingTimeout);

            if (lang === 'ar') {
                startTypewriter(heroTitle, translations.ar.hero_title);
            } else {
                heroTitle.classList.remove('is-typing');
                heroTitle.textContent = translations.en.hero_title;
            }
        }

        document.querySelectorAll('.lang-option').forEach(opt => opt.classList.toggle('active', opt.dataset.lang === lang));
    };

    const themeSwitcher = document.getElementById('theme-switcher');
    const applyTheme = (theme) => {
        document.body.classList.toggle('light-mode', theme === 'light');
        
        // Dynamically change the video source based on the theme
        const videoElement = document.getElementById('background-video');
        if (videoElement) {
            const videoSource = videoElement.querySelector('source');
            if (videoSource) {
                videoSource.src = theme === 'light' ? 'videos/water.mp4' : 'videos/fire.mp4';
                videoElement.load(); // Reload the video with the new source
            }
        }
    };

    const langSwitcher = document.getElementById('lang-switcher');
    if (langSwitcher) {
        langSwitcher.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = e.target.closest('.lang-option')?.dataset.lang;
            if (lang && lang !== localStorage.getItem('language')) {
                setLanguage(lang);
            }
        });
    }

    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-mode');
            const newTheme = isLight ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme); // Call applyTheme to update the video
        });
    }

    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedLang = localStorage.getItem('language') || 'en';
    applyTheme(savedTheme);
    setLanguage(savedLang);

    // --- HERO SLIDER ---
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        const slides = heroSlider.querySelectorAll('.slide');
        const dotsContainer = document.querySelector('.hero-slider-dots');
        let currentSlide = 0;
        let slideInterval;
        if (slides.length > 1 && dotsContainer) {
            slides.forEach((slide, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
            const dots = dotsContainer.querySelectorAll('.dot');
            const goToSlide = (slideIndex) => {
                if (slideIndex === currentSlide) return;
                slides[currentSlide].classList.remove('active');
                dots[currentSlide].classList.remove('active');
                currentSlide = slideIndex;
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
                resetInterval();
            };
            const nextSlide = () => goToSlide((currentSlide + 1) % slides.length);
            const resetInterval = () => { clearInterval(slideInterval); slideInterval = setInterval(nextSlide, 5000); };
            slideInterval = setInterval(nextSlide, 5000);
        }
    }

    // --- GALLERY (SERVICES) MODAL ---
    const modal = document.getElementById('gallery-modal');
    if (modal) {
        const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const closeButton = modal.querySelector('.close-button');
        let currentIndex = 0;

        const updateModalContent = (index) => {
            if (!galleryItems[index]) return;
            const item = galleryItems[index];
            const img = item.querySelector('img');
            const titleEl = item.querySelector('h3');
            const descEl = item.querySelector('p');

            modalImage.style.opacity = 0;
            setTimeout(() => {
                if (img) modalImage.src = img.src;
                if (titleEl) modalTitle.textContent = titleEl.textContent;
                if (descEl) modalDescription.textContent = descEl.textContent;
                modalImage.style.opacity = 1;
            }, 300);

            currentIndex = index;
        };

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                updateModalContent(index);
                modal.classList.add('show');
            });
        });

        const closeModal = () => modal.classList.remove('show');
        if (closeButton) closeButton.addEventListener('click', closeModal);
        modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
        window.addEventListener('keydown', e => {
            if (modal.classList.contains('show')) {
                if (e.key === 'Escape') closeModal();
            }
        });
    }

    // --- LOCATION TABS ---
    const tabsContainer = document.querySelector('.tabs');
    if (tabsContainer) {
        const tabs = tabsContainer.querySelectorAll('.tab-button');
        const tabPanes = document.querySelectorAll('.tab-pane');
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                const targetPane = document.querySelector(this.dataset.target);
                if (targetPane) {
                    tabPanes.forEach(p => p.classList.remove('active'));
                    targetPane.classList.add('active');
                }
            });
        });
    }

    // --- NAVIGATION ---
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if(targetElement) lenis.scrollTo(targetElement, { offset: 0, duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        });
    });

    // --- ACTIVE LINK HIGHLIGHTING ON SCROLL ---
    const sections = document.querySelectorAll('section[id]');
    if (sections.length > 0 && navLinks.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: "-50% 0px -50% 0px" });
        sections.forEach(section => observer.observe(section));
    }
});