import React from 'react';

const AudioPlayer = ({ textToSpeak }) => {
  if (!textToSpeak) {
    return null;
  }

  const speak = () => {
    if (!('speechSynthesis' in window)) {
      alert("Извините, ваш браузер не поддерживает синтез речи.");
      return;
    }

    // 👇 НОВАЯ, БОЛЕЕ НАДЕЖНАЯ ЛОГИКА ОЧИСТКИ 👇
    // 1. Убираем HTML-теги.
    let cleanText = textToSpeak.replace(/<[^>]*>?/gm, '');
    // 2. Убираем все, что не является буквами, цифрами, пробелами или запятыми.
    cleanText = cleanText.replace(/[^a-zA-Z0-9\s,ñáéíóúü]/g, ' ');
    // 3. Убираем лишние пробелы.
    cleanText = cleanText.replace(/\s+/g, ' ').trim();

    if (!cleanText) {
      return; // Не произносим, если ничего не осталось
    }
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  // Проверяем, есть ли что-то на испанском для озвучки
  const spanishContent = textToSpeak.replace(/<[^>]*>?/gm, '').replace(/[а-яА-ЯёЁ]/g, '').trim();
  if (!spanishContent) {
    return null; // Если нет испанских слов, не показываем кнопку
  }

  return (
    <button onClick={speak} className="audio-button">
      🔊
    </button>
  );
};

export default AudioPlayer;
