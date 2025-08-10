# backend_api.py
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import os
import uvicorn
from langchain_community.vectorstores import FAISS
# from langchain_huggingface import HuggingFaceEmbeddings

# Import your functions
from HrBot import HrBotsys,emp_search
# from ragutils import emp_search  # your employee search util


# vectorstore = load_vectorstore()

# FastAPI app
app = FastAPI(title="HR Bot API", version="1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

# Request/Response Models
class ChatRequest(BaseModel):
    query: str

class ChatResponse(BaseModel):
    response: str

class EmployeeResponse(BaseModel):
    name: str
    skills: List[str]
    experience: str
    projects: str
    availability: bool


@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        result = HrBotsys(request.query)  # pass vectorstore to hrbotsys
        return ChatResponse(response=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/employees/search")
async def search_employees(skill: str):
    print('seaching')
    try:
        results = emp_search(skill)  # pass vectorstore to emp_search
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/")
def home():
    return {"message": "HR Bot API is running!"}

if __name__ == "__main__":
        uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

