
const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

// Function to speak text using SpeechSynthesis
function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

// Function to greet based on the time of the day
function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

// Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Show the glowing button when Jarvis asks "How may I help you?"
function showButton() {
    btn.style.display = 'block';
    btn.classList.add('glow');
}

// Stop the glowing effect when the button is clicked
btn.addEventListener('click', () => {
    content.textContent = "Listening....";
    btn.classList.remove('glow');
    recognition.start(); // Start listening when the button is clicked
});

// Listen for commands after "Hello Jarvis"
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    content.textContent = transcript;
    takeCommand(transcript); // Process the command
};

// Function to process commands
function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How may I help you today?");
        showButton(); // Show the button when Jarvis says "How may I help you?"
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speak("This is what I found on the internet regarding " + message);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        speak("This is what I found on Wikipedia regarding " + message);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleTimeString();
        speak("The time is " + time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleDateString();
        speak("Today's date is " + date);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        speak("Opening Calculator");
    } else if (message.includes('stop')) {
        speak("Goodbye, Sir.");
        recognition.stop();
    } else {
        speak("I didn't understand that. Could you please repeat?");
    }

    recognition.stop(); // Stop listening after executing the command
}

// Start interaction only after user presses "Enter"
window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        speak("I am Jarvis!");
        wishMe(); // Call the greeting function
        recognition.start(); // Start listening for "Hello Jarvis" after greeting
    }
});
