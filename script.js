// script.js

/**
 * Scroll Reveal Animation
 * This code finds all elements with the class 'reveal' and adds the
 * 'visible' class to them when they enter the viewport.
 */
const revealElements = document.querySelectorAll('.reveal');

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // If the element is intersecting (visible on screen)
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once it's visible
        }
    });
}, {
    root: null, // relative to the viewport
    threshold: 0.1 // 10% of the item must be visible to trigger
});

// Observe each .reveal element
revealElements.forEach(el => {
    sectionObserver.observe(el);
});


// ----------------------------------------------------------------------------
/**
 * Project Carousel Slider
 */
document.addEventListener('DOMContentLoaded', () => {

    // More specific selectors to avoid conflicts
    const cards = document.querySelectorAll('.project-section .gallery .cards li');
    const prevButton = document.querySelector('.project-section .gallery .prev');
    const nextButton = document.querySelector('.project-section .gallery .next');

    // Check if the elements exist before adding listeners
    if (cards.length > 0 && prevButton && nextButton) {

        const cardCount = cards.length;
        let activeIndex = 0;

        // --- Settings for the animation ---
        const mainCard = {
            transform: 'translateX(0) scale(1)',
            opacity: 1,
            zIndex: 10
        };

        const sideCard = {
            scale: 0.7,
            opacity: 0.7,
            zIndex: 5
        };

        const hiddenCard = {
            scale: 0.5,
            opacity: 0,
            zIndex: 1
        };

        // NEW: Increased offsets for larger cards
        const xOffset = '15rem';
        const xOffsetHidden = '25rem';
        // --- End Settings ---


        function updateCardPositions() {
            cards.forEach((card, i) => {

                let offset = i - activeIndex;

                if (offset > cardCount / 2) {
                    offset -= cardCount;
                } else if (offset < -cardCount / 2) {
                    offset += cardCount;
                }

                switch (offset) {
                    case 0:
                        card.style.transform = mainCard.transform;
                        card.style.opacity = mainCard.opacity;
                        card.style.zIndex = mainCard.zIndex;
                        break;
                    case 1:
                        card.style.transform = `translateX(${xOffset}) scale(${sideCard.scale})`;
                        card.style.opacity = sideCard.opacity;
                        card.style.zIndex = sideCard.zIndex;
                        break;
                    case -1:
                        card.style.transform = `translateX(-${xOffset}) scale(${sideCard.scale})`;
                        card.style.opacity = sideCard.opacity;
                        card.style.zIndex = sideCard.zIndex;
                        break;
                    default:
                        const x = offset > 1 ? xOffsetHidden : `-${xOffsetHidden}`;
                        card.style.transform = `translateX(${x}) scale(${hiddenCard.scale})`;
                        card.style.opacity = hiddenCard.opacity;
                        card.style.zIndex = hiddenCard.zIndex;
                        break;
                }
            });
        }

        // --- Button Controls ---
        nextButton.addEventListener('click', () => {
            activeIndex = (activeIndex + 1) % cardCount;
            updateCardPositions();
        });

        prevButton.addEventListener('click', () => {
            activeIndex = (activeIndex - 1 + cardCount) % cardCount;
            updateCardPositions();
        });

        // Set the initial positions
        updateCardPositions();

    } // End if elements exist

});

// --- tsParticles Initialization (Updated for Multicolor/Repulse Effect) ---

tsParticles.load("tsparticles", {
    fpsLimit: 60,
    particles: {
        number: {
            value: 80, // Keep particle count moderate
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            // NEW: Array of colors for particles
            value: ["#ff6347", "#ffbd2e", "#8fde5d", "#4682b4", "#9370db"] 
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.6, // Slightly higher opacity
            random: { enable: true, minimumValue: 0.2 }, // Opacity variation
        },
        size: {
            value: 3, // Keep size small
            random: { enable: true, minimumValue: 1 },
        },
        links: {
            enable: true,
            distance: 150,
            // NEW: Use particle color for links
            color: "random", // Takes color from one of the linked particles
            opacity: 0.4,
            width: 1,
            // NEW: Add warp effect to links (optional, can be performance intensive)
            // warp: true 
        },
        move: {
            enable: true,
            speed: 2, // Slightly faster speed
            direction: "none",
            random: true, // Random movement
            straight: false,
            out_mode: "out",
            bounce: false,
        },
        // NEW: Twinkle effect
        twinkle: {
            particles: {
                enable: true,
                frequency: 0.05, // How often particles twinkle
                opacity: 1 // Opacity when twinkling
            }
        }
    },
    interactivity: {
        detect_on: "window",
        events: {
            onhover: {
                enable: true,
                mode: "repulse" // CHANGED: Stronger cursor reaction
            },
            onclick: {
                enable: true, 
                mode: "push" // Keep push on click
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 150, // Increase repulse distance
                duration: 0.4,
                factor: 100, // Strength of repulse
                speed: 1,
                maxSpeed: 50,
                easing: "ease-out-quad"
            },
            push: {
                particles_nb: 4 
            },
            // Keep bubble settings if you want to switch back easily
            bubble: { 
                distance: 150,
                size: 3,       
                duration: 2,   
                opacity: 0.8,
            },
        }
    },
    retina_detect: true,
    background: {
        color: 'transparent' // Keep background transparent
    }
});