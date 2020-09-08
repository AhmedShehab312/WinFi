
var globalsVariable = {
  languages: [],
};


export const setLang = lang => {
  globalsVariable["currentLang"] = lang;
};

export const getlang = () => {
  return globalsVariable["currentLang"];
};






