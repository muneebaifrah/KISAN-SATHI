from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__, template_folder="../frontend/templates", static_folder="../frontend/static")
CORS(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    query = data.get("query", "").lower()
    
    # Simple test logic
    if "weather" in query:
        answer = "The weather today is 30°C and sunny."
    elif "crop" in query:
        answer = "You can grow tomatoes this season."
    else:
        answer = "Sorry, I didn’t understand."

    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(debug=True)
