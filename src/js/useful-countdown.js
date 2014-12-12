/*
	Source:
	van Creij, Maurice (2014). "useful.countdown.js: A simple countdown timer.", version 20141127, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// create the global object if needed
var useful = useful || {};

// extend the global object
useful.Countdown = function () {

	// PROPERTIES

	"use strict";

	// METHODS

	this.init = function (config) {
		// store the configuration
		this.config = config;
		this.element = config.element;
		// gather all 8 of the digits
		this.config.digits = this.element.getElementsByTagName('span');
		this.config.current = new Date().getSeconds();
		// start the countdown
		var _this = this;
		this.config.interval = setInterval(function () {
			var seconds = new Date().getSeconds();
			if (seconds !== _this.config.current) {
				_this.config.current = seconds;
				_this.update();
			}
		}, 200);
		// return the object
		return this;
	};

	this.update = function () {
		// get the current time
		var current = new Date();
		// subtract the two dates
		var rest = this.config.end.getTime() - current.getTime();
		// if there is no time left
		if (rest <= 0) {
			// halt the counter
			rest = 0;
			// trigger the end event
			this.config.onEnd();
			// stop the counter
			clearInterval(this.config.interval);
		}
		// report the days
		var days = rest / 86400000;
		rest = rest % 86400000;
		var reverseDays = parseInt(days, 10).toString().split('').reverse().join('');
		reverseDays = (reverseDays.length < 3) ? reverseDays + '00' : reverseDays;
		reverseDays = (reverseDays.length < 2) ? reverseDays + '0' : reverseDays;
		this.config.digits[0].className = 'digit_' + reverseDays.substr(2, 1);
		this.config.digits[0].innerHTML = reverseDays.substr(2, 1);
		this.config.digits[1].className = 'digit_' + reverseDays.substr(1, 1);
		this.config.digits[1].innerHTML = reverseDays.substr(1, 1);
		this.config.digits[2].className = 'digit_' + reverseDays.substr(0, 1);
		this.config.digits[2].innerHTML = reverseDays.substr(0, 1);
		// report the hours
		var hours = rest / 3600000;
		rest = rest % 3600000;
		var reverseHours = parseInt(hours, 10).toString().split('').reverse().join('');
		reverseHours = (reverseHours.length < 2) ? reverseHours + '0' : reverseHours;
		this.config.digits[3].className = 'digit_' + reverseHours.substr(1, 1);
		this.config.digits[3].innerHTML = reverseHours.substr(1, 1);
		this.config.digits[4].className = 'digit_' + reverseHours.substr(0, 1);
		this.config.digits[4].innerHTML = reverseHours.substr(0, 1);
		// report the minutes
		var minutes = rest / 60000;
		rest = rest % 60000;
		var reverseMinutes = parseInt(minutes, 10).toString().split('').reverse().join('');
		reverseMinutes = (reverseMinutes.length < 2) ? reverseMinutes + '0' : reverseMinutes;
		this.config.digits[5].className = 'digit_' + reverseMinutes.substr(1, 1);
		this.config.digits[5].innerHTML = reverseMinutes.substr(1, 1);
		this.config.digits[6].className = 'digit_' + reverseMinutes.substr(0, 1);
		this.config.digits[6].innerHTML = reverseMinutes.substr(0, 1);
		// report the seconds
		var seconds = rest / 1000;
		rest = rest % 1000;
		var reverseSeconds = parseInt(seconds, 10).toString().split('').reverse().join('');
		reverseSeconds = (reverseSeconds.length < 2) ? reverseSeconds + '0' : reverseSeconds;
		this.config.digits[7].className = 'digit_' + reverseSeconds.substr(1, 1);
		this.config.digits[7].innerHTML = reverseSeconds.substr(1, 1);
		this.config.digits[8].className = 'digit_' + reverseSeconds.substr(0, 1);
		this.config.digits[8].innerHTML = reverseSeconds.substr(0, 1);
	};

};

// return as a require.js module
if (typeof module !== 'undefined') {
	exports = module.exports = useful.Countdown;
}
