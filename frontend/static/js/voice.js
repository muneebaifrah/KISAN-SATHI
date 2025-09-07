function startListening() {
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = 'en-IN';
  recognition.onstart = () => {
    document.getElementById("transcript").innerText = "Listening...";
  };

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    document.getElementById("transcript").innerText = "You said: " + text;
    fetchResponse(text);
  };

  recognition.start();
}

function fetchResponse(text) {
  fetch("/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: text }),
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("response").innerText = data.answer;
    });
}
