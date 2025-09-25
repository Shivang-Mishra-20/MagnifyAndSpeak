import os
import torch
from flask import Flask, render_template, request, send_file, jsonify
from TTS.api import TTS

# Check if a CUDA-enabled GPU is available, otherwise use CPU
device = "cuda" if torch.cuda.is_available() else "cpu"

# --- Model Loading ---
print("Loading Coqui TTS model...")
tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to(device)
print("Model loaded successfully.")

# --- Flask App Initialization ---
app = Flask(__name__)

# --- File and Folder Configuration ---
if not os.path.exists('uploads'):
    os.makedirs('uploads')
if not os.path.exists('outputs'):
    os.makedirs('outputs')

UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = 'outputs'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['OUTPUT_FOLDER'] = OUTPUT_FOLDER

# --- Routes ---
@app.route('/')
def index():
    """Renders the main HTML page."""
    return render_template('index.html')

@app.route('/synthesize', methods=['POST'])
def synthesize():
    """
    Receives text and a voice sample, generates audio, and returns it.
    """
    try:
        text = request.form['text']
        voice_sample = request.files['voice_sample']

        if not text:
            return jsonify({'error': 'No text provided.'}), 400
        if not voice_sample:
            return jsonify({'error': 'No voice sample provided.'}), 400

        speaker_wav_path = os.path.join(app.config['UPLOAD_FOLDER'], voice_sample.filename)
        voice_sample.save(speaker_wav_path)

        output_wav_path = os.path.join(app.config['OUTPUT_FOLDER'], 'output.wav')

        print(f"Synthesizing text: '{text}' using voice from {speaker_wav_path}")
        tts.tts_to_file(
            text=text,
            file_path=output_wav_path,
            speaker_wav=speaker_wav_path,
            language='en'
        )
        print(f"Audio saved to {output_wav_path}")

        return send_file(output_wav_path, mimetype='audio/wav')

    except Exception as e:
        print(f"An error occurred: {e}")
        if "index out of range" in str(e):
             return jsonify({'error': 'The provided voice sample could not be processed. Please try a different audio file (10-20 seconds of clear speech is best).'}), 500
        return jsonify({'error': 'An internal error occurred. Please check the server logs.'}), 500

# --- Main Execution ---
if __name__ == '__main__':
    app.run(debug=True)