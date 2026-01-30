function textAnimation() {
    var textChange = document.getElementById('text-change');
    var textArray = ["Web Designer", "Web Dev", "UI/UX Designer", "Graphics Designer"];
    var arrayIndex = 0;
    var charIndex = 0;

    function type() {
        // If the word is fully typed, start erasing it
        if (charIndex === textArray[arrayIndex].length) {
            setTimeout(erase, 1000); // Pause before erasing
        } else {
            // Type next character
            textChange.textContent += textArray[arrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100); // Adjust typing speed here
        }
    }

    function erase() {
        // If the word is fully erased, move to the next word
        if (charIndex === 0) {
            arrayIndex = (arrayIndex + 1) % textArray.length; // Loop through array
            setTimeout(type, 500); // Start typing the next word
        } else {
            // Erase last character
            textChange.textContent = textArray[arrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50); // Adjust erasing speed here
        }
    }

    type(); // Start the typing animation
}

document.addEventListener('DOMContentLoaded', () => {
    textAnimation();
    // Your original data – unchanged
    const skills = {
        frontend: [
            { name: "HTML", percentage: 99, color: "#E54D26", lightColor: "#FAD8C9", logoUrl: "assets/logo/html.jpg" },
            { name: "CSS", percentage: 98, color: "#3799D6", lightColor: "#D8EEF9", logoUrl: "assets/logo/css.jpg" },
            { name: "JavaScript", percentage: 80, color: "#F4E11E", lightColor: "#FFFBE0", logoUrl: "assets/logo/js.jpg" },
            { name: "React", percentage: 75, color: "#61dafb", lightColor: "#DFF8FF", logoUrl: "assets/logo/react.jpg" },
            { name: "React Native", percentage: 70, color: "#4a90e2", lightColor: "#D0E5FA", logoUrl: "assets/logo/react.jpg" },
            { name: "Bootstrap", percentage: 85, color: "#7211F6", lightColor: "#E5D3FF", logoUrl: "assets/logo/bootstrap.jpg" },
            { name: "Tailwind CSS", percentage: 70, color: "#18B7B9", lightColor: "#DCF6F6", logoUrl: "assets/logo/tailwind css.jpeg" },
        ],
        backend: [
            { name: "Python", percentage: 70, color: "#3670A0", lightColor: "#D6E4F0", logoUrl: "assets/logo/python.jpeg" },
            { name: "Node.js", percentage: 70, color: "#89C142", lightColor: "#E5F6D7", logoUrl: "assets/logo/nodejs.jpeg" },
            { name: "SQL", percentage: 70, color: "#4479A1", lightColor: "#D6E7F0", logoUrl: "assets/logo/sql.jpeg" },
            { name: "PHP", percentage: 50, color: "#8792BF", lightColor: "#E8EBF7", logoUrl: "assets/logo/php.jpg" },
        ],
        programming: [
            { name: "C", percentage: 60, color: "#01A0E4", lightColor: "#D1EEFA", logoUrl: "assets/logo/c.jpeg" },
            { name: "C++", percentage: 55, color: "#1F6AA4", lightColor: "#D6E6F4", logoUrl: "assets/logo/cpp.jpeg" },
        ],
        tools: [
            { name: "Photoshop", percentage: 60, color: "#001025", lightColor: "#CDD4DF", logoUrl: "assets/logo/photoshop.jpeg" },
            { name: "Illustator", percentage: 55, color: "#2D1012", lightColor: "#E7C7C9", logoUrl: "assets/logo/illustator.jpeg" },
            { name: "Lightroom", percentage: 55, color: "#001025", lightColor: "#CDD4DF", logoUrl: "assets/logo/lightroom.jpeg" },
            { name: "Lunacy", percentage: 55, color: "#149BE2", lightColor: "#D6EEF9", logoUrl: "assets/logo/lunacy.jpeg" },
        ],
    };

    // Generate skill cards with circular progress
    function generateSkills(category, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';

        skills[category].forEach(skill => {
            const card = document.createElement('div');
            card.className = 'skill-card';

            const circumference = 2 * Math.PI * 52; // r = 52
            const offset = circumference * (1 - skill.percentage / 100);

            card.innerHTML = `
              
                <div class="progress-ring">
                    <svg viewBox="0 0 120 120">
                        <circle class="ring-bg" cx="60" cy="60" r="52"></circle>
                        <circle class="ring" cx="60" cy="60" r="52"
                            stroke="${skill.color}"
                            stroke-dasharray="${circumference}"
                            stroke-dashoffset="${circumference}"
                            data-offset="${offset}">
                        </circle>
                    </svg>
                    <div class="progress-value">${skill.percentage}%</div>
                </div>
                <div class="skill-title">${skill.name}</div>
                <div class="skill-level">${getLevelText(skill.percentage)}</div>
            `;

            container.appendChild(card);
        });
    }

    function getLevelText(percent) {
        if (percent >= 90) return "Expert";
        if (percent >= 80) return "Advanced";
        if (percent >= 70) return "Proficient";
        if (percent >= 60) return "Intermediate";
        return "Learning";
    }

    // Animate all visible rings
    function animateRings() {
        document.querySelectorAll('.skills-tab.active .ring').forEach(ring => {
            const targetOffset = ring.dataset.offset;
            ring.style.strokeDashoffset = targetOffset;
        });
    }

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.skills-tab').forEach(t => t.classList.remove('active'));

            btn.classList.add('active');
            const tabId = btn.dataset.tab;
            document.getElementById(tabId).classList.add('active');

            // Animate rings after tab change
            setTimeout(animateRings, 100);
        });
    });

    // Generate content
    generateSkills('frontend', 'frontendContainer');
    generateSkills('backend', 'backendContainer');
    generateSkills('programming', 'programmingContainer');
    generateSkills('tools', 'toolsContainer');

    // First animation on load
    setTimeout(animateRings, 600);
// });
    // nav
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('overlay');
    const close = document.getElementById('close');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        overlay.classList.toggle('active'); // Toggle overlay visibility
    });

    close.addEventListener('click', () => {
        overlay.classList.remove('active'); // Close overlay on click
    });

    // Close overlay when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            overlay.classList.remove('active'); // Close overlay
        });
    });
});


// Wait until DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    const scrollUpBtn = document.getElementById('scrollUpBtn');

    // Show the button when scrolling down
    window.onscroll = function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollUpBtn.style.display = "block"; // Show button
        } else {
            scrollUpBtn.style.display = "none"; // Hide button
        }
    };

    // Scroll to top when clicked
    // Scroll to top with smooth scrolling when clicked
    scrollUpBtn.onclick = function () {
        // Scroll duration (in milliseconds)
        const duration = 500; // Change this for a slower or faster scroll, e.g., 1500ms = 1.5 seconds
        const start = window.scrollY; // Initial scroll position
        const end = 0; // Target scroll position (top of the page)
        const change = start - end; // Difference in scroll
        let startTime = null;

        // Function to handle smooth scrolling
        function scrollToTop(timestamp) {
            if (!startTime) startTime = timestamp; // Record the start time
            const progress = timestamp - startTime; // Time elapsed since start
            const scrollStep = progress / duration; // Calculate how much to scroll per frame

            if (progress < duration) {
                // Scroll to the current position based on progress
                window.scrollTo(0, start - (scrollStep * change));
                requestAnimationFrame(scrollToTop); // Continue scrolling
            } else {
                // Ensure we reach the exact top of the page
                window.scrollTo(0, end);
            }
        }

        // Start the smooth scroll animation
        requestAnimationFrame(scrollToTop);
    };

    //   scroll behaviour of links
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", function () {
            const target = document.querySelector(this.getAttribute("data-target"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe stats cards
  document.querySelectorAll('.stat-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease, transform 0.6s ease ${0.5 + index * 0.1}s`;
    observer.observe(card);
  });

  // Observe stats section
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    statsSection.style.opacity = '0';
    statsSection.style.transform = 'translateY(30px)';
    statsSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease 0.4s';
    observer.observe(statsSection);
  }

  // Force initial visible elements (fallback)
  setTimeout(() => {
    const hero = document.querySelector('.hero');
    const profile = document.querySelector('.profile-card');
    const about = document.querySelector('.about-content');

    if (hero)    { hero.style.opacity = '1';    hero.style.transform = 'translateY(0)'; }
    if (profile) { profile.style.opacity = '1'; profile.style.transform = 'translateX(0)'; }
    if (about)   { about.style.opacity = '1';   about.style.transform = 'translateX(0)'; }
  }, 100);
});