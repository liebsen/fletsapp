var snackbar = {};
var snackBarElement = document.querySelector('.app__snackbar');
var snackbarMsg = null;
var snackbarClock = null;

module.exports = function (type, message, options) {

  clearInterval(snackbarClock)

  if(options===undefined) options = 8000
  if (!message) return;

  if (snackbarMsg) {
  	snackbarMsg.remove();
  }
  
  snackbarMsg = document.createElement('div');  
  snackbarMsg.className = 'app__snackbar-msg';
  snackbarMsg.classList.add('has-background-' + type);
  snackbarMsg.textContent = message;
  document.querySelector('.app__snackbar').appendChild(snackbarMsg);

  //Show toast for 3secs and hide it
  snackbarClock = setTimeout(() => {
    snackbarMsg.remove();
  }, options);
}
