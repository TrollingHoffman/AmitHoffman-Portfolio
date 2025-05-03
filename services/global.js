document.addEventListener('DOMContentLoaded', function() {

    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const hamburgerIcon = document.querySelector('.fa-bars-staggered');
    const closeIcon = document.querySelector('.fa-xmark');
    
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            let isVisible = navLinks.getAttribute('data-visible');
            
            if (isVisible === 'false') {
                navLinks.setAttribute('data-visible', 'true');
                hamburgerIcon.setAttribute('data-visible', 'false');
                closeIcon.setAttribute('data-visible', 'true');
            } else {
                navLinks.setAttribute('data-visible', 'false');
                hamburgerIcon.setAttribute('data-visible', 'true');
                closeIcon.setAttribute('data-visible', 'false');
            }
        });
    }
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    if (!document.querySelector('.dark-mode-toggle')) {
        const darkModeToggle = document.createElement('button');
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.innerHTML = '🌙'; 
        document.body.appendChild(darkModeToggle);
        
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '☀️'; 
        }
        
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                darkModeToggle.innerHTML = '☀️'; 
                localStorage.setItem('theme', 'dark');
            } else {
                darkModeToggle.innerHTML = '🌙'; 
                localStorage.setItem('theme', 'light');
            }
        });
    }
});