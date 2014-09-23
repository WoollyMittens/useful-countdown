/*
	Source:
	van Creij, Maurice (2012). "useful.countdown.js: A simple countdown timer.", version 20120606, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// public object
var useful = useful || {};

(function(){

	// invoke strict mode
	"use strict";

	// private functions
	useful.Countdown = function (obj, cfg) {
		this.obj = obj;
		this.cfg = cfg;
		this.start = function () {
			var context = this;
			// gather all 8 of the digits
			context.cfg.digits = context.obj.getElementsByTagName('span');
			context.cfg.current = new Date().getSeconds();
			// start the countdown
			context.cfg.interval = setInterval(function () {
				var seconds = new Date().getSeconds();
				if (seconds !== context.cfg.current) {
					context.cfg.current = seconds;
					context.update();
				}
			}, 200);
			// disable the start function so it can't be started twice
			this.start = function () {};
		};
		this.update = function () {
			var context = this;
			// get the current time
			var current = new Date();
			// subtract the two dates
			var rest = context.cfg.end.getTime() - current.getTime();
			// if there is no time left
			if (rest <= 0) {
				// halt the counter
				rest = 0;
				// trigger the end event
				context.cfg.onEnd();
				// stop the counter
				clearInterval(context.cfg.interval);
			}
			// report the days
			var days = rest / 86400000;
			rest = rest % 86400000;
			var reverseDays = parseInt(days, 10).toString().split('').reverse().join('');
			reverseDays = (reverseDays.length < 3) ? reverseDays + '00' : reverseDays;
			reverseDays = (reverseDays.length < 2) ? reverseDays + '0' : reverseDays;
			context.cfg.digits[0].className = 'digit_' + reverseDays.substr(2, 1);
			context.cfg.digits[0].innerHTML = reverseDays.substr(2, 1);
			context.cfg.digits[1].className = 'digit_' + reverseDays.substr(1, 1);
			context.cfg.digits[1].innerHTML = reverseDays.substr(1, 1);
			context.cfg.digits[2].className = 'digit_' + reverseDays.substr(0, 1);
			context.cfg.digits[2].innerHTML = reverseDays.substr(0, 1);
			// report the hours
			var hours = rest / 3600000;
			rest = rest % 3600000;
			var reverseHours = parseInt(hours, 10).toString().split('').reverse().join('');
			reverseHours = (reverseHours.length < 2) ? reverseHours + '0' : reverseHours;
			context.cfg.digits[3].className = 'digit_' + reverseHours.substr(1, 1);
			context.cfg.digits[3].innerHTML = reverseHours.substr(1, 1);
			context.cfg.digits[4].className = 'digit_' + reverseHours.substr(0, 1);
			context.cfg.digits[4].innerHTML = reverseHours.substr(0, 1);
			// report the minutes
			var minutes = rest / 60000;
			rest = rest % 60000;
			var reverseMinutes = parseInt(minutes, 10).toString().split('').reverse().join('');
			reverseMinutes = (reverseMinutes.length < 2) ? reverseMinutes + '0' : reverseMinutes;
			context.cfg.digits[5].className = 'digit_' + reverseMinutes.substr(1, 1);
			context.cfg.digits[5].innerHTML = reverseMinutes.substr(1, 1);
			context.cfg.digits[6].className = 'digit_' + reverseMinutes.substr(0, 1);
			context.cfg.digits[6].innerHTML = reverseMinutes.substr(0, 1);
			// report the seconds
			var seconds = rest / 1000;
			rest = rest % 1000;
			var reverseSeconds = parseInt(seconds, 10).toString().split('').reverse().join('');
			reverseSeconds = (reverseSeconds.length < 2) ? reverseSeconds + '0' : reverseSeconds;
			context.cfg.digits[7].className = 'digit_' + reverseSeconds.substr(1, 1);
			context.cfg.digits[7].innerHTML = reverseSeconds.substr(1, 1);
			context.cfg.digits[8].className = 'digit_' + reverseSeconds.substr(0, 1);
			context.cfg.digits[8].innerHTML = reverseSeconds.substr(0, 1);
		};
		// go
		this.start();
	};

	// return as a require.js module
	if (typeof module !== 'undefined') {
		exports = module.exports = useful.Countdown;
	}

})();
