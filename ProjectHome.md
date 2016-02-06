In order to reset a form back to the initial values I needed some way to store and restore the data. Storing the form data isn't the issue. It can be done easily with
var formdata = $('form').serialize();

This plugin does the opposite:
$('form').deserialize(formdata);

Password fields are ignored.