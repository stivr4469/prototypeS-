import React from 'react';

const AudioPlayer = ({ text, speechText }) => {
  const speak = (textToSpeak) => {
    if (!('speechSynthesis' in window)) {
      alert("Извините, ваш браузер не поддерживает синтез речи.");
      return;
    }

    // 1. Используем специальный текст для озвучки, если он есть
    // 2. Если нет, пытаемся очистить основной текст от HTML и кириллицы
    const textForSpeech = speechText || text.replace(/<[^>]*>?/gm, '').replace(/[а-яА-ЯёЁ]/g, '');

    // Не произносим, если в итоге осталась пустая строка
    if (!textForSpeech.trim()) {
      return;
    }
    
    const utterance = new SpeechSynthesisUtterance(textForSpeech);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;

    // Останавливаем предыдущее произношение, если оно есть
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  return (
    <button onClick={() => speak(text)} className="audio-button">
      🔊
    </button>
  );
};

export default AudioPlayer;
