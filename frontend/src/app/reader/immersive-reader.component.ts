import { Component } from '@angular/core';

@Component({
  selector: 'app-immersive-reader',
  templateUrl: './immersive-reader.component.html',
  styleUrls: ['./immersive-reader.component.css']
})
export class ImmersiveReaderComponent {
  synth = window.speechSynthesis;
  utterance: SpeechSynthesisUtterance | null = null;
  isSpeaking = false;

  speakPageText() {
    const text = this.extractPageText();
    if (!text.trim()) return;

    this.utterance = new SpeechSynthesisUtterance(text);
    const langMap: { [key: string]: string } = {
      ENGLISH: 'en-US',
      FRENCH: 'fr-FR',
      SPANISH: 'es-ES',
      GERMAN: 'de-DE',
      ITALIAN: 'it-IT',
    };

    const storedLang = localStorage.getItem('user_lang') || 'FRENCH';
    this.utterance.lang = langMap[storedLang.toUpperCase()] || 'fr-FR';

    this.utterance.rate = 1;
    this.utterance.pitch = 1;

    this.synth.speak(this.utterance);
    this.isSpeaking = true;

    this.utterance.onend = () => {
      this.isSpeaking = false;
    };
  }

  pauseSpeech() {
    if (this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
    }
  }

  resumeSpeech() {
    if (this.synth.paused) {
      this.synth.resume();
    }
  }

  stopSpeech() {
    if (this.synth.speaking) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }

  private extractPageText(): string {
    const body = document.querySelector('main') || document.body;
    return body?.innerText || '';
  }
}
