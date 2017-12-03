/**
 * Alerts a message to the user using PhoneGap's alert. It is important to
 * understand this is an async function, so code will continue to execute while
 * the alert is displayed to the user.
 * You may optionally pass in a second argument as a JSON object with the
 * following properties:
 *   alertCallback - the function to call after the user presses OK
 *   title - the title to use on the alert box, defaults to 'Alert'
 *   buttonName - the text to place on the button, default to 'OK'
 * @param {String} message
 */
dg.alert = function(message) {
  var options = arguments[1] ? arguments[1] : null;
  var alertCallback = function() { };
  var title = dg.t('Alert');
  var buttonName = dg.t('OK');
  if (options) {
    if (options.alertCallback) { alertCallback = options.alertCallback; }
    if (options.title) { title = options.title; }
    if (options.buttonName) { buttonName = options.buttonName; }
  }

  // Non compiled apps, web apps.
  if (!dg.isCompiled() || dg.isUndefined(navigator.notification)) {
    alert(message);
    alertCallback();
  }
  else { navigator.notification.alert(message, alertCallback, title, buttonName); } // Compiled apps.
};

