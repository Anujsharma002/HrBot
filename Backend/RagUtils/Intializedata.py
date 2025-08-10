import pandas as pd
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
import os
import pandas as pd

csv_path = os.path.join(os.path.dirname(__file__), '..', 'employees_dataset.csv')
df = pd.read_csv(os.path.abspath(csv_path))

docs = [
    Document(page_content=row.to_json(), metadata={"row_index": idx})
    for idx, row in df.iterrows()
]
text_splitter = RecursiveCharacterTextSplitter(chunk_size = 500 ,chunk_overlap=100)
splits = text_splitter.split_documents(docs)


# add to vectordb
def embeder():
   embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
   return embeddings
def save():
    vectorstore = FAISS.from_documents(splits, embeder())
    vectorstore.save_local("employeesEmbed")
    print("✅ Data stored in FAISS successfully!")

# results = vectorstore.similarity_search("Find employees skilled in Python", k=5)
# for r in results:
#     print(r.page_content)
# print(results)
# embeder()
# save()