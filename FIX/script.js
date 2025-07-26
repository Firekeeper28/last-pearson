        document.addEventListener('DOMContentLoaded', function() {
            const mobileToggle = document.getElementById('mobile-toggle');
            const navMenu = document.getElementById('nav-menu');

            if (mobileToggle && navMenu) {
                mobileToggle.addEventListener('click', function() {
                    navMenu.classList.toggle('active');
                });

                // Close menu when a link is clicked (for smoother mobile experience)
                navMenu.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        if (navMenu.classList.contains('active')) {
                            navMenu.classList.remove('active');
                        }
                    });
                });
            }

            // Optional: Add a class to the header on scroll for styling changes
            const header = document.getElementById('top-header');
            if (header) {
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 50) { // Adjust scroll threshold as needed
                        header.classList.add('header-scrolled');
                    } else {
                        header.classList.remove('header-scrolled');
                    }
                });
            }
        });
        document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('top-header');
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Hero animations
    const tl = gsap.timeline();

    tl.to('.h-land-para', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
    })
    .to('.stats-container', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.5')
    .to('.main-btns', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.3');

    // Counter animation for stats
    function animateCounter(element, target) {
        gsap.to(element, {
            innerHTML: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            onUpdate: function() {
                element.innerHTML = Math.ceil(element.innerHTML);
            }
        });
    }

    // Animate counters when they come into view
    ScrollTrigger.batch('.stat-number', {
        onEnter: (elements) => {
            elements.forEach(el => {
                const target = el.getAttribute('data-count');
                animateCounter(el, target);
            });
        },
        start: 'top 80%'
    });

    // Climate stats animations
    gsap.utils.toArray('.climate-stat').forEach((stat, index) => {
        gsap.to(stat, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Section titles animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.to(title, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Destination cards animation
    gsap.utils.toArray('.destination-card').forEach((card, index) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Calculator form animation
    gsap.to('.calculator-form', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.calculator-form',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: 'power2.inOut'
                });
            }
        });
    });

    // Parallax effect for hero background
    gsap.to('.landing-part', {
        backgroundPosition: '50% 100%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.landing-part',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Button hover animations
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Initialize both subscription forms on DOMContentLoaded
    handleSubscription('heroSubscriptionForm', 'heroEmail', 'heroSubscribeBtn', 'heroMessage');
    handleSubscription('footerSubscriptionForm', 'footerEmail', 'footerSubscribeBtn', 'footerMessage');
});
document.addEventListener('DOMContentLoaded', () => {
    const destinationCards = document.querySelectorAll('.destination-card');

    destinationCards.forEach(card => {
        const learnMoreButton = card.querySelector('.learn-more-button');
        const closeDetailsButton = card.querySelector('.close-details-button');
        const destinationDetails = card.querySelector('.destination-details');

        // Function to expand the card
        const expandCard = () => {
            card.classList.add('expanded'); // Add expanded class to the main card
            destinationDetails.classList.add('expanded'); // Add expanded to the details content

            // Calculate the total height of the content to be revealed
            // This is crucial for a smooth max-height transition
            const scrollHeight = destinationDetails.scrollHeight;
            destinationDetails.style.maxHeight = `${scrollHeight + 50}px`; // Add buffer for padding/margins
        };

        // Function to collapse the card
        const collapseCard = () => {
            destinationDetails.classList.remove('expanded'); // Remove expanded from details content
            card.classList.remove('expanded'); // Remove expanded from the main card

            // Temporarily set max-height to its current scrollHeight
            // before setting to 0, to ensure a smooth transition back.
            // This small delay prevents a 'jump' before collapsing.
            destinationDetails.style.maxHeight = `${destinationDetails.scrollHeight}px`;
            setTimeout(() => {
                destinationDetails.style.maxHeight = '0';
            }, 10); // A very small delay
        };

        if (learnMoreButton) {
            learnMoreButton.addEventListener('click', expandCard);
        }

        if (closeDetailsButton) {
            closeDetailsButton.addEventListener('click', collapseCard);
        }

        // Optional: If you want to click anywhere on the header to toggle
        // const cardHeader = card.querySelector('.destination-header');
        // if (cardHeader) {
        //     cardHeader.addEventListener('click', (event) => {
        //         // Prevent accidental toggling if a button inside was clicked
        //         if (event.target.tagName === 'BUTTON') {
        //             return;
        //         }
        //         if (card.classList.contains('expanded')) {
        //             collapseCard();
        //         } else {
        //             expandCard();
        //         }
        //     });
        // }
    });
});

// Carbon Calculator Functionality
document.getElementById('carbon-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const destination = document.getElementById('destination').value;
    const transport = document.getElementById('transport').value;
    const duration = document.getElementById('duration').value;

    // Simple calculation (in real app, this would be more complex)
    let baseEmission = 0;

    switch (transport) {
        case 'flight': baseEmission = 250; break;
        case 'train': baseEmission = 50; break;
        case 'bus': baseEmission = 80; break;
        case 'car': baseEmission = 120; break;
    }

    const totalEmission = (baseEmission * duration * 0.1).toFixed(1);
    const offsetCost = (totalEmission * 0.02).toFixed(2);

    document.getElementById('result-text').innerHTML = `
        Your trip will generate approximately <strong>${totalEmission} kg CO2</strong>.<br>
        Offset cost: <strong>$${offsetCost}</strong>
    `;

    document.getElementById('result').style.display = 'block';

    // Animate result appearance
    gsap.fromTo('#result',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 }
    );
});

// Loading animation
window.addEventListener('load', function() {
    gsap.to('#loading', {
        opacity: 0,
        duration: 0.5,
        delay: 1,
        onComplete: function() {
            document.getElementById('loading').classList.add('hidden');
            initAnimations(); // Call initAnimations after loading animation completes
        }
    });
});

function initAnimations() {
    // Progress bar animation
    gsap.to('#progress', {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
        }
    });

    // Climate section header animation
    gsap.to('.section-header', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
    });

    // Climate cards staggered animation
    gsap.utils.toArray('.climate-card').forEach((card, index) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2 + (index * 0.1),
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            }
        });

        // Add floating animation to icons
        gsap.to(card.querySelector('.icon'), {
            y: -5,
            duration: 2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: -1,
            delay: index * 0.2
        });
    });

    // Sustainable section header animation
    gsap.to('.sustainable-header', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.sustainable-header',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Sustainable cards animation
    gsap.utils.toArray('.sustainable-card').forEach((card, index) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            }
        });

        // Add pulse animation to icons
        gsap.to(card.querySelector('.icon-container'), {
            scale: 1.1,
            duration: 2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: -1,
            delay: index * 0.5
        });
    });

    // Parallax effect for climate section background
    // Note: This targets a pseudo-element which requires CSS for parallax effect
    // For JS-controlled parallax, you might animate the background-position directly on the element
    gsap.to('.climate-section::before', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.climate-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });

    // Card hover animations
    document.querySelectorAll('.climate-card, .sustainable-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Emoji animation
    gsap.to('.emoji', {
        rotation: 360,
        duration: 4,
        ease: 'none',
        repeat: -1
    });

    // Text reveal animation for list items
    gsap.utils.toArray('.sustainable-card li').forEach((item, index) => {
        gsap.fromTo(item,
            { opacity: 0, x: -20 },
            {
                opacity: 1,
                x: 0,
                duration: 0.5,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    end: 'bottom 10%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show message function
function showMessage(messageElement, text, type) {
    messageElement.textContent = text;
    messageElement.className = `message ${type}`;
    messageElement.style.display = 'block';

    // Hide message after 5 seconds
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 5000);
}

// Simulate API call
function subscribeUser(email) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Simulate random success/failure for demo
            if (Math.random() > 0.2) {
                resolve({ success: true, message: 'Successfully subscribed!' });
            } else {
                reject({ success: false, message: 'Subscription failed. Please try again.' });
            }
        }, 1500);
    });
}

// Handle form submission
// Helper function to show messages
function showMessage(element, message, type) {
    element.textContent = message;
    element.className = 'message ' + type; // Adds 'message' and either 'success' or 'error' class
    element.style.display = 'block'; // Make sure the message is visible
}

// Helper function to validate email (already present)
function isValidEmail(email) {
    // Basic regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Simulated subscription function (no backend call)
async function subscribeUser(email) {
    return new Promise(resolve => {
        // Simulate a very quick "processing" time
        setTimeout(() => {
            resolve();
        }, 500); // Shorter delay for instant feel
    });
}

function handleSubscription(formId, emailId, btnId, messageId) {
    const form = document.getElementById(formId);
    const emailInput = document.getElementById(emailId);
    const submitBtn = document.getElementById(btnId);
    const messageElement = document.getElementById(messageId);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();

        // Reset previous error states
        emailInput.classList.remove('error');
        messageElement.style.display = 'none'; // Hide previous messages immediately

        // Validate email
        if (!email) {
            showMessage(messageElement, 'Please enter your email address.', 'error');
            emailInput.classList.add('error');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage(messageElement, 'Please enter a valid email address.', 'error');
            emailInput.classList.add('error');
            return;
        }

        // Show loading state immediately
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;
        showMessage(messageElement, 'Subscribing...', 'info'); // Add an 'info' class for loading if you like

        try {
            // Simulate API call (this is still just a timer)
            await subscribeUser(email);

            // Success message
            showMessage(messageElement, 'Thank you for subscribing! 🎉', 'success');
            emailInput.value = ''; // Clear input on success

            // Update community count only for the hero form
            const countElement = document.querySelector('.community-count');
            if (countElement && formId === 'heroSubscriptionForm') {
                const currentCount = parseInt(countElement.textContent.match(/\d+/)[0]);
                countElement.textContent = `Join ${currentCount + 1}+ conscious travelers making a difference`;
            }

        } catch (error) {
            // Error (though unlikely with this simulated function unless you force it)
            showMessage(messageElement, 'Something went wrong. Please try again later.', 'error');
        } finally {
            // Reset button and clear message after a delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                messageElement.style.display = 'none'; // Hide message
            }, 3000); // Keep success/error message for 3 seconds, then hide
        }
    });

    // Real-time email validation and message clearing
    emailInput.addEventListener('input', () => {
        emailInput.classList.remove('error');
        if (messageElement.style.display === 'block') {
            messageElement.style.display = 'none'; // Clear message as user types
        }
    });
}

// Initialize the handlers for both forms
document.addEventListener('DOMContentLoaded', () => {
    handleSubscription('heroSubscriptionForm', 'heroEmail', 'heroSubscribeBtn', 'heroMessage');
    handleSubscription('footerSubscriptionForm', 'footerEmail', 'footerSubscribeBtn', 'footerMessage');
});