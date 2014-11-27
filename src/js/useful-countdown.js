/*
	Source:
	van Creij, Maurice (2014). "useful.countdown.js: A simple countdown timer.", version 20141127, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// create the constructor if needed
var useful = useful || {};
useful.Countdown = useful.Countdown || function () {};

// extend the constructor
useful.Countdown.prototype.init = function (cfg) {
	// properties
	"use strict";
	this.cfg = cfg;
	this.obj = cfg.element;
	//methods
	this.start = function () {
		// gather all 8 of the digits
		this.cfg.digits = this.obj.getElementsByTagName('span');
		this.cfg.current = new Date().getSeconds();
		// start the countdown
		var _this = this;
		this.cfg.interval = setInterval(function () {
			var seconds = new Date().getSeconds();
			if (seconds !== _this.cfg.current) {
				_this.cfg.current = seconds;
				_this.update();
			}
		}, 200);
		// disable the start function so it can't be started twice
		this.start = function () {};
	};
	this.update = function () {
		// get the current time
		var current = new Date();
		// subtract the two dates
		var rest = this.cfg.end.getTime() - current.getTime();
		// if there is no time left
		if (rest <= 0) {
			// halt the counter
			rest = 0;
			// trigger the end event
			this.cfg.onEnd();
			// stop the counter
			clearInterval(this.cfg.interval);
		}
		// report the days
		var days = rest / 86400000;
		rest = rest % 86400000;
		var reverseDays = parseInt(days, 10).toString().split('').reverse().join('');
		reverseDays = (reverseDays.length < 3) ? reverseDays + '00' : reverseDays;
		reverseDays = (reverseDays.length < 2) ? reverseDays + '0' : reverseDays;
		this.cfg.digits[0].className = 'digit_' + reverseDays.substr(2, 1);
		this.cfg.digits[0].innerHTML = reverseDays.substr(2, 1);
		this.cfg.digits[1].className = 'digit_' + reverseDays.substr(1, 1);
		this.cfg.digits[1].innerHTML = reverseDays.substr(1, 1);
		this.cfg.digits[2].className = 'digit_' + reverseDays.substr(0, 1);
		this.cfg.digits[2].innerHTML = reverseDays.substr(0, 1);
		// report the hours
		var hours = rest / 3600000;
		rest = rest % 3600000;
		var reverseHours = parseInt(hours, 10).toString().split('').reverse().join('');
		reverseHours = (reverseHours.length < 2) ? reverseHours + '0' : reverseHours;
		this.cfg.digits[3].className = 'digit_' + reverseHours.substr(1, 1);
		this.cfg.digits[3].innerHTML = reverseHours.substr(1, 1);
		this.cfg.digits[4].className = 'digit_' + reverseHours.substr(0, 1);
		this.cfg.digits[4].innerHTML = reverseHours.substr(0, 1);
		// report the minutes
		var minutes = rest / 60000;
		rest = rest % 60000;
		var reverseMinutes = parseInt(minutes, 10).toString().split('').reverse().join('');
		reverseMinutes = (reverseMinutes.length < 2) ? reverseMinutes + '0' : reverseMinutes;
		this.cfg.digits[5].className = 'digit_' + reverseMinutes.substr(1, 1);
		this.cfg.digits[5].innerHTML = reverseMinutes.substr(1, 1);
		this.cfg.digits[6].className = 'digit_' + reverseMinutes.substr(0, 1);
		this.cfg.digits[6].innerHTML = reverseMinutes.substr(0, 1);
		// report the seconds
		var seconds = rest / 1000;
		rest = rest % 1000;
		var reverseSeconds = parseInt(seconds, 10).toString().split('').reverse().join('');
		reverseSeconds = (reverseSeconds.length < 2) ? reverseSeconds + '0' : reverseSeconds;
		this.cfg.digits[7].className = 'digit_' + reverseSeconds.substr(1, 1);
		this.cfg.digits[7].innerHTML = reverseSeconds.substr(1, 1);
		this.cfg.digits[8].className = 'digit_' + reverseSeconds.substr(0, 1);
		this.cfg.digits[8].innerHTML = reverseSeconds.substr(0, 1);
	};
	// go
	this.start();
};

// return as a require.js module
if (typeof module !== 'undefined') {
	exports = module.exports = useful.Countdown;
}
