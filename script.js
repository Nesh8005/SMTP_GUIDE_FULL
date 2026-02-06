document.addEventListener('DOMContentLoaded', () => {
    // Add copy functionality to all copy buttons
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const container = btn.closest('.code-container');
            const code = container.querySelector('pre').innerText;

            navigator.clipboard.writeText(code).then(() => {
                const originalText = btn.innerText;
                btn.innerText = 'Copied!';
                btn.style.background = '#10b981';
                btn.style.borderColor = '#10b981';
                btn.style.color = 'white';

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.style.borderColor = '';
                    btn.style.color = '';
                }, 2000);
            });
        });
    });

    // Scroll Spy for sidebar
    const sections = document.querySelectorAll('section, .card');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animation on scroll (Simple version)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});
