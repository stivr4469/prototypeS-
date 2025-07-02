import React from 'react';

const Table = ({ data }) => (
  <table border="1" style={{ borderCollapse: 'collapse', width: '100%', marginTop: '10px' }}>
    <thead>
      <tr>
        {data.headers.map(header => <th key={header}>{header}</th>)}
      </tr>
    </thead>
    <tbody>
      {data.rows.map((row, index) => (
        <tr key={index}>
          {row.map(cell => <td key={cell} dangerouslySetInnerHTML={{ __html: cell }} />)}
        </tr>
      ))}
    </tbody>
  </table>
);

const TheoryBlock = ({ title, content }) => {
  return (
    <div className="theory-block">
      {/* Убираем заголовок из блока, чтобы он не дублировался */}
      {content.map((item, index) => {
        if (item.text) {
          // Используем dangerouslySetInnerHTML для рендеринга HTML
          return <p key={index} dangerouslySetInnerHTML={{ __html: item.text }} />;
        }
        if (item.list) {
          return (
            <ul key={index}>
              {item.list.map(li => <li key={li} dangerouslySetInnerHTML={{ __html: li }} />)}
            </ul>
          );
        }
        if (item.table) {
          return <Table key={index} data={item.table} />;
        }
        return null;
      })}
    </div>
  );
};

export default TheoryBlock;
