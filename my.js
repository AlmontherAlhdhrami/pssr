const recognition = new webkitSpeechRecognition();

// Function to handle speech input
recognition.onresult = function (event) {
    const text = event.results[0][0].transcript.toLowerCase(); // Normalize to lowercase for comparison
    console.log("You said: " + text);

    if (text.includes("what is the time")) {
        const now = new Date();
        const time = now.toLocaleTimeString();
        speak("The time is " + time);
    } else if (text.includes("what is your name")) {
        speak("My name is PSSR");
    } else if (text.includes("yes")) {
        // Start the dynamic flow: Play video -> Open website -> Play audio
        startDynamicFlow();
    } else {
        speak("Sorry, I didn't understand that. Can you please repeat?");
    }
};

// Function to speak text aloud
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

// Function to start the dynamic flow
function startDynamicFlow() {
    const videoContainer = document.getElementById('video-container');
    const bigContainer = document.querySelector('.bigcontainer');
    const localVideo = document.getElementById('local-video');

    // Hide the main content
    bigContainer.classList.add('hidden');

    // Show the video container
    videoContainer.style.display = 'flex';

    // Play the video
    localVideo.play();

    // Add event listener for when the video ends
    localVideo.addEventListener('ended', () => {
        // Hide the video container
        videoContainer.style.display = 'none';

        // Show the main content
        bigContainer.classList.remove('hidden');

        // Open the website
        window.open("https://orgc55dbccf.crm4.dynamics.com/main.aspx?appid=3770b05e-000f-ef11-9f89-000d3ad9ca24", "_blank");

        // Play audio for 1 minute
        const audio = new Audio('corporate-optimism-255363.mp3'); // Replace with the path to your audio file
        audio.play();

        // Speak the message
        speak("Playing audio. Opening the PSSR App.");

        // Pause the audio after 1 minute (60000 milliseconds)
        setTimeout(() => {
            audio.pause();
        }, 60000);
    });
}

// Custom video controls
document.getElementById('play-pause-btn').addEventListener('click', () => {
    const localVideo = document.getElementById('local-video');
    if (localVideo.paused) {
        localVideo.play();
    } else {
        localVideo.pause();
    }
});

document.getElementById('stop-btn').addEventListener('click', () => {
    const localVideo = document.getElementById('local-video');
    localVideo.pause();
    localVideo.currentTime = 0;
});

// Greet the user when the page loads
window.onload = function () {
    speak("Welcome to PSSR launch System , to launch PSSR Please click the button below ?");
};

// Start listening for voice commands when the button is clicked
document.getElementById("start-btn").addEventListener("click", function () {
    speak("Should I launch PSSR?");

    // Adding a slight delay before starting recognition to ensure the question is asked
    setTimeout(() => {
        recognition.start();
    }, 2000);
});