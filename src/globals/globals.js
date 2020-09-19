
var globalsVariable = {
  languages: [],
  loggedIn: false,

};


export const setLang = lang => {
  globalsVariable["currentLang"] = lang;
};

export const getlang = () => {
  return globalsVariable["currentLang"];
};


export const setLoggedIn = _loggedIn => {
  globalsVariable["loggedIn"] = _loggedIn;
};


export const displayToast = (errMsg, success = false) => {
  var errDiv = document.getElementById("errorDiv");
  errDiv.style.display = "block";
  if (success) {
    errDiv.style.backgroundColor = "#d4edda";
    errDiv.style.color = "#155724";
  }
  document.getElementById("errorTxt").innerText = errMsg;
  setTimeout(() => {
    errDiv.style.display = "none";
  }, 10000);
};


