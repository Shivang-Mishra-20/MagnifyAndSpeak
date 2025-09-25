# AI-Powered Reading Assistant 🔊

An accessible web application designed to help users, especially the elderly, by magnifying text and reading it aloud in a personalized, cloned voice.

![AI Reading Assistant Screenshot](https://i.imgur.com/Sj6aB6B.png)

## 🌟 About The Project

This project was created to provide a simple and powerful accessibility tool. Many screen readers use generic, robotic voices. This application introduces a personal touch by allowing users to upload a voice sample of a loved one, which is then used to read any provided text. The interface is designed with high-contrast elements, large text, and simple controls for ease of use.

### Key Features

* **Text Magnification:** Easily increase or decrease the text size for comfortable reading.
* **Zero-Shot Voice Cloning:** Upload a short (10-20 second) audio clip, and the AI will clone the voice to read your text.
* **Web-Based Interface:** Fully accessible through a web browser with no complex software installation required for the end-user.
* **Modern & Appealing UI:** Features a beautiful, animated background and a polished "frosted glass" design that is both pleasant to use and highly functional.

## 🛠️ Tech Stack

This project is built with a combination of frontend, backend, and machine learning technologies:

* **Backend:**
    * **Python:** The core programming language.
    * **Flask:** A lightweight web server to handle requests and serve the application.
* **Machine Learning / AI:**
    * **Coqui TTS:** The powerful text-to-speech library used for its high-quality, zero-shot voice cloning capabilities.
    * **PyTorch:** The deep learning framework that Coqui TTS runs on.
* **Frontend:**
    * **HTML5:** For the structure of the web page.
    * **CSS3:** For all the styling, including the animated background and modern UI.
    * **JavaScript (ES6):** For user interaction, handling form submissions, and managing audio playback.

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

* Python 3.7+ installed on your system.
* `pip` (Python package installer).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/ai-reading-assistant.git](https://github.com/your-username/ai-reading-assistant.git)
    cd ai-reading-assistant
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    # Create the environment
    python -m venv venv

    # Activate it (Windows)
    venv\Scripts\activate

    # Activate it (macOS/Linux)
    source venv/bin/activate
    ```

3.  **Install the required packages:**
    The `requirements.txt` file contains all the necessary libraries.
    ```bash
    pip install -r requirements.txt
    ```
    *Note: The first time you run the application, Coqui TTS will download a large (approx. 1.87 GB) pre-trained model. This is a one-time download and may take a while.*

4.  **Run the Flask server:**
    ```bash
    python app.py
    ```

5.  **Open the application:**
    Navigate to `http://127.0.0.1:5000` in your web browser.

## 📖 How to Use

1.  **Enter Text:** Type or paste the text you want to be read into the text area.
2.  **Adjust Size:** Use the `+` and `-` buttons to magnify the text to a comfortable size.
3.  **Upload Voice:** Click "Choose File" and select a clear MP3 or WAV audio file (10-20 seconds long) of the desired voice.
4.  **Generate Audio:** Click the "Speak Aloud" button and wait for the AI to process the request. This may take a minute or two depending on your computer's hardware.
5.  **Listen:** The generated audio will appear in the player at the bottom.

## 🙏 Acknowledgments

* This project would not be possible without the incredible work done by the team at [Coqui TTS](https://github.com/coqui-ai/TTS).
