/**
 * Displays a confirmation message to the user using PhoneGap's confirm. It is
 * important to understand this is an async function, so code will continue to
 * execute while the confirmation is displayed to the user.
 * You may optionally pass in a second argument as a JSON object with the
 * following properties:
 *   confirmCallback - the function to call after the user presses a button, the
 *               button's label is passed to this function.
 *   title - the title to use on the alert box, defaults to 'Confirm'
 *   buttonLabels - the text to place on the OK, and Cancel buttons, separated
 *                  by comma.
 * @param {String} message
 */
dg.confirm = function(message) {
  var options = arguments[1] ? arguments[1] : null;
  var confirmCallback = function(button) { };
  var title = dg.t('Confirm');
  var buttonLabels = [dg.t('OK'), dg.t('Cancel')];
  if (options) {
    if (options.confirmCallback) {
      confirmCallback = options.confirmCallback;
    }
    if (options.title) { title = options.title; }
    if (options.buttonLabels) { buttonLabels = options.buttonLabels; }
  }
  // Non compiled apps, web apps.
  if (!dg.isCompiled() || dg.isUndefined(navigator.notification)) {
    var r = confirm(message);
    if (r == true) { confirmCallback(1); } // OK button.
    else { confirmCallback(2); } // Cancel button.
  }
  else { // Compiled apps.
    navigator.notification.confirm(
        message,
        confirmCallback,
        title,
        buttonLabels
    );
  }
};

