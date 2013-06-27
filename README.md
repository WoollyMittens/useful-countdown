# useful.countdown.js: Animated Countdown Timer

Counts down to a future date using text and class names to add styling to.

Try the <a href="http://www.woollymittens.nl/useful/default.php?url=countdown">countdown demo</a>.

## How to use the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="./css/countdown.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="./js/useful.countdown.js"></script>
```

To enable the use of HTML5 tags in Internet Explorer 8 and lower, include *html5.js*. To provide an alternative for *document.querySelectorAll* in Internet Explorer 8 and lower, include *jQuery*.

```html
<!--[if lte IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<![endif]-->
```

### Using vanilla JavaScript

This is the safest way of starting the script, but allows for only one target element at a time.

```javascript
var parent = documentGetElementById('id');
useful.countdown.start(parent, {
	'end' : new Date('December 24, 2013 23:59:00'),
	'onEnd' : function(){}
});
```

**id : {string}** - The ID attribute of an element somewhere in the document.

**parent : {DOM node}** - The DOM element around which the functionality is centred.

**end : {date}** - A date object containing the end date and time.

**onEnd : {function}** - A function that will be executed when the time limit expires.

### Using document.querySelectorAll

This method allows CSS Rules to be used to apply the script to one or more nodes at the same time.

```javascript
useful.css.select({
	rule : '#countdown',
	handler : useful.countdown.start,
	data : {
		'end' : new Date('December 24, 2013 23:59:00'),
		'onEnd' : function(){}
	}
});
```

**rule : {string}** - The CSS Rule for the intended target(s) of the script.

**handler : {function}** - The public function that starts the script.

**data : {object}** - Name-value pairs with configuration data.

### Using jQuery

This method is similar to the previous one, but uses jQuery for processing the CSS rule.

```javascript
$('#countdown').each(function (index, element) {
	useful.countdown.start(element, {
		'end' : new Date('December 24, 2013 23:59:00'),
		'onEnd' : function(){}
	});
});
```

## License
This work is licensed under a Creative Commons Attribution 3.0 Unported License. The latest version of this and other scripts by the same author can be found at http://www.woollymittens.nl/
