# jquery.wbSlider.js
*Created for Whiteboard Network*
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
### OTHER IMPORTANT DOCUMENTATION:
There are events that you can trigger externally and also subscribe to externally (triggered off of targeted element).
Subscribe to:

*(triggered when slide transition starts)*

* wbSlidePrevStart
* wbSlideNextStart

*(triggered when slide transition ends)*

* wbSlidePrevDone 
* wbSlideNextDone

Trigger:

*(causes transitions)*

* slideControlNext
* slideControlPrev

This will allow other awesome stuff to happen, like multiple sliders and whatnot.
Future: Trigger dynamic events (like "lastSlide"); Also, add in external "pause"/"play" event triggers

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