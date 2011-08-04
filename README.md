# jquery.wbSlider.js
*Created for Whiteboard Network*
===
### Simple usage:
 *preconditions*
The markup:

`<div id="someid">
   <div class="wbSlide"></div>
   <div class="wbSlide"></div>
   <div class="wbSlide"></div>
</div>`

The js:

`<script>`
`$(document).ready(function(){`
	`$("#someid").wbSlider();`
`});`
`</script>`

===
### Important options:
*Plugin default options*
* time : 7000,
* speed : 1250,
* prevSlideButton : "#wbSlideLeft", *// this can be any selector, as it is passed into the $ function*
* nextSlideButton : "#wbSlideRight", *// see above*
* slideClass : "wbSlide",
* autoStart : true,
* direction : "left" *or* "up"

### Future plugin options:
*slideRandomly
*slideTransition : "fade", "slide"