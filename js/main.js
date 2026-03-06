// Современный JavaScript функционал для главной страницы Huddle

// DOM Элементы
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const heroSection = document.querySelector('.hero');
const statsSection = document.querySelector('.stats');
const testimonialsSection = document.querySelector('.testimonials');
const newsletterForm = document.getElementById('newsletter-form');
const emailInput = document.getElementById('email-input');
const successMessage = document.getElementById('success-message');

// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer для анимаций при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применение анимаций к секциям
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Обработка формы подписки
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showFormMessage('Пожалуйста, введите ваш email', 'error');
            return;
        }
        
        if (!emailRegex.test(email)) {
            showFormMessage('Пожалуйста, введите корректный email адрес', 'error');
            return;
        }
        
        // Имитация API запроса
        setTimeout(() => {
            showFormMessage(`Спасибо! Мы отправили письмо на ${email}`, 'success');
            emailInput.value = '';
        }, 1000);
    });
}

function showFormMessage(message, type) {
    if (successMessage) {
        successMessage.textContent = message;
        successMessage.className = `form-message ${type}`;
        successMessage.style.display = 'block';
        
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
}

// Функционал переключения темной темы
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        
        if (body.classList.contains('dark-theme')) {
            icon.classList.remove('bx-sun');
            icon.classList.add('bx-moon');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('bx-moon');
            icon.classList.add('bx-sun');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Проверка сохраненных настроек темы
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('bx-sun');
        icon.classList.add('bx-moon');
    }
}

// Параллакс-эффект для главной секции
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const parallaxSpeed = scrolled * 0.5;
        hero.style.transform = `translateY(${parallaxSpeed}px)`;
    }
});

// Эффект печатающей машинки для заголовка
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Инициализация эффекта печатающей машинки если заголовок существует
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 50);
    }, 1000);
}

// Адаптивное меню навигации
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Ленивая загрузка изображений
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.removeAttribute('loading');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Плавающая кнопка "Наверх"
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.display = 'none';

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Улучшения доступности
document.addEventListener('DOMContentLoaded', () => {
    // Добавление ARIA меток
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        if (!btn.getAttribute('aria-label')) {
            btn.setAttribute('aria-label', btn.textContent || 'Кнопка');
        }
    });
    
    // Добавление ссылки для пропуска навигации
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Перейти к основному содержанию';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '10px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-50px';
    });
});

// Оптимизация производительности: Debounce для событий изменения размера
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedResize = debounce(() => {
    // Эффективная обработка событий изменения размера окна
    console.log('Окно изменено');
}, 250);

window.addEventListener('resize', debouncedResize);

// Приветственное сообщение в консоли
console.log(`
🚀 Главная страница Huddle загружена!
✨ Современные функции активированы:
   • Плавная навигация по якорям
   • Переключение темной темы
   • Анимации при прокрутке
   • Валидация формы подписки
   • Адаптивный дизайн
   • Улучшения доступности
   • Оптимизация производительности
`);


