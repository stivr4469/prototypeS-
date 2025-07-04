export const normalizeAnswer = (text) => {
  if (typeof text !== 'string') return '';
  
  return text
    .trim()
    .toLowerCase()
    .replace(/ñ/g, 'n')
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u');
};
