// Gorecraft Site JavaScript

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll için navigation linkleri
    initSmoothScroll();
    
    // Animasyonları başlat
    initAnimations();
    
    // Scroll efekti
    initScrollEffects();
});

// Smooth scroll fonksiyonu
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// İndirme fonksiyonu
function downloadGame() {
    // İndirme butonunu bul
    const downloadButtons = document.querySelectorAll('.btn-primary, .btn-download');
    
    // Loading efekti ekle
    downloadButtons.forEach(button => {
        if (button.textContent.includes('İndir')) {
            const originalText = button.innerHTML;
            button.innerHTML = '<span class="btn-icon">⏳</span> İndiriliyor...';
            button.disabled = true;
            
            // Simüle edilmiş indirme süreci
            setTimeout(() => {
                // İndirme linki oluştur
                const link = document.createElement('a');
                link.href = 'gorecraft2.0.txt'; // Dosya yolu
                link.download = 'gorecraft2.0.txt';
                link.style.display = 'none';
                
                // Link'i sayfaya ekle ve tıkla
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Buton text'ini geri dön
                button.innerHTML = '<span class="btn-icon">✅</span> İndirildi!';
                
                // 2 saniye sonra buton text'ini normale dön
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                }, 2000);
            }, 1500);
        }
    });
    
    // İndirme başlangıcı bildirimi
    showNotification('Gorecraft 2.0 indiriliyor...', 'info');
}

// Bildirim fonksiyonu
function showNotification(message, type = 'success') {
    // Bildirim elementi oluştur
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
        <span class="notification-message">${message}</span>
    `;
    
    // Bildirim stilleri
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #4CAF50, #8BC34A)' : type === 'error' ? 'linear-gradient(135deg, #f44336, #e91e63)' : 'linear-gradient(135deg, #2196F3, #03A9F4)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Sayfaya ekle
    document.body.appendChild(notification);
    
    // Animasyon ile göster
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 3 saniye sonra kaldır
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Animasyonları başlat
function initAnimations() {
    // Feature kartları için görünüm animasyonu
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
    
    // Feature kartları için başlangıç stilleri
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Scroll efektleri
function initScrollEffects() {
    // Navbar scroll efekti
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(26, 26, 46, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(26, 26, 46, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Parallax efekti için hero section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero && heroContent) {
            heroContent.style.transform = `translateY(${rate * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled * 0.001);
        }
        
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${rate * 0.5}px) rotate(${scrolled * 0.1}deg)`;
        }
    });
}

// Mouse takip efekti (optional)
document.addEventListener('mousemove', (e) => {
    const blocks = document.querySelectorAll('.block');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    blocks.forEach((block, index) => {
        const speed = (index + 1) * 10;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        
        block.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// Buton hover efektleri
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// İletişim linkleri için tıklama olayları
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.textContent.trim();
        
        // Buraya gerçek iletişim linkleri eklenebilir
        switch(platform) {
            case 'Discord':
                showNotification('Discord sunucumuza katılmak için tıklayın!', 'info');
                // window.open('https://discord.gg/gorecraft', '_blank');
                break;
            case 'E-posta':
                showNotification('E-posta adresimiz: info@gorecraft.com', 'info');
                // window.open('mailto:info@gorecraft.com', '_blank');
                break;
            case 'Twitter':
                showNotification('Twitter adresimiz: @gorecraft', 'info');
                // window.open('https://twitter.com/gorecraft', '_blank');
                break;
        }
    });
});

// Klavye kısayolları
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + D ile indirme
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        downloadGame();
    }
    
    // ESC ile bildirimleri kapat
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }
});

// Sayfa yüklenme animasyonu
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performans optimizasyonu - debounce fonksiyonu
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

// Scroll olayları için debounce kullan
const debouncedScroll = debounce(() => {
    // Scroll ile ilgili işlemler burada
}, 10);

window.addEventListener('scroll', debouncedScroll);
