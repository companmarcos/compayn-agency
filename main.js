document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // Trigger point

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // 2. Navbar Glassmorphism on Scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('glass');
                navbar.classList.remove('bg-transparent');
            } else {
                navbar.classList.remove('glass');
                navbar.classList.add('bg-transparent');
            }
        });
    }

    // 3. Time Savings Calculator Logic
    const hoursSlider = document.getElementById('hours-slider');
    const hoursDisplay = document.getElementById('hours-display');
    const savedHoursDisplay = document.getElementById('saved-hours');
    const savedDaysDisplay = document.getElementById('saved-days');

    if (hoursSlider && hoursDisplay && savedHoursDisplay && savedDaysDisplay) {
        // Update values on input change
        const updateCalculator = () => {
            const hoursPerDay = parseFloat(hoursSlider.value);
            hoursDisplay.textContent = hoursPerDay;

            // Assuming 22 working days per month
            // If they lose N hours a day, AI recovers around 80% of that time
            const hoursLostPerMonth = hoursPerDay * 22;
            const hoursRecovered = Math.round(hoursLostPerMonth * 0.8); 
            const workDaysRecovered = (hoursRecovered / 8).toFixed(1);

            // Animate number climbing
            animateValue(savedHoursDisplay, parseInt(savedHoursDisplay.textContent) || 0, hoursRecovered, 500);
            animateValue(savedDaysDisplay, parseFloat(savedDaysDisplay.textContent) || 0, workDaysRecovered, 500, true);
        };

        hoursSlider.addEventListener('input', updateCalculator);
        updateCalculator(); // Init
    }

    // Number animation helper function
    function animateValue(obj, start, end, duration, isFloat = false) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            const currentVal = start + progress * (end - start);
            obj.innerHTML = isFloat ? currentVal.toFixed(1) : Math.floor(currentVal);
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});
