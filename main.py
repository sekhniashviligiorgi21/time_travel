from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import requests
from fastapi.staticfiles import StaticFiles


if not os.getenv("RENDER"):
    load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_URL = "https://api.gemini.com"


app = FastAPI()




app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/home")
def read_root():
    return {"message":"Home"}



@app.get("/events/{year}")
def get_year(year: int):
    prompt=f"List major events worldwide in {year} categorized by politics, sports, technology and culture in one or two sentences. Imagine you are a news reporter that year. one news per for one topic. Don't use any introduction. Make it short. use easy to understand language."
    headers = {
        "x-goog-api-key": GEMINI_API_KEY,
        "Content-Type": "application/json"
    }

    data = {
        "contents": [
            {
                "parts": [{"text": prompt}]
            }
        ]
    }

    response = requests.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", headers=headers, json=data)

    if response.status_code == 200:
        candidates = response.json().get("candidates", [])
        if candidates:
            parts = candidates[0].get("content", {}).get("parts", [])
            if parts:
                events_text = parts[0].get("text", "")
            else:
                events_text = "No content returned"
        else:
            events_text = "No candidates returned"
    else:
        events_text = f"Error: {response.status_code} - {response.text}"

    return {"year": year, "events": events_text}

app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")
