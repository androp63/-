// ========== ОСНОВНЫЕ ПЕРЕМЕННЫЕ ==========
const DOM = {
    header: document.getElementById('header'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileMenu: document.getElementById('mobileMenu'),
    mobileMenuClose: document.getElementById('mobileMenuClose'),
    chatButton: document.getElementById('chatButton'),
    chatWindow: document.getElementById('chatWindow'),
    chatClose: document.getElementById('chatClose'),
    chatSend: document.getElementById('chatSend'),
    chatInput: document.getElementById('chatInput'),
    chatMessages: document.getElementById('chatMessages'),
    contactForm: document.getElementById('contactForm'),
    submitBtn: document.getElementById('submitBtn'),
    consentCheckbox: document.getElementById('consent'),
    securityShield: document.getElementById('security-shield'),
    mainLogo: document.getElementById('main-logo')
};

// ========== СИСТЕМА БЕЗОПАСНОСТИ ==========
class SecuritySystem {
    constructor() {
        this.threatLevel = 0;
        this.init();
    }

    init() {
        this.detectThreats();
        this.setupProtection();
        this.monitorActivity();
    }

    detectThreats() {
        // Обнаружение инъекций
        if (window.location.href.includes('<script>') || 
            window.location.href.includes('javascript:')) {
            this.threatLevel = 3;
            this.blockAttack();
        }

        // Обнаружение XSS
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                this.sanitizeInput(e.target);
            });
        });
    }

    sanitizeInput(input) {
        let value = input.value;
        // Удаление опасных конструкций
        value = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        value = value.replace(/javascript:/gi, '');
        value = value.replace(/on\w+=/gi, '');
        input.value = value;
    }

    setupProtection() {
        // Защита от копирования
        document.addEventListener('copy', (e) => {
            if (this.threatLevel > 1) {
                e.preventDefault();
                this.showAlert('Копирование запрещено системой безопасности');
            }
        });

        // Защита от вставки
        document.addEventListener('paste', (e) => {
            if (this.threatLevel > 1) {
                e.preventDefault();
                this.showAlert('Вставка заблокирована системой безопасности');
            }
        });

        // Защита от контекстного меню
        document.addEventListener('contextmenu', (e) => {
            if (this.threatLevel > 2) {
                e.preventDefault();
            }
        });
    }

    monitorActivity() {
        // Мониторинг активности
        let activityCount = 0;
        const activityLimit = 100;

        document.addEventListener('click', () => {
            activityCount++;
            if (activityCount > activityLimit) {
                this.threatLevel = 2;
                this.limitActivity();
            }
        });

        // Сброс счетчика каждую минуту
        setInterval(() => {
            activityCount = 0;
        }, 60000);
    }

    blockAttack() {
        document.body.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #0a0a0a;
                color: #d4af37;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding: 20px;
                z-index: 99999;
            ">
                <h1 style="font-size: 2rem; margin-bottom: 20px;">⚠️ ОБНАРУЖЕНА УГРОЗА ⚠️</h1>
                <p style="font-size: 1.2rem; margin-bottom: 30px;">
                    Система безопасности VERITAS CODE заблокировала потенциальную атаку.
                </p>
                <button onclick="location.reload()" style="
                    background: #d4af37;
                    color: #0a0a0a;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 25px;
                    font-size: 1rem;
                    cursor: pointer;
                    font-weight: bold;
                ">
                    Вернуться на сайт
                </button>
            </div>
        `;
    }

    limitActivity() {
        DOM.securityShield.style.pointerEvents = 'auto';
        DOM.securityShield.style.background = 'rgba(255, 0, 0, 0.1)';
        
        setTimeout(() => {
            DOM.securityShield.style.pointerEvents = 'none';
            DOM.securityShield.style.background = 'transparent';
        }, 5000);
    }

    showAlert(message) {
        const alert = document.createElement('div');
        alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(212, 175, 55, 0.9);
            color: #0a0a0a;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 10001;
            font-weight: bold;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
        `;
        alert.textContent = message;
        document.body.appendChild(alert);

        setTimeout(() => {
            alert.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => alert.remove(), 300);
        }, 3000);
    }
}

// ========== СИСТЕМА САМООБУЧЕНИЯ И SEO ==========
class SelfLearningSEO {
    constructor() {
        this.keywords = new Set();
        this.trends = [];
        this.userQueries = [];
        this.init();
    }

    init() {
        this.loadKeywords();
        this.analyzeBehavior();
        this.monitorTrends();
        this.updateContent();
    }

    loadKeywords() {
        // Базовые ключевые слова психологии
        const baseKeywords = [
            'психолог', 'психотерапия', 'медиация', 'конфликтология',
            'профайлинг', 'нлп', 'расшифровка личности', 'код личности',
            'психологическая помощь', 'терапия', 'коучинг', 'саморазвитие',
            'отношения', 'семья', 'бизнес', 'переговоры', 'манипуляции',
            'тревожность', 'депрессия', 'выгорание', 'стресс', 'панические атаки',
            'самооценка', 'уверенность', 'личностный рост', 'осознанность'
        ];
        
        baseKeywords.forEach(keyword => this.keywords.add(keyword));
    }

    analyzeBehavior() {
        // Анализ поведения пользователей
        document.addEventListener('click', (e) => {
            const text = e.target.textContent.toLowerCase();
            this.extractKeywords(text);
        });

        // Анализ запросов в форме
        if (DOM.contactForm) {
            DOM.contactForm.addEventListener('submit', (e) => {
                const message = document.getElementById('clientMessage').value;
                this.analyzeQuery(message);
            });
        }
    }

    extractKeywords(text) {
        const words = text.split(/\s+/);
        words.forEach(word => {
            if (word.length > 3 && /^[а-яё]+$/i.test(word)) {
                this.keywords.add(word.toLowerCase());
            }
        });
    }

    analyzeQuery(query) {
        this.userQueries.push(query);
        if (this.userQueries.length > 10) {
            this.userQueries.shift();
        }
        this.updateTrends();
    }

    monitorTrends() {
        // Симуляция мониторинга трендов (в реальности через API)
        setInterval(() => {
            const mockTrends = [
                'психолог онлайн', 'медиация конфликтов', 'профайлинг обучение',
                'нлп техники', 'кризисная помощь', 'семейная терапия'
            ];
            
            const randomTrend = mockTrends[Math.floor(Math.random() * mockTrends.length)];
            if (!this.trends.includes(randomTrend)) {
                this.trends.push(randomTrend);
                if (this.trends.length > 5) this.trends.shift();
            }
        }, 300000); // Каждые 5 минут
    }

    updateContent() {
        // Динамическое обновление мета-тегов
        setInterval(() => {
            this.updateMetaTags();
            this.updatePageContent();
        }, 600000); // Каждые 10 минут
    }

    updateMetaTags() {
        const keywordsArray = Array.from(this.keywords);
        const currentKeywords = keywordsArray.slice(0, 20).join(', ');
        
        // Обновление meta keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.name = 'keywords';
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.content = currentKeywords;

        // Обновление description на основе трендов
        if (this.trends.length > 0) {
            const trendDescription = `VERITAS CODE - ${this.trends[0]}. Профессиональная медиация и психологическая помощь. ${Array.from(this.keywords).slice(0, 5).join(', ')}`;
            
            let metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.content = trendDescription;
            }

            // Обновление Open Graph
            let ogDescription = document.querySelector('meta[property="og:description"]');
            if (ogDescription) {
                ogDescription.content = trendDescription;
            }
        }
    }

    updatePageContent() {
        // Динамическое обновление заголовков и контента
        const titles = document.querySelectorAll('h1, h2, h3');
        titles.forEach(title => {
            const originalText = title.dataset.original || title.textContent;
            title.dataset.original = originalText;
            
            // Добавление ключевых слов в заголовки
            if (this.keywords.size > 0) {
                const keywordsArray = Array.from(this.keywords);
                const randomKeyword = keywordsArray[Math.floor(Math.random() * keywordsArray.length)];
                
                if (Math.random() > 0.7) { // 30% chance
                    title.textContent = `${originalText} | ${randomKeyword}`;
                }
            }
        });

        // Обновление городских ссылок
        const cityLinks = document.querySelectorAll('.city-link');
        cityLinks.forEach(link => {
            const cityMatch = link.textContent.match(/(Москва|Санкт-Петербург|онлайн)/);
            if (cityMatch) {
                const city = cityMatch[1];
                const service = link.textContent.includes('Медиатор') ? 'медиатор' : 'психолог';
                const newText = `${service.charAt(0).toUpperCase() + service.slice(1)} ${city}`;
                link.textContent = newText;
                link.href = '#contact';
            }
        });
    }

    getTopKeywords() {
        return Array.from(this.keywords).slice(0, 10);
    }
}

// ========== АССИСТЕНТ С ОТПРАВКОЙ В TELEGRAM И WHATSAPP ==========
class ChatAssistant {
    constructor() {
        this.messages = [];
        this.isOpen = false;
        this.init();
    }

    init() {
        this.loadMessages();
        this.setupEventListeners();
        this.setupAutoResponse();
    }

    setupEventListeners() {
        if (DOM.chatButton) {
            DOM.chatButton.addEventListener('click', () => this.toggleChat());
        }
        
        if (DOM.chatClose) {
            DOM.chatClose.addEventListener('click', () => this.closeChat());
        }
        
        if (DOM.chatSend) {
            DOM.chatSend.addEventListener('click', () => this.sendMessage());
        }
        
        if (DOM.chatInput) {
            DOM.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        DOM.chatWindow.classList.toggle('active', this.isOpen);
        
        if (this.isOpen) {
            DOM.chatInput.focus();
        }
    }

    closeChat() {
        this.isOpen = false;
        DOM.chatWindow.classList.remove('active');
    }

    async sendMessage() {
        const input = DOM.chatInput;
        const message = input.value.trim();
        
        if (!message) return;
        
        // Добавляем сообщение пользователя
        this.addMessage(message, 'user');
        input.value = '';
        
        // Сохраняем в историю
        this.saveMessage(message, 'user');
        
        // Отправляем в Telegram и WhatsApp
        this.sendToTelegram(message);
        this.sendToWhatsApp(message);
        
        // Автоответ
        setTimeout(() => {
            this.generateAutoResponse(message);
        }, 1000);
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        DOM.chatMessages.appendChild(messageDiv);
        DOM.chatMessages.scrollTop = DOM.chatMessages.scrollHeight;
    }

    saveMessage(text, sender) {
        this.messages.push({ text, sender, timestamp: new Date().toISOString() });
        localStorage.setItem('chat_history', JSON.stringify(this.messages));
    }

    loadMessages() {
        const saved = localStorage.getItem('chat_history');
        if (saved) {
            try {
                this.messages = JSON.parse(saved);
            } catch (e) {
                this.messages = [];
            }
        }
    }

    sendToTelegram(message) {
        const telegramUrl = `https://t.me/Ivan_Svetlyi?text=${encodeURIComponent(`Вопрос с сайта: ${message}`)}`;
        window.open(telegramUrl, '_blank', 'noopener,noreferrer');
    }

    sendToWhatsApp(message) {
        const whatsappUrl = `https://wa.me/79164443963?text=${encodeURIComponent(`Вопрос с сайта: ${message}`)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }

    generateAutoResponse(userMessage) {
        const responses = [
            "Спасибо за ваш вопрос! Я передал его специалисту. Он свяжется с вами в ближайшее время в Telegram или WhatsApp.",
            "Интересный вопрос! Для детального ответа рекомендую записаться на консультацию через форму на сайте.",
            "Это важная тема. Специалист VERITAS CODE сможет помочь вам разобраться в этой ситуации.",
            "Ваш вопрос получен. Для конфиденциальной консультации свяжитесь с нами через контактную форму.",
            "По этому вопросу лучше проконсультироваться лично. Можете записаться на прием через контакты на сайте."
        ];
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        this.addMessage(response, 'bot');
        this.saveMessage(response, 'bot');
    }

    setupAutoResponse() {
        // Автоматическое приветствие при длительном бездействии
        setTimeout(() => {
            if (this.messages.length === 0) {
                this.addMessage("Есть вопросы по медиации или психологии? Спрашивайте!", 'bot');
            }
        }, 30000);
    }
}

// ========== ФОРМА ОБРАТНОЙ СВЯЗИ ==========
class ContactForm {
    constructor() {
        this.init();
    }

    init() {
        this.setupValidation();
        this.setupSubmit();
    }

    setupValidation() {
        if (DOM.consentCheckbox && DOM.submitBtn) {
            DOM.consentCheckbox.addEventListener('change', () => {
                DOM.submitBtn.disabled = !DOM.consentCheckbox.checked;
            });
        }
    }

    setupSubmit() {
        if (DOM.contactForm) {
            DOM.contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                if (!this.validateForm()) return;
                
                const formData = this.collectFormData();
                await this.sendFormData(formData);
                
                this.showSuccessMessage();
                DOM.contactForm.reset();
                DOM.submitBtn.disabled = true;
            });
        }
    }

    validateForm() {
        const required = DOM.contactForm.querySelectorAll('[required]');
        let isValid = true;
        
        required.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#ff4444';
                isValid = false;
            } else {
                field.style.borderColor = '';
            }
        });
        
        return isValid;
    }

    collectFormData() {
        return {
            name: document.getElementById('clientName').value,
            phone: document.getElementById('clientPhone').value,
            service: document.getElementById('serviceType').value,
            message: document.getElementById('clientMessage').value,
            timestamp: new Date().toISOString(),
            source: window.location.href
        };
    }

    async sendFormData(data) {
        // В реальном проекте здесь был бы fetch на сервер
        console.log('Отправка формы:', data);
        
        // Отправка в Telegram
        const telegramMessage = `
Новая заявка с сайта:
Имя: ${data.name}
Телефон: ${data.phone}
Услуга: ${data.service}
Сообщение: ${data.message}
        `;
        
        const telegramUrl = `https://t.me/Ivan_Svetlyi?text=${encodeURIComponent(telegramMessage)}`;
        window.open(telegramUrl, '_blank', 'noopener,noreferrer');
        
        // Отправка в WhatsApp
        const whatsappUrl = `https://wa.me/79164443963?text=${encodeURIComponent(telegramMessage)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        
        return true;
    }

    showSuccessMessage() {
        const alert = document.createElement('div');
        alert.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(46, 204, 113, 0.9);
            color: white;
            padding: 15px 30px;
            border-radius: 8px;
            z-index: 10001;
            font-weight: bold;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
        `;
        alert.textContent = 'Заявка отправлена! Мы свяжемся с вами в течение 24 часов.';
        document.body.appendChild(alert);

        setTimeout(() => {
            alert.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => alert.remove(), 300);
        }, 5000);
    }
}

// ========== УПРАВЛЕНИЕ МОДАЛЬНЫМИ ОКНАМИ ==========
class ModalManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupModalLinks();
        this.setupCloseButtons();
        this.setupEscapeClose();
    }

    setupModalLinks() {
        document.querySelectorAll('.legal-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = link.dataset.modal;
                this.openModal(modalId);
            });
        });
    }

    setupCloseButtons() {
        document.querySelectorAll('.modal-close, [data-close]').forEach(btn => {
            btn.addEventListener('click', () => {
                const modalId = btn.dataset.close || 
                    btn.closest('.modal').id.replace('Modal', '').toLowerCase();
                this.closeModal(modalId);
            });
        });
    }

    setupEscapeClose() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    const modalId = modal.id.replace('Modal', '').toLowerCase();
                    this.closeModal(modalId);
                }
            });
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(`${modalId}Modal`);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(`${modalId}Modal`);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
}

// ========== АНИМАЦИИ И ЭФФЕКТЫ ПРОКРУТКИ ==========
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollHeader();
        this.setupScrollSpy();
        this.setupFadeIn();
        this.setupSmoothScroll();
    }

    setupScrollHeader() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                DOM.header.classList.add('scrolled');
            } else {
                DOM.header.classList.remove('scrolled');
            }
        });
    }

    setupScrollSpy() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                if (entry.isIntersecting) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.toggle('active', 
                            link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('section[id]').forEach(section => {
            observer.observe(section);
        });
    }

    setupFadeIn() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in').forEach(element => {
            observer.observe(element);
        });
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Закрываем мобильное меню если открыто
                    if (DOM.mobileMenu.classList.contains('active')) {
                        DOM.mobileMenu.classList.remove('active');
                        DOM.mobileMenuBtn.classList.remove('active');
                    }
                }
            });
        });
    }
}

// ========== МОБИЛЬНОЕ МЕНЮ ==========
class MobileMenu {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        if (DOM.mobileMenuBtn) {
            DOM.mobileMenuBtn.addEventListener('click', () => this.toggleMenu());
        }
        
        if (DOM.mobileMenuClose) {
            DOM.mobileMenuClose.addEventListener('click', () => this.closeMenu());
        }
        
        // Закрытие при клике на ссылку
        DOM.mobileMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        DOM.mobileMenu.classList.toggle('active');
        DOM.mobileMenuBtn.classList.toggle('active');
        document.body.style.overflow = this.isOpen ? 'hidden' : '';
    }

    closeMenu() {
        this.isOpen = false;
        DOM.mobileMenu.classList.remove('active');
        DOM.mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ========== SEO ХЕШТЕГИ И МЕТА-ТЕГИ ==========
class SEOOptimizer {
    constructor() {
        this.hashtags = this.generateHashtags();
        this.init();
    }

    generateHashtags() {
        return [
            '#психолог', '#психотерапия', '#медиация', '#профайлинг', '#нлп',
            '#психология', '#психологонлайн', '#медиатор', '#конфликтология',
            '#семейныйпсихолог', '#отношения', '#саморазвитие', '#личностныйрост',
            '#тревожность', '#депрессия', '#выгорание', '#коучинг', '#терапия',
            '#психологическаяпомощь', '#ментальноездоровье', '#осознанность',
            '#верitascode', '#кодличности', '#расшифровкаличности', '#ивансветлый',
            '#медиатормосква', '#психологмосква', '#медиацияонлайн', '#психологонлайн',
            '#бизнесмедиация', '#рабочиеконфликты', '#семейнаямедиация',
            '#безопасность', '#защита', '#протокол', '#система', '#контроль',
            '#ответственность', '#скрипты', '#диалог', '#защитапсихологическая',
            '#техноген', '#железныеправила', '#прошивка', '#доверчивость',
            '#дети', '#коддоступа', '#фильтры', '#инструктаж', '#антивирус',
            '#культличности', '#итоги', '#победа', '#отчет', '#действие',
            '#результаты', '#разоблачение', '#инфантилизм', '#взрослость',
            '#психологияздоровья', '#психосоматика', '#эмоции', '#здоровье',
            '#жесткаяправда', '#любовь', '#сила', '#самодостаточность',
            '#психологическоеоружие', '#переговоры', '#молчание', '#давление',
            '#тактика', '#продажи', '#управление', '#менеджмент', '#бизнес',
            '#книгаменеджера', '#начальник', '#манипуляции', '#выживание',
            '#карьера', '#самооценка', '#уверенность', '#развитие', '#навыки',
            '#семья', '#свекровь', '#границы', '#план', '#методсломаннойпластинки',
            '#какубедить', '#интерактив', '#вопросответ', '#разборкейсов',
            '#помощь', '#глубина', '#погружение', '#археологиядуши', '#истина',
            '#авторскийметод', '#бренд', '#символика', '#силапереговоров',
            '#уважение', '#харизма', '#власть', '#свидания', '#рынок',
            '#невроз', '#диагностика', '#тест', '#совместимость', '#деньги',
            '#работа', '#зарплата', '#манипуляциизащита', '#методсеройскалы',
            '#эффективность', '#прокрастинация', '#мозг', '#самоуправление',
            '#перезагрузка', '#готовность', '#хэллоуин', '#монстры', '#духовность',
            '#самообман', '#реальность', '#языктела', '#невербалика',
            '#трансформация', '#прорыв', '#взломсознания', '#газлайтинг',
            '#пассивнаяагрессия', '#мотивация', '#силаволи', '#дисциплина',
            '#историяуспеха', '#внутренниймир', '#стресс', '#абьюз', '#детокс',
            '#негативныеэмоции', '#наука', '#философия', '#этика', '#правда',
            '#изменения', '#терапия', '#созависимость', '#перфекционизм',
            '#суицид', '#честность', '#диалог', '#уникальныйподход', '#окружение',
            '#саботаж', '#рост', '#книги', '#ложь', '#работанадотношениями',
            '#личныйопыт', '#агрессия', '#психологияуверенности', '#самообман',
            '#книгисериалы', '#ресурсы', '#конфликты', '#советы', '#осень',
            '#хандра', '#самодиагностика', '#опрос', '#обратнаясвязь',
            '#оперативник', '#разведка', '#мужскаяпсихология', '#созависимость',
            '#газлайтинг', '#спасательство', '#треугольниккарпмана', '#роли',
            '#ясообщения', '#коммуникация', '#реклама', '#принятиерешений',
            '#опросвыгорание', '#усталость', '#фриланс', '#фокус', '#ментальныйхаос',
            '#самоорганизация', '#таймменеджмент', '#правило2минут', '#продуктивность',
            '#эмоциональнаялень', '#антистресс', '#паника', '#концентрация',
            '#дыхание', '#мифы', '#общественноемнение', '#токсичныеустановки',
            '#практика', '#навык', '#кинотренировка', '#домашнеезадание',
            '#доверие', '#анализлжи', '#невербалика', '#какчитатьлюдей',
            '#признакилюбви', '#интуиция', '#стартнедели', '#кино', '#зависимости',
            '#психика', '#воскресныйкинопросмотр', '#метафора', '#иллюзии',
            '#надежда', '#оперативнаяпсихология', '#психологическаясамооборона',
            '#критическоемышление', '#влияние', '#хакидляжизни', '#мошенничество',
            '#пропаганда', '#криптоскам', '#инвестиции', '#влияние', '#языквилияния',
            '#анализповедения', '#психологияпереговоров', '#конфликтразрешение',
            '#реальныеистории', '#личнаяэффективность', '#мифыиреальность',
            '#познайсебя', '#думайиначе', '#правдажизни', '#тренды2024',
            '#творчество', '#инновации', '#успех', '#нейропсихология',
            '#здоровьемозга', '#ошибкимозга', '#понимание', '#лечение',
            '#преодолениепредвзятости', '#стереотипы', '#мышление',
            '#социальноевлияние', '#конформизм', '#предвзятость',
            '#влияниегруппы', '#социальныевзаимодействия', '#группа',
            '#индивид', '#социальныеожидания', '#силаволи', '#заикание',
            '#достижениерезультата', '#ошибкивповедении', '#физическоездоровье',
            '#работамозга', '#когнитивныепроцессы', '#ошибкимышления',
            '#учеба', '#повседневнаяжизнь'
        ];
    }

    init() {
        this.injectMetaTags();
        this.updateDynamicContent();
    }

    injectMetaTags() {
        // Динамические meta теги
        const metaTags = [
            { name: 'keywords', content: this.hashtags.slice(0, 50).join(', ') },
            { property: 'og:title', content: 'VERITAS CODE | Медиатор | Психолог-профайлер Москва' },
            { property: 'og:description', content: 'Профессиональная медиация и расшифровка кода личности. Психологический анализ, профайлинг, НЛП коучинг.' },
            { name: 'twitter:title', content: 'VERITAS CODE | Медиатор | Психолог-профайлер' },
            { name: 'twitter:description', content: 'Профессиональная медиация и расшифровка кода личности' }
        ];

        metaTags.forEach(tag => {
            let element = document.querySelector(
                tag.name ? `meta[name="${tag.name}"]` : `meta[property="${tag.property}"]`
            );
            
            if (!element) {
                element = document.createElement('meta');
                if (tag.name) element.name = tag.name;
                if (tag.property) element.setAttribute('property', tag.property);
                document.head.appendChild(element);
            }
            
            if (tag.name) element.name = tag.name;
            if (tag.property) element.setAttribute('property', tag.property);
            element.content = tag.content;
        });
    }

    updateDynamicContent() {
        // Динамическое обновление заголовков с хештегами
        setInterval(() => {
            const randomHashtag = this.hashtags[Math.floor(Math.random() * this.hashtags.length)];
            const title = document.querySelector('title');
            if (title && Math.random() > 0.8) {
                document.title = `${title.textContent.split('|')[0]} | ${randomHashtag.replace('#', '')}`;
            }
        }, 300000);
    }
}

// ========== ИНИЦИАЛИЗАЦИЯ ВСЕХ СИСТЕМ ==========
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация систем безопасности
    const securitySystem = new SecuritySystem();
    
    // Инициализация SEO системы
    const seoSystem = new SelfLearningSEO();
    
    // Инициализация чат-ассистента
    const chatAssistant = new ChatAssistant();
    
    // Инициализация формы
    const contactForm = new ContactForm();
    
    // Инициализация модальных окон
    const modalManager = new ModalManager();
    
    // Инициализация анимаций
    const scrollAnimations = new ScrollAnimations();
    
    // Инициализация мобильного меню
    const mobileMenu = new MobileMenu();
    
    // Инициализация SEO оптимизатора
    const seoOptimizer = new SEOOptimizer();
    
    // Дополнительная инициализация
    initializeAdditionalFeatures();
    
    console.log('✅ VERITAS CODE система полностью инициализирована');
    console.log('🔒 Система безопасности: АКТИВНА');
    console.log('🤖 SEO система самообучения: ЗАПУЩЕНА');
    console.log('💬 Чат-ассистент: ГОТОВ К РАБОТЕ');
});

// ========== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ ==========
function initializeAdditionalFeatures() {
    // Предотвращение кэширования проблем
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(registration => registration.unregister());
        });
    }

    // Обработка ошибок изображений
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });

    // Улучшение производительности на мобильных устройствах
    if ('ontouchstart' in window) {
        document.documentElement.classList.add('touch-device');
    }

    // Защита от копирования контента
    document.addEventListener('copy', function(e) {
        const selection = window.getSelection();
        if (selection.toString().length > 100) {
            e.preventDefault();
            showNotification('Копирование больших фрагментов контента запрещено', 'warning');
        }
    });

    // Отслеживание активности для SEO
    let pageViewTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Date.now() - pageViewTime;
        localStorage.setItem('last_session_duration', timeSpent);
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'warning' ? '#f39c12' : '#2ecc71'};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 10001;
        font-weight: bold;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        animation: slideUp 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// CSS для анимаций уведомлений
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes slideUp {
        from { transform: translate(-50%, 100%); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
    }
    
    @keyframes slideDown {
        from { transform: translate(-50%, 0); opacity: 1; }
        to { transform: translate(-50%, 100%); opacity: 0; }
    }
    
    .nav-link.active {
        color: var(--accent-gold) !important;
    }
    
    .nav-link.active:after {
        width: 100% !important;
    }
    
    .touch-device .btn {
        min-height: 44px;
    }
    
    .touch-device input,
    .touch-device textarea {
        font-size: 16px !important;
    }
`;
document.head.appendChild(style);