/*
	Source:
	van Creij, Maurice (2018). "countdown.js: A simple countdown timer.", http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// establish the class
var countdown = function (cfg) {
	setInterval(function() {
    var currentTime = new Date().getTime();
    var targetTime = cfg.date.getTime();
		// if we're not there yet
		if (currentTime <= targetTime) {
	    // calculate the time differences
	    var days = (targetTime - currentTime) / 1000 / 60 / 60 / 24;
	    var hours = (days - Math.floor(days)) * 24;
	    var minutes = (hours - Math.floor(hours)) * 60;
	    var seconds = (minutes - Math.floor(minutes)) * 60;
	    // format the output
	    days = ('00' + Math.floor(days)).slice(-3);
	    hours = ('0' + Math.floor(hours)).slice(-2);
	    minutes = ('0' + Math.floor(minutes)).slice(-2);
	    seconds = ('0' + Math.floor(seconds)).slice(-2);
	    // distribute the digits
	    var digits = (days + hours + minutes + seconds).split('');
	    for (var a = 0, b = digits.length; a < b; a += 1) {
	      cfg.digits[a].innerHTML = digits[a];
	      cfg.digits[a].className = 'digit_' + digits[a];
	    }
		}
		// else
		else {
			// fire the event
			cfg.onEnd();
		}
  }, 1000);
};

// return as a require.js module
if (typeof define != 'undefined') define([], function () { return countdown });
if (typeof module != 'undefined') module.exports = countdown;
