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
            page_title: "INSTANT TORCH - Firefighting Solutions",
            nav_home: "Home", nav_gallery: "Services", nav_locations: "Our Locations",
            brand_name_part1: "INSTANT", brand_name_part2: " TORCH",
            welcome_message: "Welcome To",
            welcome_message1: "Your First Line of Defense",
            hero_title: "Protecting, Saving Lives",
            hero_subtitle: "When Every Second Counts – We’re Already There.",
            hero_button: "View Our Services",
            services_title: "Our Services",
            service1_title: "Fire Extinguisher Supply & Maintenance", service1_desc: "Offering a full range of fire extinguishers and providing regular maintenance to ensure they are always ready for use.",
            service2_title: "Fire Alarm Systems", service2_desc: "Installing and servicing advanced fire alarm and detection systems for both commercial and residential properties.",
            service3_title: "Fire Pump Stations", service3_desc: "Designing, installing, and testing fire pump stations to guarantee effective water supply for fire suppression systems.",
            service4_title: "Fire Hose Reels & Cabinets", service4_desc: "Providing high-quality fire hose reels and cabinets that meet all safety standards for rapid response.",
            service5_title: "Fire Suppression Systems", service5_desc: "Specializing in the installation and maintenance of various fire suppression systems, including CO2 and FM200 systems.",
            service6_title: "Safety & Consulting", service6_desc: "Offering expert safety audits, risk assessments, and consulting services to ensure your property is compliant and secure.",
            equipment_gallery_title: "Our Fire Equipment",
            extinguisher_title: "Fire Extinguishers",
            extinguisher_desc: "We provide a wide range of fire extinguishers for all types of fires, including CO2, water, and powder, ensuring optimal safety for any environment.",
            sprinkler_title: "Sprinkler Systems",
            sprinkler_desc: "Automatic sprinkler systems designed to detect and suppress fires in their early stages, providing 24/7 protection.",
            pump_title: "Fire Pumps",
            pump_desc: "High-capacity fire pumps that ensure a powerful and reliable water supply to all fire suppression and sprinkler systems.",
            panel_title: "Fire Alarm Panels",
            panel_desc: "Centralized control panels for fire alarm systems, providing real-time monitoring and swift emergency response management.",
            clients_title: "Our Clients",
            clients_intro_text: "We are proud to serve a diverse range of clients across Saudi Arabia, providing trusted fire safety solutions that protect their assets and people. Our client list includes leaders in industrial, commercial, and government sectors.",
            loc1_button: "Headquarters", loc2_button: "Central Branch", loc3_button: "Industrial Zone",
            address_title: "Address:",
            loc1_address: "King Fahd Rd, Al Sahafah, Riyadh, Saudi Arabia",
            loc2_address: "King Abdulaziz Rd, Al Hamra, Riyadh, Saudi Arabia",
            loc3_address: "Industrial City 2, Riyadh, Saudi Arabia",
            call_us: "Call Us", whatsapp: "WhatsApp", follow_us: "Follow Us",
            footer_text: `© ${new Date().getFullYear()} INSTANT TORCH. All Rights Reserved.`,
        },
        ar: {
            page_title: "الشعلة السريعة - حلول مكافحة الحرائق",
            nav_home: "الرئيسية", nav_gallery: "خدماتنا", nav_locations: "فروعنا",
            brand_name_part1: "الشعلة", brand_name_part2: " الفورية",
            welcome_message: "مرحباً بكم في",
            welcome_message1: "خط دفاعك الأول",
            hero_title: "حماية الرياض، إنقاذ الأرواح",
            hero_subtitle: "عندما يكون كل ثانية مهمة – نحن هناك بالفعل.",
            hero_button: "شاهد خدماتنا",
            services_title: "خدماتنا",
            service1_title: "توريد وصيانة طفايات الحريق", service1_desc: "نوفر مجموعة كاملة من طفايات الحريق ونقدم صيانة دورية لضمان جاهزيتها الدائمة للاستخدام.",
            service2_title: "أنظمة إنذار الحريق", service2_desc: "تركيب وصيانة أنظمة إنذار وكشف الحريق المتقدمة للممتلكات التجارية والسكنية.",
            service3_title: "محطات مضخات الحريق", service3_desc: "تصميم وتركيب واختبار محطات مضخات الحريق لضمان إمداد فعال للمياه لأنظمة إخماد الحريق.",
            service4_title: "بكرات وخزانات خراطيم الحريق", service4_desc: "توفير بكرات وخزانات خراطيم حريق عالية الجودة تتوافق مع جميع معايير السلامة للاستجابة السريعة.",
            service5_title: "أنظمة إخماد الحريق", service5_desc: "متخصصون في تركيب وصيانة مختلف أنظمة إخماد الحريق، بما في ذلك أنظمة ثاني أكسيد الكربون و FM200.",
            service6_title: "السلامة والاستشارات", service6_desc: "تقديم خبرة في تدقيق السلامة وتقييم المخاطر وخدمات استشارية لضمان أن ممتلكاتك آمنة ومتوافقة.",
            equipment_gallery_title: "معدات مكافحة الحرائق",
            extinguisher_title: "طفايات الحريق",
            extinguisher_desc: "نوفر مجموعة واسعة من طفايات الحريق لجميع أنواع الحرائق، بما في ذلك طفايات ثاني أكسيد الكربون، الماء، والبودرة، لضمان السلامة المثلى في أي بيئة.",
            sprinkler_title: "أنظمة الرشاشات",
            sprinkler_desc: "أنظمة رشاشات أوتوماتيكية مصممة للكشف عن الحرائق وإخمادها في مراحلها المبكرة، مما يوفر حماية على مدار الساعة.",
            pump_title: "مضخات الحريق",
            pump_desc: "مضخات حريق عالية السعة تضمن إمدادًا قويًا وموثوقًا للمياه لجميع أنظمة إخماد الحرائق والرشاشات.",
            panel_title: "لوحات إنذار الحريق",
            panel_desc: "لوحات تحكم مركزية لأنظمة إنذار الحريق، توفر مراقبة فورية وإدارة سريعة للاستجابة للطوارئ.",
            clients_title: "عملاؤنا",
            clients_intro_text: "نفخر بخدمة مجموعة متنوعة من العملاء في جميع أنحاء المملكة العربية السعودية، وتقديم حلول موثوقة للسلامة من الحرائق تحمي أصولهم وأفرادهم. تضم قائمة عملائنا روادًا في القطاعات الصناعية والتجارية والحكومية.",
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

    // --- GALLERY (EQUIPMENT) MODAL ---
    const equipmentModal = document.getElementById('gallery-modal');
    if (equipmentModal) {
        const galleryItems = document.querySelectorAll('#gallery .gallery-item');
        const modalImage = equipmentModal.querySelector('#modal-image');
        const modalTitle = equipmentModal.querySelector('#modal-title');
        const modalDescription = equipmentModal.querySelector('#modal-description');
        const closeButton = equipmentModal.querySelector('.close-button');

        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const imageUrl = item.getAttribute('data-image');
                const titleKey = item.getAttribute('data-title-key');
                const descKey = item.getAttribute('data-desc-key');
                const lang = localStorage.getItem('language') || 'en';

                // Populate the modal with image and translated text
                modalImage.src = imageUrl;
                modalTitle.textContent = translations[lang][titleKey];
                modalDescription.textContent = translations[lang][descKey];

                // Show the modal
                equipmentModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeModal = () => {
            equipmentModal.classList.remove('show');
            document.body.style.overflow = '';
        };

        if (closeButton) closeButton.addEventListener('click', closeModal);
        window.addEventListener('click', (e) => {
            if (e.target === equipmentModal) {
                closeModal();
            }
        });
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && equipmentModal.classList.contains('show')) {
                closeModal();
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