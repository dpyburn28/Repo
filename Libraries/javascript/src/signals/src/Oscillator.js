export default class Oscillator {
    constructor(audioContext) {
        // Use provided audio context or create new one
        this.audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
        this.oscillator = null;
        this.gainNode = null;
        this.isPlaying = false;
    }

    // Start the oscillator
    start(frequency = 440, type = 'sine', volume = 0.5) {
        if (this.isPlaying) return;

        // Create oscillator
        this.oscillator = this.audioContext.createOscillator();
        
        // Create gain node for volume control
        this.gainNode = this.audioContext.createGain();

        // Configure oscillator
        this.oscillator.type = type;
        this.oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

        // Configure gain
        this.gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);

        // Connect nodes
        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);

        // Start the oscillator
        this.oscillator.start();
        this.isPlaying = true;
    }

    // Stop the oscillator
    stop() {
        if (!this.isPlaying) return;

        // Stop and clean up
        this.oscillator.stop();
        this.oscillator.disconnect();
        this.gainNode.disconnect();
        this.isPlaying = false;
    }

    // Change frequency
    setFrequency(frequency) {
        if (this.isPlaying) {
            this.oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        }
    }

    // Change volume
    setVolume(volume) {
        if (this.isPlaying) {
            this.gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
        }
    }

    // Change waveform type
    setType(type) {
        if (this.isPlaying) {
            this.oscillator.type = type;
        }
    }
}

// Example usage:
// const osc = new Oscillator();
// osc.start(440, 'sine', 0.5); // Start with 440Hz sine wave at 50% volume
// osc.setFrequency(880); // Change to 880Hz
// osc.setVolume(0.3); // Change volume to 30%
// osc.setType('square'); // Change to square wave
// osc.stop(); // Stop the oscillator 