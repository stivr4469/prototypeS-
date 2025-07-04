import React from 'react';
import AudioPlayer from './AudioPlayer';

const Table = ({ data }) => (
    <table border="1" style={{ borderCollapse: 'collapse', width: '100%', marginTop: '10px' }}>
      <thead>
        <tr>
          {data.headers.map(header => <th key={header} dangerouslySetInnerHTML={{ __html: header }} />)}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>
                <span dangerouslySetInnerHTML={{ __html: cell }} />
                {/* Озвучка для ячеек таблицы */}
                <AudioPlayer text={cell} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

const TheoryBlock = ({ title, content }) => {
  const renderContentItem = (item, index) => {
    // 👇 Теперь мы ищем и используем speechText
    const textToDisplay = item.text || '';
    const textToSpeak = item.speechText; // Используем только специальное поле для озвучки

    if (item.text) {
      return (
        <p key={index}>
          <span dangerouslySetInnerHTML={{ __html: textToDisplay }} />
          {/* Показываем кнопку, только если есть текст для озвучки */}
          {textToSpeak && <AudioPlayer text={textToSpeak} />}
        </p>
      );
    }
    if (item.list) {
      return (
        <ul key={index}>
          {item.list.map((li, liIndex) => {
             const itemText = (typeof li === 'object' && li !== null) ? li.text : li;
             const itemSpeechText = (typeof li === 'object' && li !== null) ? (li.speechText || li.text) : li;
             const hasSpanish = /[a-zA-Z]/.test(itemText.replace(/<[^>]*>?/gm, ''));

             return (
                <li key={liIndex}>
                    <span dangerouslySetInnerHTML={{ __html: itemText }} />
                    {hasSpanish && <AudioPlayer text={itemSpeechText} />}
                </li>
             )
          })}
        </ul>
      );
    }
    if (item.table) {
      return <Table key={index} data={item.table} />;
    }
    return null;
  };
  
  return (
    <div className="exercise-block">
      <h3>{title}</h3>
      {content.map((item, index) => renderContentItem(item, index))}
    </div>
  );
};

export default TheoryBlock;
