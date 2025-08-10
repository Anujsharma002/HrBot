from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_ollama import ChatOllama
from langchain_core.runnables import RunnablePassthrough,RunnableLambda
from langchain_core.output_parsers import StrOutputParser
from Intializedata import docs,embeder
from langchain.prompts import ChatPromptTemplate
import json
# embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vectorstore = FAISS.load_local("./employeesEmbed", embeder(), allow_dangerous_deserialization=True)

def format_docs(docs):
    return '\n'.join(doc.page_content for doc in docs)

format_docs_runnable = RunnableLambda(format_docs)

#chatPrompt
prompt = ChatPromptTemplate.from_messages([
    ("system", """You are an expert HR assistant helping find the best candidates for job requests.

Given the user’s question and the retrieved employee profiles, create a natural, professional response that:

- Summarizes each relevant candidate’s experience, highlighting years of expertise, specific projects, and domain skills (e.g., machine learning, healthcare).
- Mentions availability status and notable accomplishments (like publications or compliance knowledge).
- Provides a clear, concise overview (2-4 sentences per candidate).
- Ends by offering to provide more details or assist in scheduling meetings.

If no suitable candidates are found, say so clearly.

Question: {question}
Context: {context}
Answer:"""),
    ("human", "Question: {question}\n\nContext:\n{context}")
])
def emp_search(search_query):
    results = vectorstore.similarity_search(search_query, k=5)
    employees = []
    for r in results:
        try:
            employee_data = json.loads(r.page_content)
            employees.append(employee_data)
        except json.JSONDecodeError:
            employees.append({"error": "Invalid employee data format", "raw": r.page_content})
    return employees



#intialize retriver
def HrBotsys(question):
    retriever = vectorstore.as_retriever(search_kwargs={"k": 5})
    llm = ChatOllama(model="mistral", temperature=0)

    rag_chain = ( {"context":retriever | format_docs_runnable , "question" : RunnablePassthrough()}
                |prompt
                |llm
                |StrOutputParser()

    )

    result = rag_chain.invoke(question)
    return result

# print(emp_search("python dev"))
