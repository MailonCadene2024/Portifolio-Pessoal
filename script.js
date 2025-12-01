// JavaScript do meu portfólio - Mailon
// Tentei deixar bem comentado pra não me perder depois haha

// Espera a página carregar completamente antes de executar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Site carregado! Vamos lá...'); // deixei um log pra debug
    
    // Inicializar todas as funções
    initNavigation();
    initThemeToggle();
    initMobileMenu();
    initContactForm();
    initScrollAnimations();
    initSkillBars();
    
    // mensagem secreta no console hehe
    console.log('%c Olá! 👋 ', 'color: #6366f1; font-size: 20px; font-weight: bold;');
    console.log('Se você está vendo isso, provavelmente entende de código!');
    console.log('Entre em contato comigo: meu-email@exemplo.com');
});

// === NAVEGAÇÃO ===
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Destaque do menu conforme a seção ativa
    function highlightActiveSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // se a posição do scroll está na seção atual
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        // remove a classe active de todos e adiciona no atual
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // escuta o scroll
    window.addEventListener('scroll', highlightActiveSection);
    
    // scroll suave quando clicar nos links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // offset pra compensar o header fixo
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // fecha o menu mobile se estiver aberto
            const navMenu = document.querySelector('.nav-menu');
            const menuToggle = document.querySelector('.menu-toggle');
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// === TEMA CLARO/ESCURO ===
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const body = document.body;
    
    // verifica se já tem uma preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.toggle('dark-theme', savedTheme === 'dark');
        updateThemeIcon();
    } else {
        // se não tem preferência, usa o tema do sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            body.classList.add('dark-theme');
            updateThemeIcon();
        }
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        updateThemeIcon();
        
        // salva a preferência
        const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
        
        console.log(`Tema alterado para: ${currentTheme}`); // debug
    });
    
    function updateThemeIcon() {
        const isDark = body.classList.contains('dark-theme');
        themeIcon.textContent = isDark ? '☀️' : '🌙';
    }
}

// === MENU MOBILE ===
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', function() {
        // toggle das classes ativas
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        console.log('Menu mobile toggled'); // debug
    });
    
    // fecha o menu quando clicar fora dele
    document.addEventListener('click', function(e) {
        const isClickInsideMenu = navMenu.contains(e.target);
        const isClickOnToggle = menuToggle.contains(e.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// === FORMULÁRIO DE CONTATO ===
function initContactForm() {
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Formulário enviado!');
        
        // limpa erros anteriores
        clearErrors();
        
        // pega os valores dos campos
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        
        let hasErrors = false;
        
        // validações simples
        if (nome.length < 2) {
            showError('nomeError', 'Nome deve ter pelo menos 2 caracteres');
            hasErrors = true;
        }
        
        if (!isValidEmail(email)) {
            showError('emailError', 'Por favor, insira um e-mail válido');
            hasErrors = true;
        }
        
        if (mensagem.length < 10) {
            showError('mensagemError', 'Mensagem deve ter pelo menos 10 caracteres');
            hasErrors = true;
        }
        
        // se não tem erros, "envia" o formulário
        if (!hasErrors) {
            // simula o envio (loading)
            showLoading(true);
            
            // simula delay de envio (2 segundos)
            setTimeout(() => {
                showLoading(false);
                clearForm();
                showSuccessModal();
                console.log('Mensagem "enviada" com sucesso!');
            }, 2000);
        }
    });
    
    // fecha o modal
    closeModal.addEventListener('click', function() {
        modal.classList.remove('show');
    });
    
    // fecha o modal clicando fora dele
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
    
    // funções auxiliares do formulário
    function isValidEmail(email) {
        // regex simples pra validar email - peguei no stackoverflow
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        const inputElement = errorElement.parentNode.querySelector('input, textarea');
        
        errorElement.textContent = message;
        inputElement.classList.add('error');
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        const inputElements = document.querySelectorAll('input, textarea');
        
        errorElements.forEach(el => el.textContent = '');
        inputElements.forEach(el => el.classList.remove('error'));
    }
    
    function showLoading(show) {
        const btnText = document.querySelector('.btn-text');
        const btnLoading = document.querySelector('.btn-loading');
        const submitBtn = document.querySelector('.btn-submit');
        
        if (show) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
        } else {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    }
    
    function clearForm() {
        document.getElementById('nome').value = '';
        document.getElementById('email').value = '';
        document.getElementById('mensagem').value = '';
    }
    
    function showSuccessModal() {
        modal.classList.add('show');
    }
}

// === ANIMAÇÕES NO SCROLL ===
function initScrollAnimations() {
    // observer para animar elementos quando entram na tela
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // anima as barras de habilidade quando a seção aparece
                    if (entry.target.classList.contains('skills-section')) {
                        animateSkillBars();
                    }
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );
    
    // observa os elementos que vão ser animados
    const animateElements = document.querySelectorAll('.education-card, .project-card, .contact-item, .skills-section');
    animateElements.forEach(el => observer.observe(el));
}

// === BARRAS DE HABILIDADE ===
function initSkillBars() {
    // essa função vai ser chamada pelo scroll animation
    console.log('Skill bars inicializadas');
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const progress = bar.getAttribute('data-progress');
        
        // delay diferente pra cada barra
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, index * 200); // 200ms de delay entre cada uma
    });
    
    console.log('Animando barras de habilidade...');
}

// === EFEITOS EXTRAS ===

// smooth scroll para navegadores mais antigos (fallback)
function smoothScrollTo(target) {
    const startPosition = window.pageYOffset;
    const targetPosition = target.offsetTop - 80; // offset do header
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;
    
    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    // função de easing (copiei de um tutorial)
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// detecta se é mobile pra aplicar algumas otimizações
function isMobile() {
    return window.innerWidth <= 768;
}

// redimensiona a janela (útil pra responsivo)
window.addEventListener('resize', function() {
    // fecha menu mobile se mudar pra desktop
    if (!isMobile()) {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// tratamento de erros básico
window.addEventListener('error', function(e) {
    console.error('Ops! Algo deu errado:', e.error);
    // em produção, poderia enviar pra um serviço de monitoramento
});

// previne o zoom duplo clique no iOS
document.addEventListener('touchend', function(e) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

let lastTouchEnd = 0;

// === FUNÇÕES UTILITÁRIAS ===

// debounce function (útil pra scroll)
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// função pra pegar cookies (caso precise depois)
function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

// função pra setar cookies
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// console arte (só por diversão)
console.log(`
   _____ ____    ____     ____  _____   ____   ______   ________  ____     ____  ____     ____  
  |     |    |  |    \\   |    ||     | |    | /      | |        ||    |   |    | \\   \\   /   /  
  |   __| |  |  |  _  \\   |  | |   __| |  | | |  |  | | |   _____| |  |    |  |    \\   \\ /   /   
  |  |___ |  |  |  | |  | |  | |  |___ |  | | |  |  | | |  |___    |  |    |  |     \\   V   /    
  |  ___| |  |  |  |_/  | |  | |  ___| |  | | |  |_|  | |    __|   |  |    |  |      \\     /     
  |  |    |  |  |   ___/  |  | |  |    |  | | |       | |   |      |  |    |  |       |   |      
  |__|    |__|  |__|     |__| |__|    |__|     \_____/  |___|     |__|    |__|       |___|      
                                                                                                  
  Desenvolvido com ❤️ por Mailon
  Tecnologias: HTML5, CSS3, JavaScript (Vanilla)
`);

console.log('Ah, e se você quiser dar uma olhada no código, está tudo no GitHub! 🚀');