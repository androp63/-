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

// Обработчики для ссылок в футере
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
    
    // Обработчики для кнопок закрытия модальных окон
    document.getElementById('privacyPolicyClose').addEventListener('click', function() {
        hideModal('privacyPolicyModal');
    });
    
    document.getElementById('termsOfUseClose').addEventListener('click', function() {
        hideModal('termsOfUseModal');
    });
    
    document.getElementById('dataProcessingClose').addEventListener('click', function() {
        hideModal('dataProcessingModal');
    });
    
    document.getElementById('cookiePolicyClose').addEventListener('click', function() {
        hideModal('cookiePolicyModal');
    });
    
    // Обработчики для статей
    document.getElementById('mediationConflictsClose').addEventListener('click', function() {
        hideModal('mediation-conflicts-article');
    });
    
    document.getElementById('personalityCodeClose').addEventListener('click', function() {
        hideModal('personality-code-article');
    });
    
    document.getElementById('profilingBusinessClose').addEventListener('click', function() {
        hideModal('profiling-business-article');
    });
    
    // Закрытие модальных окон при клике вне их
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            hideModal(e.target.id);
        }
    });
});

// ========== ФУНКЦИОНАЛ "ЧИТАТЬ ДАЛЕЕ" ==========

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const articleId = this.getAttribute('data-article');
            
            // Показываем соответствующую статью
            if (articleId === 'mediation-conflicts') {
                showModal('mediation-conflicts-article');
            } else if (articleId === 'personality-code') {
                showModal('personality-code-article');
            } else if (articleId === 'profiling-business') {
                showModal('profiling-business-article');
            }
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
    
    // Показываем выбор способа отправки
    showSendOptions(message);
    
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

function showSendOptions(message) {
    // Создаем модальное окно для выбора способа отправки
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'sendOptionsModal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" id="sendOptionsClose">
                <i class="fas fa-times"></i>
            </button>
            <h2 class="modal-title">Выберите способ связи</h2>
            <div class="modal-section">
                <p class="modal-text">Как вы хотите отправить свой вопрос?</p>
                <div class="strategy-grid">
                    <div class="strategy-card send-option" data-type="telegram">
                        <div class="strategy-icon"><i class="fab fa-telegram-plane"></i></div>
                        <h4>Telegram</h4>
                        <p>Быстрая связь через мессенджер</p>
                    </div>
                    <div class="strategy-card send-option" data-type="whatsapp">
                        <div class="strategy-icon"><i class="fab fa-whatsapp"></i></div>
                        <h4>WhatsApp</h4>
                        <p>Альтернативный способ связи</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Показываем модальное окно
    showModal('sendOptionsModal');
    
    // Добавляем обработчики для выбора способа
    document.querySelectorAll('.send-option').forEach(option => {
        option.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            if (type === 'telegram') {
                sendToTelegram(message);
            } else if (type === 'whatsapp') {
                sendToWhatsApp(message);
            }
            hideModal('sendOptionsModal');
            document.body.removeChild(modal);
        });
    });
    
    // Добавляем обработчик закрытия
    document.getElementById('sendOptionsClose').addEventListener('click', function() {
        hideModal('sendOptionsModal');
        document.body.removeChild(modal);
    });
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

console.log('VERITAS CODE psychology website with all features initialized');