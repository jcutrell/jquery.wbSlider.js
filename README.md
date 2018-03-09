# Don't use this.

I've left it here for posterity, but here's a few points of concern to dissuade you from using this plugin:

1. If you can [avoid using a slider/carousel](http://shouldiuseacarousel.com/), you may be better off utilizing a different design pattern all together.
2. This plugin is way out of date, and has no associated testing.
3. If you do need to use a slider, use something like [Slick.js](http://kenwheeler.github.io/slick/) - 

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

*(publicized controls for the slider)*

* slideControlNext
* slideControlPrev
* slideControlPause
* slideControlPlay

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

### Events (quick list)
*Events that the plugin fires on the jQuery element*  
* wbSlidePrevStart / wbSlidePrevDone  
* wbSlideNextStart / wbSlideNextDone  
* wbSlideChangeStart, (slide index) / wbSlideNextDone, (slide index)  
* slideControlNext / slideControlPrev  
* slideControlPause / slideControlPlay  

### Future plugin options:
*slideRandomly  
*slideTransition : "fade", "slide"  
