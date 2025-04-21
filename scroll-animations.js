// Scroll Animation Script

// Use both DOMContentLoaded and window.onload to ensure the script runs
// This helps with GitHub Pages and other hosting environments
document.addEventListener('DOMContentLoaded', initAnimations);
window.onload = initAnimations;

// Track if animations have been initialized
let animationsInitialized = false;

function initAnimations() {
    // Only run once
    if (animationsInitialized) return;
    animationsInitialized = true;
    
    console.log('Initializing scroll animations');
    
    // Get all elements that should be animated
    const animatedSections = document.querySelectorAll('.hero-section, .courses-section, .news-section, .course-card, .news-item, .latest-news-box');
    
    // Add initial animation classes
    animatedSections.forEach(section => {
        section.classList.add('animate-element');
        section.classList.add('animate-hidden');
    });
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animation
    function handleScrollAnimation() {
        animatedSections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.remove('animate-hidden');
                section.classList.add('animate-visible');
            } else {
                section.classList.remove('animate-visible');
                section.classList.add('animate-hidden');
            }
        });
    }
    
    // Run once on page load to show elements that are already in viewport
    setTimeout(handleScrollAnimation, 100);
    
    // Add scroll event listener with throttling for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                handleScrollAnimation();
                scrollTimeout = null;
            }, 20);
        }
    });
}