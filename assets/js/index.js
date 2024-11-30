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
    textAnimation(); // Initialize typing animation

    const skills = {
        frontend: [
            { name: "HTML", percentage: 99, color: "#E54D26", lightColor: "#FAD8C9", logoUrl: "../assets/logo/html.jpg" },
            { name: "CSS", percentage: 98, color: "#3799D6", lightColor: "#D8EEF9", logoUrl: "../assets/logo/css.jpg" },
            { name: "JavaScript", percentage: 80, color: "#F4E11E", lightColor: "#FFFBE0", logoUrl: "../assets/logo/js.jpg" },
            { name: "React", percentage: 75, color: "#61dafb", lightColor: "#DFF8FF", logoUrl: "../assets/logo/react.jpg" },
            { name: "React Native", percentage: 70, color: "#4a90e2", lightColor: "#D0E5FA", logoUrl: "../assets/logo/react.jpg" },
            { name: "Bootstrap", percentage: 85, color: "#7211F6", lightColor: "#E5D3FF", logoUrl: "../assets/logo/bootstrap.jpg" },
        ],
        backend: [
            { name: "Python", percentage: 70, color: "#3670A0", lightColor: "#D6E4F0", logoUrl: " ../assets/logo/python.jpeg" },
            { name: "Node.js", percentage: 70, color: "#89C142", lightColor: "#E5F6D7", logoUrl: "../assets/logo/nodejs.jpeg" },
            { name: "SQL", percentage: 70, color: "#4479A1", lightColor: "#D6E7F0", logoUrl: "../assets/logo/sql.jpeg" },
            { name: "PHP", percentage: 50, color: "#8792BF", lightColor: "#E8EBF7", logoUrl: "../assets/logo/php.jpg" },
        ],
        programming: [
            { name: "C", percentage: 60, color: "#01A0E4", lightColor: "#D1EEFA", logoUrl: "../assets/logo/c.jpeg" },
            { name: "C++", percentage: 55, color: "#1F6AA4", lightColor: "#D6E6F4", logoUrl: "../assets/logo/cpp.jpeg" },
        ],
        tools: [
            { name: "Photoshop", percentage: 60, color: "#001025", lightColor: "#CDD4DF", logoUrl: "../assets/logo/photoshop.jpeg" },
            { name: "Illustator", percentage: 55, color: "#2D1012", lightColor: "#E7C7C9", logoUrl: "../assets/logo/illustator.jpeg" },
            { name: "Lightroom", percentage: 55, color: "#001025", lightColor: "#CDD4DF", logoUrl: "../assets/logo/lightroom.jpeg" },
            { name: "Lunacy", percentage: 55, color: "#149BE2", lightColor: "#D6EEF9", logoUrl: "../assets/logo/lunacy.jpeg" },
        ],
    };
    

    function animateProgressBars(skillCategory) {
        const container = document.getElementById(skillCategory + 'Container');
        const progressBars = container.querySelectorAll('.progress');
        const progressPercentages = container.querySelectorAll('.progressPercentage');
        const skillItems = skills[skillCategory];

        progressBars.forEach((progressBar, index) => {
            // Reset progress bar and percentage text to 0% before animation starts
            progressBar.style.width = '0%';
            progressPercentages[index].textContent = '0%';

            const skillPercentage = skillItems[index]?.percentage;
            if (skillPercentage !== undefined) {
                let currentPercentage = 0;
                const interval = setInterval(() => {
                    if (currentPercentage < skillPercentage) {
                        currentPercentage++;
                        progressBar.style.width = `${currentPercentage}%`;
                        progressPercentages[index].textContent = `${currentPercentage}%`;
                    } else {
                        clearInterval(interval); // Stop the animation when it reaches the target percentage
                    }
                }, 10); // Adjust this number for speed of animation
            }
        });
    }

    // Function to generate skill HTML
    function generateSkillsTab(skillCategory, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Clear previous content

        skills[skillCategory].forEach(skill => {
            // Create the skill box
            const skillBox = `
                <div class="box">
                    <div class="icon">
                        <img src="${skill.logoUrl}" alt="${skill.name}">
                    </div>
                    <div class="progressContainer">
                        <span class="skillTitle">${skill.name}</span>
                        <div class="progressBar" style="background-color:${skill.lightColor};">
                            <div class="progress" style="background-color:${skill.color}; width: 0;"></div>
                        </div>
                        <div class="progressPercentage" data-percentage="${skill.percentage}">0%</div>
                    </div>
                </div>
            `;
            // Append the skill box to the container
            container.innerHTML += skillBox;
        });

        // Call animateProgressBars to animate the progress bars after they are added to the DOM
        setTimeout(() => animateProgressBars(skillCategory), 200);
    }

    // Function to initialize tab navigation
    function setupTabNavigation() {
        const tabs = document.querySelectorAll('.skillsBtn div');
        const skillSections = document.querySelectorAll('.skills');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetSection = tab.id.split('-')[0]; // Extract frontend, backend, tools
                skillSections.forEach(section => {
                    if (section.classList.contains(targetSection)) {
                        // section.classList.add('display-block');
                        section.classList.remove('display-none');
                        animateProgressBars(targetSection);
                    } else {
                        // section.classList.remove('display-block');
                        section.classList.add('display-none');
                    }
                });
            });
        });

    }

    // Generate skills content dynamically when the DOM is loaded
    generateSkillsTab('frontend', 'frontendContainer');
    generateSkillsTab('backend', 'backendContainer');
    generateSkillsTab('programming', 'programmingContainer');
    generateSkillsTab('tools', 'toolsContainer');
    setupTabNavigation();


    // nav
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('overlay');
    const close = document.getElementById('close');

    hamburger.addEventListener('click', () => {
        overlay.classList.toggle('active'); // Toggle overlay visibility
    });

    close.addEventListener('click', () => {
        overlay.classList.remove('active'); // Close overlay on click
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

