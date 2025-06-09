/**
 * Bodens Digitala Medborgarplattform
 * Huvudsaklig JavaScript-fil
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobil meny
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }
    
    // Språkväljare
    const languageSelect = document.getElementById('language-select');
    const languageLinks = document.querySelectorAll('.language-links a');
    
    // Funktion för att byta språk
    window.changeLanguage = function() {
        const selectedLang = languageSelect.value;
        setLanguage(selectedLang);
    };
    
    // Sätt språk baserat på val
    function setLanguage(lang) {
        // Spara valt språk i localStorage
        localStorage.setItem('preferredLanguage', lang);
        
        // För demo-syfte visar vi bara en alert
        alert('Språk ändrat till: ' + getLanguageName(lang));
        
        // I en riktig implementation skulle vi ladda översättningar här
        // och uppdatera alla texter på sidan
    }
    
    // Få språknamn baserat på språkkod
    function getLanguageName(langCode) {
        const languages = {
            'sv': 'Svenska',
            'en': 'English',
            'fi': 'Suomi',
            'ar': 'العربية',
            'fa': 'فارسی'
        };
        return languages[langCode] || langCode;
    }
    
    // Lägg till klickhändelser för språklänkar i footern
    if (languageLinks) {
        languageLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                setLanguage(lang);
                
                // Uppdatera select-elementet också
                if (languageSelect) {
                    languageSelect.value = lang;
                }
            });
        });
    }
    
    // Sätt språk från localStorage om det finns
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && languageSelect) {
        languageSelect.value = savedLanguage;
    }
    
    // Karusell för utvalda restauranger och aktiviteter
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (carousel && prevBtn && nextBtn) {
        const itemWidth = carousel.querySelector('.carousel-item').offsetWidth + 32; // Inkluderar gap
        const visibleItems = Math.floor(carousel.offsetWidth / itemWidth);
        
        prevBtn.addEventListener('click', function() {
            carousel.scrollBy({
                left: -itemWidth * visibleItems,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', function() {
            carousel.scrollBy({
                left: itemWidth * visibleItems,
                behavior: 'smooth'
            });
        });
    }
    
    // Sökfunktion
    const searchForm = document.querySelector('.search');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('input').value.trim();
            
            if (searchTerm) {
                // Här skulle vi normalt skicka sökningen till en backend
                // För demo-syfte visar vi bara en alert
                alert('Söker efter: ' + searchTerm);
            }
        });
    }
    
    // Animera in element när de blir synliga
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.category-card, .news-card, .service-card, .carousel-item, .sponsored-card, .opportunity-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            // Om elementet är synligt i viewporten
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    };
    
    // Kör animationen när sidan laddas och vid scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Lägg till aktiv-klass på aktuell sida i navigationen
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Bokningsfunktionalitet för demo
    const bookingButtons = document.querySelectorAll('a[href="#"][class*="btn"]:not(.btn-outline)');
    
    bookingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // För demo-syfte visar vi bara en alert
            if (this.textContent.includes('Boka')) {
                alert('Bokningssystem: Detta skulle öppna ett bokningsformulär. För varje bokning via plattformen skulle en liten avgift tas ut.');
            } else if (this.textContent.includes('Köp')) {
                alert('Biljettsystem: Detta skulle öppna ett köpformulär för biljetter. För varje biljett som säljs via plattformen skulle en liten avgift tas ut.');
            }
        });
    });
});

