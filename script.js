const textArray = [
    "Typing efficiently is an essential skill in the digital age. Whether writing emails or coding software, speed matters. Accuracy is equally important, ensuring clarity in communication.",
    "Mastering typing takes patience and practice. With regular exercises, anyone can improve speed and accuracy. Focus on keeping your fingers on the home row and minimizing errors.",
    "The history of typing dates back to typewriters. Today, mechanical and membrane keyboards dominate the market. The faster you type, the more productive you become.",
    "Touch typing allows users to type without looking at the keyboard. It boosts efficiency and reduces strain. Muscle memory plays a crucial role in mastering this technique.",
    "Every profession benefits from good typing skills. Writers, developers, and data analysts all rely on fast and accurate typing. Regular practice leads to improvement over time.",
    "A strong typing foundation can make daily tasks easier. Whether chatting, writing reports, or gaming, speed matters. Slow typing can hinder productivity and efficiency.",
    "The world is becoming increasingly digital. Typing is no longer just a skill but a necessity. Schools, offices, and freelancers all require proficient typing abilities.",
    "Ergonomics play a crucial role in typing. Poor posture can lead to discomfort and injury. A proper desk setup can improve both comfort and efficiency.",
    "Typing competitions test both speed and endurance. Some people can type over 100 words per minute. These competitions showcase how practice leads to mastery.",
    "Most professional typists aim for accuracy first. Speed follows naturally with experience. A balance between both is the key to efficient typing.",
    "Mobile typing has become just as important as keyboard typing. With smartphones and tablets dominating communication, fast mobile typing is a great asset.",
    "Learning to type with all ten fingers increases efficiency. It allows for faster and smoother typing sessions. Many schools now incorporate touch typing into their curriculum.",
    "Gamers often develop fast typing reflexes. Whether sending messages in-game or programming scripts, quick and accurate typing is an advantage.",
    "Typing endurance is just as important as speed. Long-form writing requires consistent pacing. A steady rhythm can help maintain accuracy over time.",
    "Many jobs require typing tests during the hiring process. Employers value both speed and accuracy. Practicing regularly can give candidates a competitive edge.",
    "Typing in different languages can be a challenge. Some languages use special characters and accents. Learning multiple keyboard layouts can improve flexibility.",
    "Typing without looking at the keyboard reduces errors. Muscle memory plays a significant role. The more you practice, the more natural it becomes.",
    "Speed is not everything in typing. Precision is equally critical. A single typo can change the meaning of a message.",
    "Many people underestimate the impact of slow typing. It can cause delays in work and communication. Investing time in practice leads to better performance.",
    "Modern keyboards come in various styles. Mechanical, membrane, and ergonomic designs cater to different users. Finding the right keyboard enhances comfort and speed.",
    "The best typists train their fingers to move efficiently. Minimizing unnecessary movements leads to better accuracy. Smooth transitions between keys improve speed.",
    "Typing in the dark can be a useful exercise. It forces reliance on muscle memory rather than sight. Many professionals use this technique to improve their skills.",
    "Speech-to-text software is improving rapidly. However, typing remains a crucial skill. It provides precision and control that voice recognition often lacks.",
    "Shortcuts and hotkeys can significantly improve typing speed. Many software applications offer customizable shortcuts. Learning these can save time and effort.",
    "A relaxed mindset helps improve typing. Tension in fingers and hands can slow down speed. Proper hand placement and a calm approach lead to better results."
];

// Get elements
const textContainer = document.getElementById("text-to-type");
const inputField = document.getElementById("hidden-input");
const restartButton = document.getElementById("restart");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const timeDisplay = document.getElementById("time");

// Variables
let text = "";
let charIndex = 0;
let correctChars = 0;
let startTime;
let timerInterval;

// Function to load a new sentence
function loadText() {
    text = textArray[Math.floor(Math.random() * textArray.length)];
    textContainer.innerHTML = "";
    text.split("").forEach(char => {
        const span = document.createElement("span");
        span.textContent = char;
        span.classList.add("upcoming");
        textContainer.appendChild(span);
    });
    charIndex = 0;
    correctChars = 0;
    inputField.value = "";
    clearInterval(timerInterval);
    timeDisplay.textContent = "Time: 0s";
    wpmDisplay.textContent = "WPM: 0";
    accuracyDisplay.textContent = "Accuracy: 100%";
    startTime = null;
}

// Function to update text as user types
function handleInput() {
    const textSpans = textContainer.querySelectorAll("span");
    const typedChar = inputField.value[charIndex];

    if (!startTime) {
        startTime = new Date();
        startTimer();
    }

    if (charIndex < text.length) {
        if (typedChar === text[charIndex]) {
            textSpans[charIndex].classList.remove("incorrect", "upcoming");
            textSpans[charIndex].classList.add("correct");
            correctChars++;
        } else {
            textSpans[charIndex].classList.remove("correct", "upcoming");
            textSpans[charIndex].classList.add("incorrect");
        }

        charIndex++;

        // Stop the timer when the sentence is fully typed
        if (charIndex === text.length) {
            clearInterval(timerInterval);
            inputField.blur(); // Prevent further typing
        }
    }

    updateStats();
}

// Function to update stats
function updateStats() {
    const elapsedTime = (new Date() - startTime) / 1000;
    const wordsTyped = charIndex / 5;
    const wpm = elapsedTime > 0 ? Math.round((wordsTyped / elapsedTime) * 60) : 0;
    const accuracy = charIndex > 0 ? Math.round((correctChars / charIndex) * 100) : 100;

    wpmDisplay.textContent = `WPM: ${wpm}`;
    accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
}

// Timer function
function startTimer() {
    timerInterval = setInterval(() => {
        const elapsedTime = Math.floor((new Date() - startTime) / 1000);
        timeDisplay.textContent = `Time: ${elapsedTime}s`;
    }, 1000);
}

// Restart function
restartButton.addEventListener("click", () => {
    loadText();
    inputField.focus();
});

// Initialize
loadText();
inputField.addEventListener("input", handleInput);
