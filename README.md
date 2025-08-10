# WebReinvent Rank Tracker (Assignment)

This is a full-stack AI-powered application that tracks WebReinvent’s Google search rankings for specific keywords using an agentic system.

---

## 📦 Tech Stack

- **Frontend**: React 19 (Vite)
- **Backend**: FastAPI (served using `uv`)
- **crewai:** framework to automate multiagent workflows
- **Ollama:** Mistral
- **Serper.dev Google Search Api**
- **Tools**:

  - `watchfiles` (auto-reload backend on changes)
  - `concurrently` (run frontend & backend together)
  - `.venv` for Python environment
  - docker for running ollama mistral

## 🧑‍💻 How to Run (Step-by-Step)

### 0. Setup Ollama locally with docker

#### a.Pull Ollama Docker Image

```bash
    docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
```

#### b.Go to Cmd or powershell and run after pulling image

```bash
    docker exec -it <process-id> bash 
```

#### c.Try to run mistral

```bash
    ollama run mistral
```

if it will not work download manually

### 1. Backend Setup

```bash
cd Backend
python -m venv .venv
.venv\Scripts\activate     # On Mac/Linux: source .venv/bin/activate
uv pip install -r requirements.txt
uv run backend_api.py      # OR use watchfiles for hot-reload
```

Backend will be available at:

```
http://127.0.0.1:8000
```

### 2. Frontend Setup

```bash
cd ../FrontEnd
npm install
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

### 3. Run Both Together (Frontend + Backend)

In the `FrontEnd/package.json`, two scripts are defined:

```json
"backend": "cd ../Backend && watchfiles \"cmd /c set PYTHONIOENCODING=utf-8 && uv run backend_api.py\" .",
"dev": "concurrently \"npm run vite\" \"npm run backend\""
```

or

In the `FrontEnd/package.json`, two scripts are defined:

```json
"backend": "cd ../Backend && python -m watchfiles \"cmd /c set PYTHONIOENCODING=utf-8 && uv run backend_api.py\" ."
"dev": "concurrently \"npm run vite\" \"npm run backend\""
```

Use:

```bash
npm run dev

```

### **4. Set up Environment Variables**

Create a `.env` file in the root directory:

```env
SERPER_API_KEY=your_serper_api_key
```

## 🧩 Contributing

We welcome contributions that help improve this project!

### How to Contribute

1. **Fork the Repository**Click the **Fork** button on the top-right corner of this repository.
2. **Clone your Fork**

   ```bash
   git clone https://github.com/your-username/webreinvent.git
   cd webreinvent
   ```
3. **Create a Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make Your Changes**

   - Follow the existing code style.
   - Keep your changes focused and purposeful.
   - Add comments where necessary.
5. **Commit and Push**

   ```bash
   git add .
   git commit -m "Add: your meaningful commit message"
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**
   Go to your fork on GitHub and click **"Compare & pull request"**.
   Write a clear description of what you changed and why.

## 🙌 Acknowledgements

- [FastAPI](https://fastapi.tiangolo.com/)
- [CrewAI](https://docs.crewai.io/)
- [Serper.dev](https://serper.dev/) for Google Search API
- Mistral model via Ollama (optional if local LLM inference is integrated)

### 📌 Contribution Guidelines

- Stick to **PEP8** standards for Python code.
- Keep pull requests minimal and focused.
- Update documentation if needed.
- Test your changes locally before submitting.
- Be respectful and constructive in code reviews.

## ✨ Author

**Anuj Sharma**
🌍 Gwalior, India
🔗 [LinkedIn](https://linkedin.com/in/anuj-sharma-24b550226)
💻 [GitHub](https://github.com/Anujsharma002)
📫 anuj.sharma.cs.02@gmail.com
