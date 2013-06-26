/*
	Source:
	van Creij, Maurice (2012). "useful.countdown.js: A simple countdown timer.", version 20120606, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.

	Prerequisites:
	<script src="./js/useful.js"></script>
	<script src="./js/useful.countdown.js"></script>
*/

(function (useful) {

	// invoke strict mode
	"use strict";

	// private functions
	var countdown = {};
	countdown = {
		start : function (element, model) {
			// gather all 8 of the digits
			model.digits = element.getElementsByTagName('span');
			model.current = new Date().getSeconds();
			// start the countdown
			model.interval = setInterval(function () {
				var seconds = new Date().getSeconds();
				if (seconds !== model.current) {
					model.current = seconds;
					countdown.update(element, model);
				}
			}, 200);
		},
		update : function (element, model) {
			// get the current time
			var current = new Date();
			// subtract the two dates
			var rest = model.end.getTime() - current.getTime();
			// if there is no time left
			if (rest <= 0) {
				// halt the counter
				rest = 0;
				// trigger the end event
				model.onEnd();
				// stop the counter
				clearInterval(model.interval);
			}
			// report the days
			var days = rest / 86400000;
			rest = rest % 86400000;
			var reverseDays = parseInt(days, 10).toString().split('').reverse().join('');
			reverseDays = (reverseDays.length < 3) ? reverseDays + '00' : reverseDays;
			reverseDays = (reverseDays.length < 2) ? reverseDays + '0' : reverseDays;
			model.digits[0].className = 'digit_' + reverseDays.substr(2, 1);
			model.digits[0].innerHTML = reverseDays.substr(2, 1);
			model.digits[1].className = 'digit_' + reverseDays.substr(1, 1);
			model.digits[1].innerHTML = reverseDays.substr(1, 1);
			model.digits[2].className = 'digit_' + reverseDays.substr(0, 1);
			model.digits[2].innerHTML = reverseDays.substr(0, 1);
			// report the hours
			var hours = rest / 3600000;
			rest = rest % 3600000;
			var reverseHours = parseInt(hours, 10).toString().split('').reverse().join('');
			reverseHours = (reverseHours.length < 2) ? reverseHours + '0' : reverseHours;
			model.digits[3].className = 'digit_' + reverseHours.substr(1, 1);
			model.digits[3].innerHTML = reverseHours.substr(1, 1);
			model.digits[4].className = 'digit_' + reverseHours.substr(0, 1);
			model.digits[4].innerHTML = reverseHours.substr(0, 1);
			// report the minutes
			var minutes = rest / 60000;
			rest = rest % 60000;
			var reverseMinutes = parseInt(minutes, 10).toString().split('').reverse().join('');
			reverseMinutes = (reverseMinutes.length < 2) ? reverseMinutes + '0' : reverseMinutes;
			model.digits[5].className = 'digit_' + reverseMinutes.substr(1, 1);
			model.digits[5].innerHTML = reverseMinutes.substr(1, 1);
			model.digits[6].className = 'digit_' + reverseMinutes.substr(0, 1);
			model.digits[6].innerHTML = reverseMinutes.substr(0, 1);
			// report the seconds
			var seconds = rest / 1000;
			rest = rest % 1000;
			var reverseSeconds = parseInt(seconds, 10).toString().split('').reverse().join('');
			reverseSeconds = (reverseSeconds.length < 2) ? reverseSeconds + '0' : reverseSeconds;
			model.digits[7].className = 'digit_' + reverseSeconds.substr(1, 1);
			model.digits[7].innerHTML = reverseSeconds.substr(1, 1);
			model.digits[8].className = 'digit_' + reverseSeconds.substr(0, 1);
			model.digits[8].innerHTML = reverseSeconds.substr(0, 1);
		}
	};

	// public functions
	useful.events = useful.events || {};
	useful.events.add = function (element, eventName, eventHandler) {
		// exceptions
		eventName = (navigator.userAgent.match(/Firefox/i) && eventName.match(/mousewheel/i)) ? 'DOMMouseScroll' : eventName;
		// prefered method
		if ('addEventListener' in element) {
			element.addEventListener(eventName, eventHandler, false);
		}
		// alternative method
		else if ('attachEvent' in element) {
			element.attachEvent('on' + eventName, function (event) { eventHandler(event); });
		}
		// desperate method
		else {
			element['on' + eventName] = eventHandler;
		}
	};

	useful.models = useful.models || {};
	useful.models.clone = function (model) {
		var clonedModel, ClonedModel;
		// if the method exists
		if (typeof(Object.create) !== 'undefined') {
			clonedModel = Object.create(model);
		}
		// else use a fall back
		else {
			ClonedModel = function () {};
			ClonedModel.prototype = model;
			clonedModel = new ClonedModel();
		}
		// return the clone
		return clonedModel;
	};

	useful.css = useful.css || {};
	useful.css.select = function (input, parent) {
		var a, b, elements;
		// validate the input
		parent = parent || document;
		input = (typeof input === 'string') ? {'rule' : input, 'parent' : parent} : input;
		input.parent = input.parent || document;
		input.data = input.data || {};
		// use querySelectorAll to select elements, or defer to jQuery
		elements = (typeof(document.querySelectorAll) !== 'undefined') ?
			input.parent.querySelectorAll(input.rule) :
			(typeof(jQuery) !== 'undefined') ? jQuery(input.parent).find(input.rule).get() : [];
		// if there was a handler
		if (typeof(input.handler) !== 'undefined') {
			// for each element
			for (a = 0 , b = elements.length; a < b; a += 1) {
				// run the handler and pass a unique copy of the data (in case it's a model)
				input.handler(elements[a], useful.models.clone(input.data));
			}
		// else assume the function was called for a list of elements
		} else {
			// return the selected elements
			return elements;
		}
	};

	useful.countdown = {};
	useful.countdown.start = countdown.start;

}(window.useful = window.useful || {}));
