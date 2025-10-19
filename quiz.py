# install libraries
#pip install google-generativeai
#Python 3.10.11 (version)
import google.generativeai as genai
import json
import re
import sys

# ---------- LOAD API KEY ----------
def load_api_key():
    try:
        with open("api_key.json", "r") as f:
            data = json.load(f)
            return data.get("key")
    except Exception as e:
        print("❌ Error loading API key:", e)
        sys.exit(1)

genai.configure(api_key=load_api_key())

# ---------- MODEL ----------
MODEL_NAME = "models/gemini-2.5-flash"
model = genai.GenerativeModel(MODEL_NAME)

# ---------- GENERATE QUIZ ----------
def generate_quiz(subject):
    prompt = f"""
    Generate 5 multiple-choice questions on {subject}.
    Each question should have 4 options (A, B, C, D) and one correct answer.
    Return them in **valid JSON only**, like this:
    [
      {{
        "question": "What is Python?",
        "options": {{"A": "A snake", "B": "A language", "C": "A car", "D": "A game"}},
        "answer": "B"
      }}
    ]
    Only output valid JSON. No explanations.
    """
    response = model.generate_content(prompt)
    text = response.text.strip()

    # Try to extract JSON part safely
    match = re.search(r"\[.*\]", text, re.DOTALL)
    if match:
        quiz_json = match.group(0)
        return quiz_json
    else:
        print("❌ Gemini did not return valid JSON. Here is the raw output:")
        print(text)
        sys.exit(1)

# ---------- CONDUCT QUIZ ----------
def conduct_quiz(quiz_data):
    try:
        quiz = json.loads(quiz_data)
    except json.JSONDecodeError as e:
        print("❌ Failed to parse quiz JSON:", e)
        print("Raw data:", quiz_data)
        sys.exit(1)

    score = 0
    results = []

    print("\n🧠 Starting Quiz...\n")
    for i, q in enumerate(quiz, start=1):
        print(f"Q{i}: {q['question']}")
        for key, val in q['options'].items():
            print(f"  {key}. {val}")
        ans = input("Your answer (A/B/C/D): ").strip().upper()
        correct = q['answer'].upper()
        if ans == correct:
            print("✅ Correct!\n")
            score += 1
        else:
            print(f"❌ Wrong. Correct answer: {correct}\n")
        results.append({
            "question": q['question'],
            "your_answer": ans,
            "correct_answer": correct
        })

    print(f"🏁 Quiz Finished! Your score: {score}/{len(quiz)}")
    return results, score, len(quiz)

# ---------- ANALYZE RESULTS ----------
def analyze_results(subject, results):
    prompt = f"""
    You are an AI tutor. Based on the following quiz results for {subject},
    identify weak areas and give short suggestions.

    Results: {results}

    Return only clean bullet points.
    """
    response = model.generate_content(prompt)
    return response.text

# ---------- MAIN ----------
def main():
    print("🎯 Welcome to QuizGene Prototype")
    subject = input("Enter a subject (e.g., Python, Math, Science): ")

    print("\n🧩 Generating quiz... please wait.")
    quiz_data = generate_quiz(subject)

    results, score, total = conduct_quiz(quiz_data)
    print("\n📊 Analyzing your performance...\n")
    feedback = analyze_results(subject, results)

    print("💡 Suggestions & Weak Areas:\n", feedback)

if __name__ == "__main__":
    main()
