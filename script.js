
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
        speak("Good Evening ");
    }
}

// Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Listen for the first "Hello Jarvis"
recognition.onresult = (event) => {
    const transcript = event.results[event.resultIndex][0].transcript.toLowerCase();
    content.textContent = transcript;

    // Check if user says "Hello Jarvis"
    if (transcript.includes('hello jarvis')) {
        speak(" hello bhaskar , How may I help you?");
        recognition.stop(); // Stop after detecting "Hello Jarvis"
    }

};

// Start speech recognition when the button is pressed
btn.addEventListener('click', () => {
    content.textContent = "Listening....";
    recognition.start(); // Start listening after button press
});

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    content.textContent = transcript;
    takeCommand(transcript); // Process the command
};

// Function to process commands
function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How may I help you today?");
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
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speak("I found some information on Google regarding " + message);
    }

    recognition.stop(); // Stop listening after executing the command
}

// Start interaction only after user presses "Enter"
window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        speak(" i am jarvis !"); // Speak "Hello Sir" when Enter is pressed
        wishMe(); // Call the greeting function
        recognition.start(); // Start listening for "Hello Jarvis" after greeting
    }
});
