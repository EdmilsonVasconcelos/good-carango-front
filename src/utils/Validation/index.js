const isValidText = (text, min, max) => {
  if (!text || text.length < min || text.length > max) return false;

  return true;
};

export { isValidText };
