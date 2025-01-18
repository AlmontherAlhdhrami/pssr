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
    // Create an audio element
    const audio = new Audio('corporate-optimism-255363.mp3'); // Replace with the path to your audio file
    audio.play(); // Start playing the audio

    // Speak the message
    speak("Playing audio. The PSSR App will open in 1 minute.");

    // Pause the audio after 1 minute (60000 milliseconds)
    setTimeout(() => {
        audio.pause(); // Stop the audio after 1 minute
    }, 60000);

    // Set a timeout to open the link after 1 minute (60000 milliseconds)
    setTimeout(() => {
        window.open("https://orgc55dbccf.crm4.dynamics.com/main.aspx?appid=3770b05e-000f-ef11-9f89-000d3ad9ca24", "_blank");
        speak("Opening PSSR App.");
    }, 60000); // 60000 milliseconds = 1 minute
} 
else {
    speak("Sorry, I didn't understand that. Can you please repeat?");
  }
};

// Function to speak text aloud
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

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
