# countdown.js: Animated Countdown Timer

*DEPRICATION WARNING: the functionality in this script has been superceeded / trivialised by updated web standards.*

Counts down to a future date using text and class names to add styling to.

## How to include the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="css/countdown.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="js/countdown.js"></script>
```

Or use [Require.js](https://requirejs.org/).

```js
requirejs([
	'js/countdown.js'
], function(countdown) {
	...
});
```

Or use imported as a component in existing projects.

```js
@import {countdown} from "js/countdown.js');
``

## How to start the script

```javascript
var countdown = new Countdown({
	'digits' : document.getElementById('id'),
	'date' : new Date('December 31, 2015 23:59:59'),
	'onEnd' : function(){}
});
```

**digits : {CSS selector}** - A CSS selector for the digits in the display.

**date : {Date}** - A date object containing the end date and time.

**onEnd : {Function}** - A function that will be executed when the time limit expires.

## License

This work is licensed under a [MIT License](https://opensource.org/licenses/MIT). The latest version of this and other scripts by the same author can be found on [Github](https://github.com/WoollyMittens).
