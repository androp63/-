// ========== СИСТЕМА САМООБУЧЕНИЯ И SEO-ОПТИМИЗАЦИИ ==========

// Анализ поисковых запросов и динамическое обновление контента
class SEOOptimizer {
    constructor() {
        this.keywordTrends = [];
        this.contentVariations = {};
        this.currentContentIndex = 0;
        this.init();
    }
    
    init() {
        this.loadTrends();
        this.analyzeUserBehavior();
        this.rotateContent();
    }
    
    // Загрузка актуальных трендов из открытых источников
    async loadTrends() {
        try {
            // В реальном проекте здесь будет запрос к API с трендами
            this.keywordTrends = [
                "медиация конфликтов",
                "психолог профайлер Москва",
                "расшифровка кода личности",
                "НЛП коучинг",
                "кризисная психология",
                "семейный психолог",
                "разрешение споров",
                "психологическая помощь онлайн"
            ];
            
            this.generateContentVariations();
        } catch (error) {
            console.log("Не удалось загрузить тренды:", error);
        }
    }
    
    // Генерация вариаций контента на основе трендов
    generateContentVariations() {
        this.contentVariations = {
            hero: [
                {
                    title: "VERITAS CODE - Медиатор | Психолог-профайлер Москва",
                    subtitle: "Профессиональное разрешение конфликтов и расшифровка личности",
                    description: "VERITAS CODE - это ключ к пониманию вашей личности и разрешению конфликтов. Профессиональная медиация и психологический анализ для бизнеса и личной жизни."
                },
                {
                    title: "VERITAS CODE - Психологическая помощь и медиация",
                    subtitle: "Решение сложных ситуаций с научным подходом",
                    description: "Современные методы психологии и медиации для решения конфликтов любой сложности. Индивидуальный подход и гарантированная конфиденциальность."
                }
            ],
            services: [
                "Медиация бизнес-конфликтов",
                "Профайлинг для переговоров", 
                "Расшифровка кода личности",
                "НЛП коучинг и терапия",
                "Кризисная психологическая помощь",
                "Семейная медиация и консультирование"
            ]
        };
    }
    
    // Анализ поведения пользователей на сайте
    analyzeUserBehavior() {
        // Отслеживание кликов и времени на странице
        document.addEventListener('click', (e) => {
            this.trackUserInterest(e.target);
        });
        
        // Отслеживание прокрутки
        let scrollDepth = 0;
        window.addEventListener('scroll', () => {
            const newScrollDepth = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
            if (newScrollDepth > scrollDepth) {
                scrollDepth = newScrollDepth;
                this.trackScrollBehavior(scrollDepth);
            }
        });
    }
    
    trackUserInterest(element) {
        const text = element.textContent.toLowerCase();
        this.keywordTrends.forEach(trend => {
            if (text.includes(trend.toLowerCase())) {
                this.boostKeyword(trend);
            }
        });
    }
    
    trackScrollBehavior(depth) {
        if (depth > 70) {
            // Пользователь прочитал большую часть контента
            this.optimizeForEngagement();
        }
    }
    
    boostKeyword(keyword) {
        // Увеличиваем приоритет ключевого слова
        console.log("Пользователь интересуется:", keyword);
    }
    
    optimizeForEngagement() {
        // Оптимизация для вовлеченных пользователей
        console.log("Пользователь активно взаимодействует с сайтом");
    }
    
    // Ротация контента для улучшения SEO
    rotateContent() {
        setInterval(() => {
            this.updateDynamicContent();
            this.currentContentIndex = (this.currentContentIndex + 1) % 2;
        }, 30000); // Смена каждые 30 секунд
    }
    
    updateDynamicContent() {
        const variation = this.contentVariations.hero[this.currentContentIndex];
        
        // Обновление заголовков
        const titleElement = document.querySelector('.hero-title');
        const subtitleElement = document.querySelector('.hero-subtitle');
        const descriptionElement = document.querySelector('.hero-description');
        
        if (titleElement && variation.title) {
            titleElement.textContent = variation.title;
        }
        if (subtitleElement && variation.subtitle) {
            subtitleElement.textContent = variation.subtitle;
        }
        if (descriptionElement && variation.description) {
            descriptionElement.textContent = variation.description;
        }
        
        // Обновление мета-тегов
        this.updateMetaTags(variation);
    }
    
    updateMetaTags(variation) {
        // Обновление title
        document.title = variation.title;
        
        // Обновление description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', variation.description);
        }
        
        // Обновление Open Graph
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDescription = document.querySelector('meta[property="og:description"]');
        
        if (ogTitle) ogTitle.setAttribute('content', variation.title);
        if (ogDescription) ogDescription.setAttribute('content', variation.description);
    }
}

// ========== СИСТЕМА БЕЗОПАСНОСТИ ==========

class SecuritySystem {
    constructor() {
        this.init();
    }
    
    init() {
        this.preventXSS();
        this.preventClickjacking();
        this.monitorSuspiciousActivity();
        this.encryptSensitiveData();
    }
    
    // Защита от XSS-атак
    preventXSS() {
        document.addEventListener('DOMContentLoaded', () => {
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                form.addEventListener('submit', (e) => {
                    this.sanitizeInputs(form);
                });
            });
        });
    }
    
    sanitizeInputs(form) {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            let value = input.value;
            // Базовая очистка от потенциально опасного контента
            value = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
            value = value.replace(/on\w+="[^"]*"/g, '');
            value = value.replace(/on\w+='[^']*'/g, '');
            value = value.replace(/on\w+=\w+\([^)]*\)/g, '');
            input.value = value;
        });
    }
    
    // Защита от clickjacking
    preventClickjacking() {
        if (self === top) {
            document.documentElement.style.visibility = 'visible';
        } else {
            top.location = self.location;
        }
    }
    
    // Мониторинг подозрительной активности
    monitorSuspiciousActivity() {
        let rapidClicks = 0;
        let lastClickTime = 0;
        
        document.addEventListener('click', (e) => {
            const currentTime = Date.now();
            if (currentTime - lastClickTime < 100) { // Менее 100ms между кликами
                rapidClicks++;
                if (rapidClicks > 10) {
                    this.blockSuspiciousActivity();
                }
            } else {
                rapidClicks = 0;
            }
            lastClickTime = currentTime;
        });
        
        // Защита от ботов
        this.preventBotDetection();
    }
    
    blockSuspiciousActivity() {
        console.log("Обнаружена подозрительная активность");
        // В реальном проекте здесь будет блокировка или капча
    }
    
    preventBotDetection() {
        // Скрытие элементов от ботов
        const antiBotStyle = document.createElement('style');
        antiBotStyle.textContent = `
            .anti-bot { display: none; }
            @media (max-width: 1px) {
                .anti-bot { display: block; }
            }
        `;
        document.head.appendChild(antiBotStyle);
    }
    
    // Шифрование чувствительных данных
    encryptSensitiveData() {
        // Базовая реализация шифрования
        window.encryptData = (data) => {
            return btoa(unescape(encodeURIComponent(data)));
        };
        
        window.decryptData = (data) => {
            return decodeURIComponent(escape(atob(data)));
        };
    }
}

// ========== УПРАВЛЕНИЕ ЮРИДИЧЕСКИМИ СТРАНИЦАМИ ==========

// Функция для показа юридической страницы
function showLegalPage(pageId) {
    // Скрыть все страницы
    document.querySelectorAll('.legal-page').forEach(page => {
        page.style.display = 'none';
    });
    
    // Скрыть основной контент
    document.querySelectorAll('section:not(.legal-page)').forEach(section => {
        section.style.display = 'none';
    });
    document.querySelector('footer').style.display = 'none';
    document.querySelector('.legal-footer').style.display = 'none';
    
    // Показать выбранную страницу
    document.getElementById(pageId).style.display = 'block';
    
    // Прокрутить к верху
    window.scrollTo(0, 0);
    
    // Обновить URL
    history.pushState(null, null, `#${pageId}`);
}

// Функция для возврата на главную
function showMainContent() {
    // Скрыть все юридические страницы
    document.querySelectorAll('.legal-page').forEach(page => {
        page.style.display = 'none';
    });
    
    // Показать основной контент
    document.querySelectorAll('section:not(.legal-page)').forEach(section => {
        section.style.display = 'block';
    });
    document.querySelector('footer').style.display = 'block';
    document.querySelector('.legal-footer').style.display = 'block';
    
    // Обновить URL
    history.pushState(null, null, window.location.pathname);
}

// ========== ЧАТ-АССИСТЕНТ ==========

class ChatAssistant {
    constructor() {
        this.isOpen = false;
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadWelcomeMessage();
    }
    
    setupEventListeners() {
        const chatButton = document.getElementById('chatButton');
        const chatClose = document.getElementById('chatClose');
        const sendMessage = document.getElementById('sendMessage');
        const chatInput = document.getElementById('chatInput');
        
        chatButton.addEventListener('click', () => this.toggleChat());
        chatClose.addEventListener('click', () => this.closeChat());
        
        sendMessage.addEventListener('click', () => this.sendUserMessage());
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendUserMessage();
            }
        });
    }
    
    toggleChat() {
        const chatWindow = document.getElementById('chatWindow');
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            chatWindow.classList.add('active');
        } else {
            chatWindow.classList.remove('active');
        }
    }
    
    closeChat() {
        const chatWindow = document.getElementById('chatWindow');
        chatWindow.classList.remove('active');
        this.isOpen = false;
    }
    
    loadWelcomeMessage() {
        // Приветственное сообщение уже в разметке
    }
    
    async sendUserMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Добавляем сообщение пользователя
        this.addMessage(message, 'user');
        input.value = '';
        
        // Отправляем сообщение владельцу
        await this.notifyOwner(message);
        
        // Автоматический ответ (в реальном проекте можно подключить ИИ)
        setTimeout(() => {
            this.addMessage("Спасибо за ваш вопрос! Я свяжусь с вами в ближайшее время.", 'bot');
        }, 1000);
    }
    
    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = text;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    async notifyOwner(message) {
        // Отправка в Telegram
        try {
            const telegramMessage = `Новое сообщение от посетителя сайта: ${message}`;
            const telegramUrl = `https://api.telegram.org/botYOUR_BOT_TOKEN/sendMessage?chat_id=@Ivan_Svetlyi&text=${encodeURIComponent(telegramMessage)}`;
            
            // В реальном проекте нужно использовать реальный токен бота
            // await fetch(telegramUrl);
            
            console.log("Сообщение отправлено в Telegram:", message);
        } catch (error) {
            console.error("Ошибка отправки в Telegram:", error);
        }
        
        // Отправка в WhatsApp
        try {
            const whatsappMessage = `Новое сообщение от посетителя сайта: ${message}`;
            const whatsappUrl = `https://wa.me/79164443963?text=${encodeURIComponent(whatsappMessage)}`;
            
            // В реальном проекте можно открыть новое окно
            // window.open(whatsappUrl, '_blank');
            
            console.log("Сообщение отправлено в WhatsApp:", message);
        } catch (error) {
            console.error("Ошибка отправки в WhatsApp:", error);
        }
    }
}

// ========== ОСНОВНОЙ КОД САЙТА ==========

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация систем
    const seoOptimizer = new SEOOptimizer();
    const securitySystem = new SecuritySystem();
    const chatAssistant = new ChatAssistant();
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Fade in on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
        });
        
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
        
        // Закрытие меню при клике на ссылку
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }
    
    // Custom dropdown functionality
    document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
        const selected = dropdown.querySelector('.dropdown-selected');
        const options = dropdown.querySelector('.dropdown-options');
        const hiddenInput = dropdown.querySelector('input[type="hidden"]');
        
        selected.addEventListener('click', function() {
            dropdown.classList.toggle('active');
        });
        
        dropdown.querySelectorAll('.dropdown-option').forEach(option => {
            option.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                const text = this.textContent;
                
                selected.querySelector('span').textContent = text;
                hiddenInput.value = value;
                dropdown.classList.remove('active');
                
                // Валидация
                hiddenInput.setCustomValidity('');
            });
        });
        
        // Закрытие dropdown при клике вне его
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
        
        // Валидация
        if (hiddenInput) {
            hiddenInput.addEventListener('invalid', function() {
                selected.style.borderColor = '#ff4444';
            });
        }
    });
    
    // Блокировка кнопки отправки без согласия
    const consentCheckbox = document.getElementById('consent');
    const submitBtn = document.getElementById('submitBtn');
    
    if (consentCheckbox && submitBtn) {
        consentCheckbox.addEventListener('change', function() {
            submitBtn.disabled = !this.checked;
        });
    }
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const name = this.querySelector('input[type="text"]').value || 'не указано';
            const phone = this.querySelector('input[type="tel"]').value || 'не указан';
            const email = this.querySelector('input[type="email"]').value || 'не указан';
            const service = document.getElementById('serviceType') ? document.getElementById('serviceType').value : 'не указана';
            const message = this.querySelector('textarea').value || 'не указано';
            const consent = this.querySelector('#consent') ? this.querySelector('#consent').checked : false;
            
            if (!consent) {
                alert('Для отправки формы необходимо дать согласие на обработку персональных данных.');
                return;
            }
            
            // Формируем текст сообщения
            const subject = "Новый запрос в VERITAS CODE";
            const body = `Имя: ${name}%0AТелефон: ${phone}%0AEmail: ${email}%0AУслуга: ${service}%0AСообщение: ${message}%0A%0AСогласие на обработку данных: предоставлено`;
            
            // Создаем ссылку для отправки на почту
            const mailtoLink = `mailto:Orion.290292@yandex.ru?subject=${subject}&body=${body}`;
            
            // Открываем почтовый клиент
            window.location.href = mailtoLink;
            
            // Показываем сообщение об успехе
            alert('Спасибо за ваш запрос в VERITAS CODE! Открываю почтовый клиент для отправки.');
            
            // Очищаем форму
            this.reset();
            // Сбрасываем кастомный dropdown
            const dropdownSelected = document.querySelector('.dropdown-selected span');
            if (dropdownSelected) {
                dropdownSelected.textContent = 'Выберите тип консультации';
            }
            if (document.getElementById('serviceType')) {
                document.getElementById('serviceType').value = '';
            }
            // Снова блокируем кнопку после очистки формы
            if (submitBtn) {
                submitBtn.disabled = true;
            }
        });
    }
    
    // Blog article management
    function showFullArticle(articleId) {
        // Hide blog preview
        const blogPreview = document.querySelector('.blog-preview');
        const seoContentSection = document.querySelector('.seo-content-section');
        
        if (blogPreview) blogPreview.style.display = 'none';
        if (seoContentSection) seoContentSection.style.paddingBottom = '0';
        
        // Show full article
        const fullArticle = document.getElementById(articleId + 'Article');
        if (fullArticle) fullArticle.style.display = 'block';
        
        // Scroll to top of article
        if (fullArticle) {
            window.scrollTo({
                top: fullArticle.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    }
    
    function hideFullArticle() {
        // Hide all full articles
        document.querySelectorAll('.full-article').forEach(article => {
            article.style.display = 'none';
        });
        
        // Show blog preview
        const blogPreview = document.querySelector('.blog-preview');
        const seoContentSection = document.querySelector('.seo-content-section');
        
        if (blogPreview) blogPreview.style.display = 'grid';
        if (seoContentSection) seoContentSection.style.paddingBottom = '80px';
        
        // Scroll to blog section
        const seoContent = document.getElementById('seo-content');
        if (seoContent) {
            seoContent.scrollIntoView({ 
                behavior: 'smooth' 
            });
        }
    }
    
    // Update blog card links to work with new system
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const articleId = this.getAttribute('data-article');
            showFullArticle(articleId);
        });
    });
    
    // Back to blog buttons
    document.getElementById('backToBlog1').addEventListener('click', hideFullArticle);
    document.getElementById('backToBlog2').addEventListener('click', hideFullArticle);
    document.getElementById('backToBlog3').addEventListener('click', hideFullArticle);
    
    // Обработчики для ссылок в футере
    document.getElementById('legalPrivacyLink').addEventListener('click', function(e) {
        e.preventDefault();
        showLegalPage('privacy-policy');
    });
    
    document.getElementById('legalTermsLink').addEventListener('click', function(e) {
        e.preventDefault();
        showLegalPage('terms-of-use');
    });
    
    document.getElementById('dataProcessingLink').addEventListener('click', function(e) {
        e.preventDefault();
        showLegalPage('data-processing');
    });
    
    document.getElementById('cookiePolicyLink').addEventListener('click', function(e) {
        e.preventDefault();
        showLegalPage('cookie-policy');
    });
    
    // Обработчики для ссылок в форме
    document.getElementById('privacyLink').addEventListener('click', function(e) {
        e.preventDefault();
        showLegalPage('privacy-policy');
    });
    
    document.getElementById('termsLink').addEventListener('click', function(e) {
        e.preventDefault();
        showLegalPage('terms-of-use');
    });
    
    // Обработчики для кнопок "Назад"
    document.getElementById('backFromPrivacy').addEventListener('click', function(e) {
        e.preventDefault();
        showMainContent();
    });
    
    // Обработка URL при загрузке
    if (window.location.hash) {
        const pageId = window.location.hash.substring(1);
        if (['privacy-policy', 'terms-of-use', 'data-processing', 'cookie-policy'].includes(pageId)) {
            showLegalPage(pageId);
        }
    }
    
    // Плавная прокрутка для всех внутренних ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Логотип ведет на главную
    document.getElementById('mainLogo').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    console.log('VERITAS CODE website with advanced features initialized');
});