export const toTitleCase = (text: string) => {
  const [firstLetter, ...rest] = text.replace(/([A-Z])/g, ' $1');
  return `${firstLetter.toUpperCase()}${rest.join('')}`;
};

export const toKebabCase = (text: string) => text.replace(/\s+/g, '-').toLowerCase();
