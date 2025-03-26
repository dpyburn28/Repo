export default class Analyzer {
    constructor(audioContext) {
        // Use provided audio context or create new one
        this.audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
        
        // Create analyzer node
        this.analyzerNode = this.audioContext.createAnalyser();
        
        // Configure analyzer
        this.analyzerNode.fftSize = 2048; // Large enough for detailed waveform
        this.bufferLength = this.analyzerNode.frequencyBinCount;
        this.timeData = new Uint8Array(this.bufferLength);
        this.frequencyData = new Uint8Array(this.bufferLength);
    }

    /**
     * Connect the analyzer to an audio source (like an oscillator)
     * @param {AudioNode} sourceNode - Audio source to analyze
     * @param {AudioNode} [destinationNode] - Optional destination to connect the source to
     * @returns {Analyzer} - Returns this instance for chaining
     */
    connect(sourceNode, destinationNode = null) {
        // Connect source to analyzer
        sourceNode.connect(this.analyzerNode);
        
        // If destination provided, connect analyzer to destination
        if (destinationNode) {
            this.analyzerNode.connect(destinationNode);
        }
        
        return this;
    }

    /**
     * Connect the analyzer to an oscillator instance
     * @param {Oscillator} oscillator - The oscillator instance
     * @returns {Analyzer} - Returns this instance for chaining
     */
    connectToOscillator(oscillator) {
        // If oscillator is playing, connect to it
        if (oscillator.isPlaying && oscillator.oscillator) {
            // We need to reconnect the oscillator's signal path
            oscillator.oscillator.disconnect();
            
            // Connect oscillator -> analyzer -> gain -> destination
            oscillator.oscillator.connect(this.analyzerNode);
            this.analyzerNode.connect(oscillator.gainNode);
            oscillator.gainNode.connect(this.audioContext.destination);
        }
        
        return this;
    }

    /**
     * Get time domain data (waveform)
     * @param {Uint8Array|Float32Array} [dataArray] - Optional pre-allocated array
     * @returns {Uint8Array|Float32Array} - Array containing waveform data
     */
    getTimeData(dataArray = null) {
        // If no data array provided, use default
        if (!dataArray) {
            this.analyzerNode.getByteTimeDomainData(this.timeData);
            return this.timeData;
        }
        
        // Use provided data array
        if (dataArray instanceof Uint8Array) {
            this.analyzerNode.getByteTimeDomainData(dataArray);
        } else if (dataArray instanceof Float32Array) {
            this.analyzerNode.getFloatTimeDomainData(dataArray);
        }
        
        return dataArray;
    }

    /**
     * Get frequency domain data (spectrum)
     * @param {Uint8Array|Float32Array} [dataArray] - Optional pre-allocated array
     * @returns {Uint8Array|Float32Array} - Array containing frequency data
     */
    getFrequencyData(dataArray = null) {
        // If no data array provided, use default
        if (!dataArray) {
            this.analyzerNode.getByteFrequencyData(this.frequencyData);
            return this.frequencyData;
        }
        
        // Use provided data array
        if (dataArray instanceof Uint8Array) {
            this.analyzerNode.getByteFrequencyData(dataArray);
        } else if (dataArray instanceof Float32Array) {
            this.analyzerNode.getFloatFrequencyData(dataArray);
        }
        
        return dataArray;
    }

    /**
     * Set analyzer properties
     * @param {Object} options - Configuration options
     * @param {number} [options.fftSize] - FFT size (must be power of 2)
     * @param {number} [options.minDecibels] - Minimum decibel value
     * @param {number} [options.maxDecibels] - Maximum decibel value
     * @param {number} [options.smoothingTimeConstant] - Smoothing time constant
     */
    configure(options = {}) {
        if (options.fftSize !== undefined) {
            this.analyzerNode.fftSize = options.fftSize;
            this.bufferLength = this.analyzerNode.frequencyBinCount;
            this.timeData = new Uint8Array(this.bufferLength);
            this.frequencyData = new Uint8Array(this.bufferLength);
        }
        
        if (options.minDecibels !== undefined) {
            this.analyzerNode.minDecibels = options.minDecibels;
        }
        
        if (options.maxDecibels !== undefined) {
            this.analyzerNode.maxDecibels = options.maxDecibels;
        }
        
        if (options.smoothingTimeConstant !== undefined) {
            this.analyzerNode.smoothingTimeConstant = options.smoothingTimeConstant;
        }
        
        return this;
    }

    /**
     * Get analyzer properties
     * @returns {Object} - Current analyzer configuration
     */
    getConfig() {
        return {
            fftSize: this.analyzerNode.fftSize,
            frequencyBinCount: this.bufferLength,
            minDecibels: this.analyzerNode.minDecibels,
            maxDecibels: this.analyzerNode.maxDecibels,
            smoothingTimeConstant: this.analyzerNode.smoothingTimeConstant
        };
    }

    /**
     * Disconnect the analyzer
     */
    disconnect() {
        this.analyzerNode.disconnect();
    }
} 