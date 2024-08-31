from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import re

app = Flask(__name__)
CORS(app)

toxic_bert = pipeline("text-classification", model="unitary/toxic-bert", tokenizer="unitary/toxic-bert", return_all_scores=True)

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'http\S+', '', text)
    text = ' '.join(text.split())
    return text


@app.route('/analyze', methods=['POST'])
def analyze_message():
    data = request.get_json()
    message = data.get('message')

    processed_message = preprocess_text(message)

    analysis_result = toxic_bert(processed_message)

    # implement the threshold part here

    for analysis in analysis_result[0]:
        if analysis['score'] > 0.6:
                return jsonify({
                    'original_message': message,
                    'analysis_result': True
                })
        else:
            return jsonify({
                'original_message': message,
                'analysis_result': False
            })

    # print(analysis_result)

if __name__ == '__main__':
    app.run(host="10.7.18.12", port=8080, debug=True)
