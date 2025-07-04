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
                <AudioPlayer textToSpeak={cell.replace(/<[^>]*>?/gm, '')} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

const TheoryBlock = ({ title, content }) => {
  const renderContentItem = (item, index) => {
    if (item.text) {
      return (
        <p key={index}>
          <span dangerouslySetInnerHTML={{ __html: item.text }} />
          <AudioPlayer textToSpeak={item.speechText} />
        </p>
      );
    }
    if (item.list) {
      return (
        <ul key={index}>
          {item.list.map((li, liIndex) => {
             const itemText = (typeof li === 'object' && li !== null) ? li.text : li;
             const itemSpeechText = (typeof li === 'object' && li !== null) ? li.speechText : itemText;
             return (
                <li key={liIndex}>
                    <span dangerouslySetInnerHTML={{ __html: itemText }} />
                    <AudioPlayer textToSpeak={itemSpeechText.replace(/<[^>]*>?/gm, '')} />
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
