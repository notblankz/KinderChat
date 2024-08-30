from flask import Flask
from transformers import pipeline

app = Flask(__name__)

toxic_bert = pipeline("text-classification", model="unitary/toxic-bert", tokenizer="unitary/toxic-bert", return_all_scores=True)

def analyze_message(message):
    result = toxic_bert(message)

    print(result)


if __name__ == '__main__':
    message = ""
    while ( message != "exit"):
        message - input("Enter a msg: ")
        analyze_message(message)
