# useful.countdown.js: Animated Countdown Timer

Counts down to a future date using text and class names to add styling to.

Try the <a href="http://www.woollymittens.nl/useful/default.php?url=useful-countdown">demo</a>.

## How to include the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="./css/useful-countdown.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="./js/useful-countdown.js"></script>
```

To enable the use of HTML5 tags in Internet Explorer 8 and lower, include *html5.js*.

```html
<!--[if lte IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
```

## How to start the script

```javascript
var countdown = new useful.Countdown().init({
	'element' : document.getElementById('id'),
	'end' : new Date('December 31, 2015 23:59:59'),
	'onEnd' : function(){}
});
```

**id : {string}** - The ID attribute of an element somewhere in the document.

**end : {date}** - A date object containing the end date and time.

**onEnd : {function}** - A function that will be executed when the time limit expires.

## How to control the script

### Update

```javascript
countdown.update();
```

Update the clock.

## How to build the script

This project uses node.js from http://nodejs.org/

This project uses gulp.js from http://gulpjs.com/

The following commands are available for development:
+ `npm install` - Installs the prerequisites.
+ `gulp import` - Re-imports libraries from supporting projects to `./src/libs/` if available under the same folder tree.
+ `gulp dev` - Builds the project for development purposes.
+ `gulp prod` - Builds the project for deployment purposes.
+ `gulp watch` - Continuously recompiles updated files during development sessions.
+ `gulp serve` - Serves the project on a temporary web server at http://localhost:8000/ .

## License

This work is licensed under a Creative Commons Attribution 3.0 Unported License. The latest version of this and other scripts by the same author can be found at http://www.woollymittens.nl/
