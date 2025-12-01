// ========== ОСНОВНОЙ КОД САЙТА ==========

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

// Закрытие мобильного меню при клике на ссылку
document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
});

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
        const mailtoLink = `mailto:Orion.290292@yandex.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
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

// ========== УПРАВЛЕНИЕ СТАТЬЯМИ И ЮРИДИЧЕСКИМИ ДОКУМЕНТАМИ ==========

// Функция для показа модального окна
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Функция для скрытия модального окна
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Инициализация модальных окон для юридических документов
document.addEventListener('DOMContentLoaded', function() {
    // Обработчики для ссылок в основном футере
    document.getElementById('legalPrivacyLink').addEventListener('click', function(e) {
        e.preventDefault();
        showModal('privacyPolicyModal');
    });
    
    document.getElementById('legalTermsLink').addEventListener('click', function(e) {
        e.preventDefault();
        showModal('termsOfUseModal');
    });
    
    document.getElementById('dataProcessingLink').addEventListener('click', function(e) {
        e.preventDefault();
        showModal('dataProcessingModal');
    });
    
    document.getElementById('cookiePolicyLink').addEventListener('click', function(e) {
        e.preventDefault();
        showModal('cookiePolicyModal');
    });
    
    // Обработчики для ссылок в форме
    document.getElementById('privacyLink').addEventListener('click', function(e) {
        e.preventDefault();
        showModal('privacyPolicyModal');
    });
    
    document.getElementById('termsLink').addEventListener('click', function(e) {
        e.preventDefault();
        showModal('termsOfUseModal');
    });
    
    // Закрытие модальных окон при клике на кнопку закрытия
    document.getElementById('privacyModalClose').addEventListener('click', function() {
        hideModal('privacyPolicyModal');
    });
    
    document.getElementById('termsModalClose').addEventListener('click', function() {
        hideModal('termsOfUseModal');
    });
    
    document.getElementById('dataModalClose').addEventListener('click', function() {
        hideModal('dataProcessingModal');
    });
    
    document.getElementById('cookieModalClose').addEventListener('click', function() {
        hideModal('cookiePolicyModal');
    });
    
    // Закрытие модальных окон при клике вне их
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            hideModal(e.target.id);
        }
    });
});

// ========== ФУНКЦИОНАЛ "ЧИТАТЬ ДАЛЕЕ" ==========

// Статьи для отображения в модальных окнах
const articles = {
    'mediation-conflicts': {
        title: 'Медиация: как найти общий язык в самых сложных конфликтах',
        content: `
            <div class="article-meta">
                <span><i class="far fa-calendar"></i> 15 мая 2024</span>
                <span><i class="far fa-clock"></i> Время чтения: 8 мин</span>
            </div>
            
            <div class="article-body">
                <p>Конфликты — неотъемлемая часть человеческих отношений. Они возникают в семье, на работе, в бизнесе. Но важно не то, возникают ли конфликты, а то, как мы их решаем. Медиация предлагает цивилизованный способ разрешения споров, когда все стороны остаются в выигрыше.</p>
                
                <h3>Что такое медиация?</h3>
                <p>Медиация — это процесс урегулирования спора с помощью нейтрального третьего лица — медиатора. В отличие от суда, где решение принимает судья, в медиации стороны сами находят взаимоприемлемое решение.</p>
                
                <div class="warning-box">
                    <p><strong>Важно:</strong> Медиация возможна только при добровольном участии всех сторон и их готовности к диалогу.</p>
                </div>
                
                <h3>5 принципов успешной медиации</h3>
                
                <div class="strategy-grid">
                    <div class="strategy-card">
                        <div class="strategy-icon">🤝</div>
                        <h4>Добровольность</h4>
                        <p>Все участники принимают решение об участии добровольно</p>
                    </div>
                    <div class="strategy-card">
                        <div class="strategy-icon">🔒</div>
                        <h4>Конфиденциальность</h4>
                        <p>Все обсуждаемое остается между участниками процесса</p>
                    </div>
                    <div class="strategy-card">
                        <div class="strategy-icon">⚖️</div>
                        <h4>Нейтральность</h4>
                        <p>Медиатор не принимает чью-либо сторону</p>
                    </div>
                    <div class="strategy-card">
                        <div class="strategy-icon">🎯</div>
                        <h4>Фокусировка на интересах</h4>
                        <p>Мы ищем коренные интересы, а не спорные позиции</p>
                    </div>
                </div>
                
                <div class="expert-advice">
                    <h4>Совет от специалиста VERITAS CODE</h4>
                    <p>«Часто в конфликте люди застревают в своих позициях и не видят общих интересов. Моя задача как медиатора — помочь сторонам услышать друг друга и найти решение, которое удовлетворит всех. Помните: в любом конфликте есть зона возможного согласия.»</p>
                </div>
                
                <div class="action-section">
                    <h3>Готовы разрешить ваш конфликт?</h3>
                    <p>Запишитесь на консультацию, и мы найдем решение вместе</p>
                    <a href="#contact" class="btn btn-primary" id="articleConsultationBtn">Записаться на медиацию</a>
                </div>
            </div>
        `
    },
    'personality-code': {
        title: '5 ключей к расшифровке вашего кода личности',
        content: `
            <div class="article-meta">
                <span><i class="far fa-calendar"></i> 22 мая 2024</span>
                <span><i class="far fa-clock"></i> Время чтения: 10 мин</span>
            </div>
            
            <div class="article-body">
                <p>Каждый человек обладает уникальным "кодом личности" — набором паттернов поведения, убеждений и реакций, которые определяют его жизнь. Методика VERITAS CODE позволяет расшифровать этот код и использовать полученные знания для личностного роста.</p>
                
                <h3>Что такое код личности?</h3>
                <p>Код личности — это глубинная структура психики, формирующаяся в детстве и состоящая из:</p>
                <ul>
                    <li>Базовых убеждений о себе и мире</li>
                    <li>Автоматических поведенческих паттернов</li>
                    <li>Эмоциональных реакций на определенные триггеры</li>
                    <li>Защитных механизмов психики</li>
                    <li>Сценарных программ поведения</li>
                </ul>
                
                <h3>5 ключей к расшифровке кода личности</h3>
                
                <div class="strategy-grid">
                    <div class="strategy-card">
                        <div class="strategy-icon">🔍</div>
                        <h4>Ключ 1: Анализ повторяющихся ситуаций</h4>
                        <p>Какие события повторяются в вашей жизни? Это указание на глубинные программы.</p>
                    </div>
                    <div class="strategy-card">
                        <div class="strategy-icon">💭</div>
                        <h4>Ключ 2: Исследование автоматических мыслей</h4>
                        <p>Какие мысли приходят в голову в стрессовых ситуациях?</p>
                    </div>
                    <div class="strategy-card">
                        <div class="strategy-icon">🤔</div>
                        <h4>Ключ 3: Осознание эмоциональных реакций</h4>
                        <p>Какие эмоции преобладают? Это маркеры неосознанных конфликтов.</p>
                    </div>
                    <div class="strategy-card">
                        <div class="strategy-icon">🔄</div>
                        <h4>Ключ 4: Выявление поведенческих паттернов</h4>
                        <p>Как вы действуете в типичных ситуациях? Это проявление сценария.</p>
                    </div>
                    <div class="strategy-card">
                        <div class="strategy-icon">🎯</div>
                        <h4>Ключ 5: Определение ограничивающих убеждений</h4>
                        <p>Какие "нельзя" и "должен" управляют вашей жизнью?</p>
                    </div>
                </div>
                
                <div class="expert-advice">
                    <h4>Методика VERITAS CODE</h4>
                    <p>«В своей работе я использую комплексный подход, сочетающий элементы транзактного анализа, когнитивно-поведенческой терапии и НЛП. Это позволяет не просто диагностировать проблему, но и создать практический план изменений. Расшифровка кода личности — это первый шаг к осознанной жизни.»</p>
                </div>
                
                <div class="action-section">
                    <h3>Готовы расшифровать свой код личности?</h3>
                    <p>Запишитесь на диагностическую сессию и начните путь к себе</p>
                    <a href="#contact" class="btn btn-primary" id="articleConsultationBtn">Записаться на диагностику</a>
                </div>
            </div>
        `
    },
    'profiling-business': {
        title: 'Как профайлинг помогает в бизнесе и отношениях',
        content: `
            <div class="article-meta">
                <span><i class="far fa-calendar"></i> 5 июня 2024</span>
                <span><i class="far fa-clock"></i> Время чтения: 12 мин</span>
            </div>
            
            <div class="article-body">
                <p>Профайлинг — это не просто модное слово, а мощный инструмент для понимания людей. В бизнесе он помогает заключать выгодные сделки, формировать эффективные команды и избегать манипуляций. В личной жизни — строить гармоничные отношения и понимать мотивы близких.</p>
                
                <h3>Что такое профайлинг?</h3>
                <p>Профайлинг — это технология оценки и прогнозирования поведения человека на основе анализа вербальных и невербальных сигналов. В отличие от обычной психологии, профайлинг фокусируется на практическом применении — здесь и сейчас.</p>
                
                <div class="warning-box">
                    <p><strong>Важно:</strong> Профайлинг — это не чтение мыслей, а анализ доступной информации для составления психологического портрета.</p>
                </div>
                
                <h3>4 сферы применения профайлинга</h3>
                
                <div class="strategy-grid">
                    <div class="strategy-card">
                        <div class="strategy-icon">💼</div>
                        <h4>Бизнес-переговоры</h4>
                        <p>Определение истинных намерений партнеров, выявление манипуляций</p>
                    </div>
                    <div class="strategy-card">
                        <div class="strategy-icon">👥</div>
                        <h4>Подбор персонала</h4>
                        <p>Оценка надежности кандидатов, соответствия корпоративной культуре</p>
                    </div>
                    <div class="strategy-card">
                        <div class="strategy-icon">💑</div>
                        <h4>Личные отношения</h4>
                        <p>Понимание партнера, предотвращение конфликтов, укрепление связей</p>
                    </div>
                    <div class="strategy-card">
                        <div class="strategy-icon">🛡️</div>
                        <h4>Безопасность</h4>
                        <p>Выявление потенциально опасных лиц, профилактика мошенничества</p>
                    </div>
                </div>
                
                <div class="expert-advice">
                    <h4>Профессиональный взгляд</h4>
                    <p>«В бизнесе профайлинг — это конкурентное преимущество. Зная, как читать людей, вы можете предугадывать действия конкурентов, понимать реальные потребности клиентов и создавать эффективные команды. В личной жизни эти навыки помогают избегать токсичных отношений и строить genuine connections.»</p>
                </div>
                
                <div class="action-section">
                    <h3>Хотите научиться читать людей как открытую книгу?</h3>
                    <p>Запишитесь на консультацию по профайлингу</p>
                    <a href="#contact" class="btn btn-primary" id="articleConsultationBtn">Записаться на профайлинг</a>
                </div>
            </div>
        `
    }
};

// Функция для отображения статьи
function showArticle(articleId) {
    const article = articles[articleId];
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
    
    // Показываем модальное окно
    showModal('articleModal');
    
    // Добавляем обработчик закрытия
    document.getElementById('articleModalClose').addEventListener('click', function() {
        hideModal('articleModal');
        document.body.removeChild(modal);
    });
    
    // Добавляем обработчик для кнопки записи на консультацию
    const consultationBtn = document.getElementById('articleConsultationBtn');
    if (consultationBtn) {
        consultationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            hideModal('articleModal');
            document.body.removeChild(modal);
            
            // Прокручиваем к форме
            window.scrollTo({
                top: document.getElementById('contact').offsetTop - 100,
                behavior: 'smooth'
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const articleId = this.getAttribute('data-article');
            showArticle(articleId);
        });
    });
});

// ========== ЧАТ-АССИСТЕНТ ==========

const chatButton = document.getElementById('chatButton');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatSend = document.getElementById('chatSend');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

if (chatButton && chatWindow) {
    chatButton.addEventListener('click', function() {
        chatWindow.classList.toggle('active');
    });
    
    chatClose.addEventListener('click', function() {
        chatWindow.classList.remove('active');
    });
    
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;
    
    // Добавляем сообщение пользователя в чат
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Отправляем сообщение в Telegram и WhatsApp
    sendToTelegram(message);
    sendToWhatsApp(message);
    
    // Имитируем ответ ассистента
    setTimeout(() => {
        const responses = [
            "Спасибо за ваш вопрос! Я передам его специалисту, и он свяжется с вами в ближайшее время.",
            "Интересный вопрос! Давайте обсудим его подробнее на консультации.",
            "Это важная тема. Рекомендую записаться на консультацию для детального обсуждения.",
            "По этому вопросу лучше проконсультироваться лично. Могу помочь с записью на прием."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage(randomResponse, 'bot');
    }, 1000);
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendToTelegram(message) {
    const telegramUrl = `https://t.me/Ivan_Svetlyi?text=${encodeURIComponent('Вопрос с сайта VERITAS CODE: ' + message)}`;
    window.open(telegramUrl, '_blank');
}

function sendToWhatsApp(message) {
    const whatsappUrl = `https://wa.me/79164443963?text=${encodeURIComponent('Вопрос с сайта VERITAS CODE: ' + message)}`;
    window.open(whatsappUrl, '_blank');
}

// ========== ПЛАВНАЯ ПРОКРУТКА ==========

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
        
        // Устанавливаем значение в dropdown
        const dropdown = document.querySelector('.custom-dropdown');
        const selected = dropdown.querySelector('.dropdown-selected span');
        const hiddenInput = dropdown.querySelector('input[type="hidden"]');
        
        let serviceValue = '';
        let serviceText = '';
        
        if (service === 'mediation') {
            serviceValue = 'mediation';
            serviceText = 'Медиация';
        } else if (service === 'psychology') {
            serviceValue = 'crisis';
            serviceText = 'Кризисная психология';
        }
        
        selected.textContent = serviceText;
        hiddenInput.value = serviceValue;
        
        // Добавляем информацию о городе в текстовое поле
        const textarea = document.querySelector('textarea');
        if (textarea) {
            textarea.value = `Интересует консультация ${serviceText.toLowerCase()} в г. ${city}. `;
        }
    });
});

// ========== ОБРАБОТКА ТЕГОВ ИЗ ТЕЛЕГРАМ КАНАЛА ==========

// Обработка кликов на теги в облаке тегов
document.addEventListener('DOMContentLoaded', function() {
    const tags = document.querySelectorAll('.tag');
    
    tags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const tagText = this.textContent;
            
            // Прокручиваем к форме контактов
            window.scrollTo({
                top: document.getElementById('contact').offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Добавляем информацию о теге в текстовое поле
            const textarea = document.querySelector('textarea');
            if (textarea) {
                textarea.value = `Интересует консультация по теме ${tagText}. `;
            }
            
            // Устанавливаем тип услуги "Другое"
            const dropdown = document.querySelector('.custom-dropdown');
            const selected = dropdown.querySelector('.dropdown-selected span');
            const hiddenInput = dropdown.querySelector('input[type="hidden"]');
            
            selected.textContent = 'Другое';
            hiddenInput.value = 'other';
        });
    });
    
    // Обработка кликов на ссылки в карточках тем
    const topicLinks = document.querySelectorAll('.topic-link');
    topicLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Открываем ссылку в новой вкладке
            // Дополнительная аналитика может быть добавлена здесь
            console.log('Переход в Telegram канал по теме');
        });
    });
});

// ========== SEO ОПТИМИЗАЦИЯ ==========

// Динамическое обновление контента на основе популярных запросов
function updateContentBasedOnTrends() {
    // В реальном приложении здесь был бы запрос к API для получения трендов
    const trends = [
        'психолог онлайн',
        'медиация конфликтов',
        'профайлинг бизнес',
        'кризисная психология',
        'расшифровка личности'
    ];
    
    // Обновляем мета-теги
    document.title = `VERITAS CODE | ${trends[0]} | ${trends[1]} | ${trends[2]}`;
    
    // Обновляем description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', `⭐ VERITAS CODE - ${trends[0]}, ${trends[1]}, ${trends[2]}. Профессиональная помощь в решении психологических проблем и конфликтов.`);
    }
    
    // Обновляем keywords на основе тегов из канала
    const tags = Array.from(document.querySelectorAll('.tag')).map(tag => tag.textContent.replace('#', ''));
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && tags.length > 0) {
        const newKeywords = `veritas code, медиатор, психолог, ${tags.slice(0, 5).join(', ')}`;
        metaKeywords.setAttribute('content', newKeywords);
    }
}

// Запускаем обновление контента при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateContentBasedOnTrends();
    
    // Также обновляем каждые 24 часа
    setInterval(updateContentBasedOnTrends, 24 * 60 * 60 * 1000);
});

// ========== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ ==========

console.log('VERITAS CODE psychology website with Telegram channel integration initialized');