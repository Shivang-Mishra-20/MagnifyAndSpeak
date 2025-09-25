document.addEventListener('DOMContentLoaded', () => {
    // Get references to all the important HTML elements
    const ttsForm = document.getElementById('tts-form');
    const textInput = document.getElementById('text-input');
    const voiceSampleInput = document.getElementById('voice-sample-input');
    const filenameDisplay = document.getElementById('filename-display');
    const speakBtn = document.getElementById('speak-btn');
    const loadingContainer = document.getElementById('loading-container');
    const audioPlayerContainer = document.getElementById('audio-player-container');
    const audioPlayer = document.getElementById('audio-player');
    const increaseFontBtn = document.getElementById('increase-font');
    const decreaseFontBtn = document.getElementById('decrease-font');

    let currentFontSize = 18; // Initial font size in pixels

    // --- Font Size Controls ---
    const updateFontSize = () => {
        textInput.style.fontSize = `${currentFontSize}px`;
    };

    increaseFontBtn.addEventListener('click', () => {
        currentFontSize += 2; // Increase by 2px
        updateFontSize();
    });

    decreaseFontBtn.addEventListener('click', () => {
        if (currentFontSize > 12) { // Set a minimum size
            currentFontSize -= 2; // Decrease by 2px
            updateFontSize();
        }
    });

    // --- File Upload Feedback ---
    voiceSampleInput.addEventListener('change', () => {
        if (voiceSampleInput.files.length > 0) {
            filenameDisplay.textContent = voiceSampleInput.files[0].name;
            filenameDisplay.style.fontStyle = 'normal';
        } else {
            filenameDisplay.textContent = 'No file chosen...';
            filenameDisplay.style.fontStyle = 'italic';
        }
    });

    // --- Form Submission Logic ---
    ttsForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const text = textInput.value.trim();
        const voiceFile = voiceSampleInput.files[0];

        if (!text) {
            alert('Please enter some text to speak.');
            return;
        }
        if (!voiceFile) {
            alert('Please upload a voice sample file.');
            return;
        }

        // Prepare UI for loading state
        speakBtn.disabled = true;
        speakBtn.querySelector('.btn-text').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        loadingContainer.style.display = 'block';
        audioPlayerContainer.style.display = 'none'; // Hide previous results

        const formData = new FormData();
        formData.append('text', text);
        formData.append('voice_sample', voiceFile);

        try {
            const response = await fetch('/synthesize', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Server error: ${response.status}`);
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);

            // Display and play the audio
            audioPlayer.src = audioUrl;
            audioPlayerContainer.style.display = 'block';
            audioPlayer.play();

        } catch (error) {
            console.error('Error:', error);
            alert(`An error occurred: ${error.message}`);
        } finally {
            // Reset the UI
            speakBtn.disabled = false;
            speakBtn.querySelector('.btn-text').innerHTML = '<i class="fas fa-play-circle"></i> Speak Aloud';
            loadingContainer.style.display = 'none';
        }
    });
});