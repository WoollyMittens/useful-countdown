/*
	Source:
	van Creij, Maurice (2012). "useful.polyfills.js: A library of useful polyfills to ease working with HTML5 in legacy environments.", version 20121126, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

(function (useful) {

	// Invoke strict mode
	"use strict";

	// private functions
	var polyfills = polyfills || {};

	// enabled the use of HTML5 elements in Internet Explorer
	polyfills.html5 = function () {
		var a, b, elementsList;
		elementsList = ['section', 'nav', 'article', 'aside', 'hgroup', 'header', 'footer', 'dialog', 'mark', 'dfn', 'time', 'progress', 'meter', 'ruby', 'rt', 'rp', 'ins', 'del', 'figure', 'figcaption', 'video', 'audio', 'source', 'canvas', 'datalist', 'keygen', 'output', 'details', 'datagrid', 'command', 'bb', 'menu', 'legend'];
		if (navigator.userAgent.match(/msie/gi)) {
			for (a = 0 , b = elementsList.length; a < b; a += 1) {
				document.createElement(elementsList[a]);
			}
		}
	};

	// allow array.indexOf in older browsers
	polyfills.arrayIndexOf = function () {
		if (!Array.prototype.indexOf) {
			Array.prototype.indexOf = function (obj, start) {
				for (var i = (start || 0), j = this.length; i < j; i += 1) {
					if (this[i] === obj) { return i; }
				}
				return -1;
			};
		}
	};

	// allow document.querySelectorAll (https://gist.github.com/connrs/2724353)
	polyfills.querySelectorAll = function () {
		if (!document.querySelectorAll) {
			document.querySelectorAll = function (a) {
				var b = document, c = b.documentElement.firstChild, d = b.createElement("STYLE");
				return c.appendChild(d), b.__qsaels = [], d.styleSheet.cssText = a + "{x:expression(document.__qsaels.push(this))}", window.scrollBy(0, 0), b.__qsaels;
			};
		}
	};

	// allow addEventListener (https://gist.github.com/jonathantneal/3748027)
	polyfills.addEventListener = function () {
		!window.addEventListener && (function (WindowPrototype, DocumentPrototype, ElementPrototype, addEventListener, removeEventListener, dispatchEvent, registry) {
			WindowPrototype[addEventListener] = DocumentPrototype[addEventListener] = ElementPrototype[addEventListener] = function (type, listener) {
				var target = this;
				registry.unshift([target, type, listener, function (event) {
					event.currentTarget = target;
					event.preventDefault = function () { event.returnValue = false; };
					event.stopPropagation = function () { event.cancelBubble = true; };
					event.target = event.srcElement || target;
					listener.call(target, event);
				}]);
				this.attachEvent("on" + type, registry[0][3]);
			};
			WindowPrototype[removeEventListener] = DocumentPrototype[removeEventListener] = ElementPrototype[removeEventListener] = function (type, listener) {
				for (var index = 0, register; register = registry[index]; ++index) {
					if (register[0] == this && register[1] == type && register[2] == listener) {
						return this.detachEvent("on" + type, registry.splice(index, 1)[0][3]);
					}
				}
			};
			WindowPrototype[dispatchEvent] = DocumentPrototype[dispatchEvent] = ElementPrototype[dispatchEvent] = function (eventObject) {
				return this.fireEvent("on" + eventObject.type, eventObject);
			};
		})(Window.prototype, HTMLDocument.prototype, Element.prototype, "addEventListener", "removeEventListener", "dispatchEvent", []);
	};

	// allow console.log
	polyfills.consoleLog = function () {
		if (!window.console) {
			window.console = {};
			window.console.log = function () {
				// if the reporting panel doesn't exist
				var a, b, messages = '', reportPanel = document.getElementById('reportPanel');
				if (!reportPanel) {
					// create the panel
					reportPanel = document.createElement('DIV');
					reportPanel.id = 'reportPanel';
					reportPanel.style.background = '#fff none';
					reportPanel.style.border = 'solid 1px #000';
					reportPanel.style.color = '#000';
					reportPanel.style.fontSize = '12px';
					reportPanel.style.padding = '10px';
					reportPanel.style.position = (navigator.userAgent.indexOf('MSIE 6') > -1) ? 'absolute' : 'fixed';
					reportPanel.style.right = '10px';
					reportPanel.style.bottom = '10px';
					reportPanel.style.width = '180px';
					reportPanel.style.height = '320px';
					reportPanel.style.overflow = 'auto';
					reportPanel.style.zIndex = '100000';
					reportPanel.innerHTML = '&nbsp;';
					// store a copy of this node in the move buffer
					document.body.appendChild(reportPanel);
				}
				// truncate the queue
				var reportString = (reportPanel.innerHTML.length < 1000) ? reportPanel.innerHTML : reportPanel.innerHTML.substring(0, 800);
				// process the arguments
				for (a = 0, b = arguments.length; a < b; a += 1) {
					messages += arguments[a] + '<br/>';
				}
				// output the queue to the panel
				reportPanel.innerHTML = messages + reportString;
			};
		}
	};

	// allows Object.create (https://gist.github.com/rxgx/1597825)
	polyfills.objectCreate = function () {
		if (typeof Object.create !== "function") {
			Object.create = function (original) {
				function Clone() {}
				Clone.prototype = original;
				return new Clone();
			};
		}
	};

	// allows String.trim (https://gist.github.com/eliperelman/1035982)
	polyfills.stringTrim = function () {
		if (!String.prototype.trim) {
			String.prototype.trim = function () { return this.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, ''); };
		}
		if (!String.prototype.ltrim) {
			String.prototype.ltrim = function () { return this.replace(/^\s+/, ''); };
		}
		if (!String.prototype.rtrim) {
			String.prototype.rtrim = function () { return this.replace(/\s+$/, ''); };
		}
		if (!String.prototype.fulltrim) {
			String.prototype.fulltrim = function () { return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' '); };
		}
	};

	// for immediate use
	polyfills.html5();
	polyfills.arrayIndexOf();
	polyfills.querySelectorAll();
	polyfills.addEventListener();
	polyfills.consoleLog();
	polyfills.objectCreate();
	polyfills.stringTrim();

}(window.useful = window.useful || {}));

/*
	Source:
	van Creij, Maurice (2012). "useful.countdown.js: A simple countdown timer.", version 20120606, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

(function (useful) {

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
	};

}(window.useful = window.useful || {}));
