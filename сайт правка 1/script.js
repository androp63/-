// ========== ОСНОВНОЙ КОД САЙТА ==========

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('VERITAS CODE website initialized');
    
    // Автоматическая регистрация в поисковых системах
    registerWithSearchEngines();
    
    // Инициализация всех компонентов
    initHeader();
    initMobileMenu();
    initAnimations();
    initDropdowns();
    initForms();
    initChatAssistant();
    initModals();
    initArticles();
    initSmoothScroll();
    initSEOFeatures();
});

// ========== SEO ОПТИМИЗАЦИЯ И ПОИСКОВЫЕ СИСТЕМЫ ==========

function registerWithSearchEngines() {
    // Автоматическая отправка sitemap
    const sitemapUrl = 'https://veritas-code.рф/sitemap.xml';
    
    // Google
    fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`, {
        method: 'GET',
        mode: 'no-cors'
    }).catch(() => {});
    
    // Bing
    fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`, {
        method: 'GET',
        mode: 'no-cors'
    }).catch(() => {});
    
    // Яндекс
    fetch(`https://webmaster.yandex.ru/site/veritas-code.рф/sitemap.xml`, {
        method: 'GET',
        mode: 'no-cors'
    }).catch(() => {});
    
    console.log('Site registered with search engines');
}

function initSEOFeatures() {
    // Динамическое обновление контента на основе популярных запросов
    const popularQueries = [
        'психолог москва',
        'медиатор конфликтов',
        'психолог онлайн',
        'расшифровка личности',
        'профайлинг',
        'нлп мастер',
        'кризисная психология',
        'семейный психолог',
        'бизнес медиация'
    ];
    
    // Добавляем скрытый SEO текст с популярными запросами
    const seoText = document.createElement('div');
    seoText.className = 'hidden-seo-text';
    seoText.innerHTML = `
        <h2>Психологические услуги в Москве</h2>
        <p>VERITAS CODE - профессиональный психолог-медиатор в Москве. Услуги: медиация конфликтов, профайлинг, НЛП, расшифровка кода личности, коучинг, кризисная психология, семейная психология, бизнес-психология. Консультации онлайн и очно.</p>
        <p>Популярные запросы: ${popularQueries.join(', ')}</p>
        <p>Хештеги: #психолог #медиатор #нлп #профайлинг #психология #отношения #тревожность #депрессия #выгорание #самооценка #конфликт</p>
    `;
    document.body.appendChild(seoText);
    
    // Динамическое обновление title и description
    updateMetaTags(popularQueries);
}

function updateMetaTags(queries) {
    // Обновляем title с популярными запросами
    const randomQueries = [...queries].sort(() => 0.5 - Math.random()).slice(0, 3);
    document.title = `VERITAS CODE ⭐ ${randomQueries.join(' | ')} | 2026`;
    
    // Обновляем description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = `✅ VERITAS CODE - ${queries[0]}, ${queries[1]}, ${queries[2]}. Профессиональная психологическая помощь и медиация конфликтов. Запись на консультацию.`;
    }
}

// ========== ЗАГОЛОВОК И НАВИГАЦИЯ ==========

function initHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    }
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// ========== АНИМАЦИИ ==========

function initAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });
}

// ========== DROPDOWNS ==========

function initDropdowns() {
    document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
        const selected = dropdown.querySelector('.dropdown-selected');
        const options = dropdown.querySelector('.dropdown-options');
        const hiddenInput = dropdown.querySelector('input[type="hidden"]');
        
        selected.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });
        
        dropdown.querySelectorAll('.dropdown-option').forEach(option => {
            option.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                const text = this.textContent;
                
                selected.querySelector('span').textContent = text;
                hiddenInput.value = value;
                dropdown.classList.remove('active');
                hiddenInput.setCustomValidity('');
            });
        });
        
        // Закрытие при клике вне dropdown
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    });
}

// ========== ФОРМЫ ==========

function initForms() {
    // Форма контактов
    const contactForm = document.getElementById('contactForm');
    const consentCheckbox = document.getElementById('consent');
    const submitBtn = document.getElementById('submitBtn');
    
    if (consentCheckbox && submitBtn) {
        consentCheckbox.addEventListener('change', function() {
            submitBtn.disabled = !this.checked;
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const service = document.getElementById('serviceType').value;
            const message = this.querySelector('textarea').value;
            
            // Формируем сообщение для Telegram
            const telegramMessage = `
📝 Новая заявка с сайта VERITAS CODE:

👤 Имя: ${name}
📱 Телефон: ${phone}
📧 Email: ${email}
🎯 Услуга: ${service}
💬 Сообщение: ${message}

⏰ Время: ${new Date().toLocaleString('ru-RU')}
            `;
            
            // Отправляем в Telegram
            sendToTelegram(telegramMessage);
            
            // Показываем уведомление
            showNotification('Заявка отправлена! Я свяжусь с вами в течение 24 часов.', 'success');
            
            // Очищаем форму
            this.reset();
            if (submitBtn) submitBtn.disabled = true;
            
            // Сбрасываем dropdown
            const dropdownSelected = document.querySelector('.dropdown-selected span');
            if (dropdownSelected) {
                dropdownSelected.textContent = 'Выберите тип консультации';
            }
            if (document.getElementById('serviceType')) {
                document.getElementById('serviceType').value = '';
            }
        });
    }
}

function sendToTelegram(message) {
    const botToken = 'YOUR_BOT_TOKEN'; // Замените на ваш токен бота
    const chatId = 'YOUR_CHAT_ID'; // Замените на ваш chat ID
    
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
        })
    }).catch(error => {
        console.error('Error sending to Telegram:', error);
        // Резервный вариант - открыть Telegram с сообщением
        const telegramUrl = `https://t.me/Ivan_Svetlyi?text=${encodeURIComponent(message)}`;
        window.open(telegramUrl, '_blank');
    });
}

// ========== ЧАТ-АССИСТЕНТ ==========

function initChatAssistant() {
    const chatButton = document.getElementById('chatButton');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatSend = document.getElementById('chatSend');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatButton || !chatWindow) return;
    
    // Открытие/закрытие чата
    chatButton.addEventListener('click', function() {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            chatInput.focus();
        }
    });
    
    chatClose.addEventListener('click', function() {
        chatWindow.classList.remove('active');
    });
    
    // Отправка сообщения
    chatSend.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
    
    // Предопределенные ответы
    const chatResponses = {
        'привет': 'Здравствуйте! Чем могу помочь?',
        'здравствуйте': 'Здравствуйте! Рад вас видеть. Какой у вас вопрос?',
        'цена': 'Стоимость консультации зависит от типа услуги. Минимальная цена - 3000 руб. за сессию. Подробнее расскажу при личном общении.',
        'запись': 'Для записи на консультацию заполните форму на сайте или напишите мне в Telegram: @Ivan_Svetlyi',
        'спасибо': 'Пожалуйста! Если есть еще вопросы - обращайтесь.'
    };
    
    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Добавляем сообщение пользователя
        addChatMessage(message, 'user');
        chatInput.value = '';
        
        // Ищем ответ
        let response = 'Благодарю за вопрос! Для более детального обсуждения рекомендую связаться со мной в Telegram: @Ivan_Svetlyi или заполнить форму на сайте.';
        
        const lowerMessage = message.toLowerCase();
        for (const [key, value] of Object.entries(chatResponses)) {
            if (lowerMessage.includes(key)) {
                response = value;
                break;
            }
        }
        
        // Имитируем задержку ответа
        setTimeout(() => {
            addChatMessage(response, 'bot');
            
            // Показываем каналы связи после первого ответа
            showChatChannels();
        }, 1000);
    }
    
    function addChatMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function showChatChannels() {
        const chatChannels = document.getElementById('chatChannels');
        if (chatChannels) {
            chatChannels.style.display = 'block';
        }
    }
}

// ========== МОДАЛЬНЫЕ ОКНА ==========

function initModals() {
    // Политика конфиденциальности
    document.getElementById('legalPrivacyLink').addEventListener('click', function(e) {
        e.preventDefault();
        showModal('privacyPolicyModal');
    });
    
    document.getElementById('privacyLink').addEventListener('click', function(e) {
        e.preventDefault();
        showModal('privacyPolicyModal');
    });
    
    // Условия использования
    document.getElementById('legalTermsLink').addEventListener('click', function(e) {
        e.preventDefault();
        showModal('termsOfUseModal');
    });
    
    // Закрытие модальных окон
    document.getElementById('privacyModalClose').addEventListener('click', function() {
        hideModal('privacyPolicyModal');
    });
    
    document.getElementById('termsModalClose').addEventListener('click', function() {
        hideModal('termsOfUseModal');
    });
    
    // Закрытие при клике вне окна
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            hideModal(e.target.id);
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.show').forEach(modal => {
                hideModal(modal.id);
            });
        }
    });
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// ========== СТАТЬИ ==========

function initArticles() {
    const articles = {
        'mediation-conflicts': {
            title: 'Медиация: как найти общий язык в самых сложных конфликтах',
            content: `
                <div class="article-meta">
                    <span><i class="far fa-calendar"></i> 15 января 2026</span>
                    <span><i class="far fa-clock"></i> Время чтения: 8 мин</span>
                </div>
                
                <div class="article-body">
                    <p>Конфликты — неотъемлемая часть человеческих отношений. Как медиатор с 8-летним опытом, я помогаю находить решения даже в самых сложных ситуациях.</p>
                    
                    <h3>Что такое медиация?</h3>
                    <p>Медиация — это процесс урегулирования спора с помощью нейтрального третьего лица — медиатора.</p>
                    
                    <div class="highlight">
                        <p><strong>Важно:</strong> Медиация возможна только при добровольном участии всех сторон.</p>
                    </div>
                    
                    <div class="action-section">
                        <h3>Нужна помощь в разрешении конфликта?</h3>
                        <p>Запишитесь на консультацию, и мы найдем решение вместе</p>
                        <button class="article-action-btn" data-service="mediation">
                            <i class="fas fa-calendar-check"></i> Записаться на медиацию
                        </button>
                    </div>
                </div>
            `
        },
        'personality-code': {
            title: '5 ключей к расшифровке вашего кода личности',
            content: `
                <div class="article-meta">
                    <span><i class="far fa-calendar"></i> 22 января 2026</span>
                    <span><i class="far fa-clock"></i> Время чтения: 10 мин</span>
                </div>
                
                <div class="article-body">
                    <p>Каждый человек обладает уникальным "кодом личности". Моя методика VERITAS CODE позволяет расшифровать этот код.</p>
                    
                    <h3>Что такое код личности?</h3>
                    <p>Код личности — это глубинная структура психики, формирующаяся в детстве.</p>
                    
                    <div class="action-section">
                        <h3>Готовы расшифровать свой код личности?</h3>
                        <p>Запишитесь на диагностическую сессию</p>
                        <button class="article-action-btn" data-service="personality-code">
                            <i class="fas fa-key"></i> Записаться на диагностику
                        </button>
                    </div>
                </div>
            `
        }
    };
    
    // Обработчики для кнопок "Читать далее"
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const articleId = this.getAttribute('data-article');
            showArticle(articleId);
        });
    });
    
    // Обработчики для кнопок в статьях
    document.addEventListener('click', function(e) {
        if (e.target.closest('.article-action-btn')) {
            const button = e.target.closest('.article-action-btn');
            const serviceType = button.getAttribute('data-service');
            
            // Закрываем модальное окно статьи
            const articleModal = document.getElementById('articleModal');
            if (articleModal) {
                hideModal('articleModal');
                setTimeout(() => {
                    articleModal.remove();
                }, 300);
            }
            
            // Прокручиваем к форме
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Подсвечиваем форму
                contactSection.classList.add('pulse-animation');
                setTimeout(() => {
                    contactSection.classList.remove('pulse-animation');
                }, 2000);
            }
            
            // Заполняем форму
            setServiceType(serviceType);
        }
    });
}

function showArticle(articleId) {
    const article = window.articles[articleId];
    if (!article) return;
    
    // Создаем модальное окно для статьи
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'articleModal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" id="articleModalClose">
                <i class="fas fa-times"></i>
            </button>
            <h2 class="modal-title">${article.title}</h2>
            ${article.content}
        </div>
    `;
    
    document.body.appendChild(modal);
    showModal('articleModal');
    
    // Обработчик закрытия
    document.getElementById('articleModalClose').addEventListener('click', function() {
        hideModal('articleModal');
        setTimeout(() => {
            modal.remove();
        }, 300);
    });
}

function setServiceType(serviceType) {
    const dropdown = document.querySelector('.custom-dropdown');
    if (!dropdown) return;
    
    const selected = dropdown.querySelector('.dropdown-selected span');
    const hiddenInput = dropdown.querySelector('input[type="hidden"]');
    
    const serviceMap = {
        'mediation': { text: 'Медиация', value: 'mediation' },
        'personality-code': { text: 'Расшифровка кода личности', value: 'personality-code' },
        'nlp': { text: 'НЛП коучинг', value: 'nlp' },
        'profiling': { text: 'Профайлинг', value: 'profiling' },
        'crisis': { text: 'Кризисная психология', value: 'crisis' },
        'relationships': { text: 'Отношения и семья', value: 'relationships' },
        'business': { text: 'Бизнес-психология', value: 'business' }
    };
    
    const service = serviceMap[serviceType];
    if (service && selected && hiddenInput) {
        selected.textContent = service.text;
        hiddenInput.value = service.value;
        
        // Фокусируемся на поле имени
        const nameInput = document.querySelector('input[type="text"]');
        if (nameInput) {
            nameInput.focus();
        }
    }
}

// ========== ГЛАДКАЯ ПРОКРУТКА ==========

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== УТИЛИТЫ ==========

function showNotification(message, type = 'info') {
    // Создаем уведомление
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <p>${message}</p>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Автоматическое закрытие
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Закрытие по клику
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

// ========== ОБРАБОТКА ССЫЛОК НА ГОРОДА ==========

document.querySelectorAll('.city-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const service = this.getAttribute('data-service');
        const city = this.getAttribute('data-city');
        
        // Прокручиваем к форме
        window.scrollTo({
            top: document.getElementById('contact').offsetTop - 100,
            behavior: 'smooth'
        });
        
        // Устанавливаем услугу
        setServiceType(service === 'mediation' ? 'mediation' : 'crisis');
        
        // Добавляем город в сообщение
        const textarea = document.querySelector('textarea');
        if (textarea) {
            textarea.value = `Интересует консультация в г. ${city}. `;
            textarea.focus();
        }
    });
});

// ========== ЗАЩИТА ОТ ВЗЛОМОВ ==========

// Защита от инъекций
function sanitizeInput(input) {
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

// Защита от XSS
document.addEventListener('DOMContentLoaded', function() {
    // Валидация всех форм
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.value.includes('<script>') || input.value.includes('javascript:')) {
                    isValid = false;
                    input.style.borderColor = '#ff4444';
                    showNotification('Обнаружен недопустимый ввод', 'error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });
});

// ========== СЛУЖЕБНЫЕ ФУНКЦИИ ==========

// Определение браузера и ОС
function getBrowserInfo() {
    const ua = navigator.userAgent;
    return {
        browser: ua.match(/(chrome|firefox|safari|opera|edge|msie|trident)/i)?.[0] || 'unknown',
        os: ua.match(/(windows|macintosh|linux|android|ios)/i)?.[0] || 'unknown',
        mobile: /mobile|android|iphone/i.test(ua)
    };
}

// Сохранение в локальное хранилище
function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('LocalStorage error:', e);
    }
}

function loadFromLocalStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (e) {
        console.error('LocalStorage error:', e);
        return null;
    }
}

// ========== АНАЛИТИКА ==========

// Отслеживание событий
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    
    if (typeof ym !== 'undefined') {
        ym(00000000, 'reachGoal', action);
    }
}

// Отслеживание просмотров
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        trackEvent('engagement', 'page_visible', 'User returned to page');
    }
});

// Отслеживание кликов
document.addEventListener('click', function(e) {
    const target = e.target;
    
    if (target.tagName === 'A') {
        trackEvent('navigation', 'link_click', target.href);
    }
    
    if (target.tagName === 'BUTTON') {
        trackEvent('engagement', 'button_click', target.textContent);
    }
});

console.log('VERITAS CODE psychology website with enhanced SEO and security initialized');