document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            const isVisible = navLinks.getAttribute('data-visible') === 'true';
            
            if (!isVisible) {
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
    
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    if (darkModeToggle) {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            updateDarkModeIcon(true);
        }
        
        darkModeToggle.addEventListener('click', function() {
            const darkModeActive = document.body.classList.toggle('dark-mode');
            
            updateDarkModeIcon(darkModeActive);
            localStorage.setItem('darkMode', darkModeActive);
        });
    }
    
    function updateDarkModeIcon(isDarkMode) {
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        
        if (darkModeToggle) {
            if (isDarkMode) {
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }
    }
    
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 767) {
            const isNavbarVisible = navLinks && navLinks.getAttribute('data-visible') === 'true';
            const isClickInsideNavbar = navLinks && navLinks.contains(event.target);
            const isClickOnHamburger = hamburgerMenu && hamburgerMenu.contains(event.target);
            
            if (isNavbarVisible && !isClickInsideNavbar && !isClickOnHamburger) {
                navLinks.setAttribute('data-visible', 'false');
                if (hamburgerIcon) hamburgerIcon.setAttribute('data-visible', 'true');
                if (closeIcon) closeIcon.setAttribute('data-visible', 'false');
            }
        }
    });
});