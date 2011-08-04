//preconditions
// This plugin relies on the following html structure
// <div id="someid">
//  <div class="wbSlide"></div>
//  <div class="wbSlide"></div>
//  <div class="wbSlide"></div>
// </div>
// The option "slideClass" will define what class is counted as slides. The default will be wbSlide

(function($) {

$.fn.wbSlider = function(options) {
        // plugin default options
        var defaults = {
            time : 7000,
            speed : 1250,
            slideRandomly : false,
            prevSlideButton : "#wbSlideLeft", // this can be any selector, as it is passed into the $ function
            nextSlideButton : "#wbSlideRight", // see above
            slideClass : "wbSlide",
            autoStart : true,
            direction : "left" // other option is "up"
        }; // close defaults

        // extends defaults with options provided
        if (options) {
            $.extend(defaults, options);
        } //close if

        // iterate over matched elements
return this.each(function() {
    wbSlide = {};
    wbSlide.slides = $("." + defaults.slideClass);
    wbSlide.numOfSlides = wbSlide.slides.length;
    wbSlide.slideWidth = wbSlide.slides.first().outerWidth();
    wbSlide.slideHeight = wbSlide.slides.first().outerHeight();
    wbSlide.slider = $(this);
    wbSlide.init = function(){
        //set up container
        wbSlide.slider.wrap("<div class='wbSliderWrap' />");
        wbSlide.sliderWrap = wbSlide.slider.parent();
        wbSlide.sliderWrap.css({
            position : "relative",
            width : wbSlide.slideWidth,
            height : wbSlide.slideHeight,
            overflow : "hidden"
        }).append("<div class='clearboth' style='clear:both'/>");
        var sliderCSSObj;
        if (defaults.direction == "left"){
            sliderCSSObj = {
                width: wbSlide.slideWidth * wbSlide.numOfSlides
            }
        } else if (defaults.direction == "up") {
            sliderCSSObj = {
                height: wbSlide.slideHeight * wbSlide.numOfSlides
            }
        }
        wbSlide.slider.css(sliderCSSObj);
        wbSlide.slides.first().addClass("first current");
        wbSlide.slides.last().addClass("last");
        wbSlide.slides.css({
            "position" : "relative",
            "float" : "left",
            "overflow" : "hidden"
        });
    };
    wbSlide.prevSlide = function(){
        var currentPosIndex = $(wbSlide.slides).filter(".current").index();
        if (currentPosIndex == 0) {
            var nextPosIndex = $(wbSlide.slides).filter(".last").index();
        } else {
            var nextPosIndex = currentPosIndex - 1; 
        }
        if (defaults.direction == "left"){
            var animateObj = {
            marginLeft : -1 * wbSlide.slideWidth * nextPosIndex }
        } else if (defaults.direction == "up"){
            var animateObj = {
            marginTop : -1 * wbSlide.slideHeight * nextPosIndex }
        }
        $(wbSlide.slider).animate(animateObj, defaults.speed, function(){
                $(wbSlide.slides).filter(".current").removeClass("current");
                $(wbSlide.slides).eq(nextPosIndex).addClass("current");
            });
    };
    wbSlide.nextSlide = function(){
        var currentPosIndex = $(wbSlide.slides).filter(".current").index();
        var lastIndex = $(wbSlide.slides).filter(".last").index();
        if (currentPosIndex == lastIndex) {
            var nextPosIndex = 0;
        } else {
            var nextPosIndex = currentPosIndex + 1;
        }
        if (defaults.direction == "left"){
            var animateObj = {
            marginLeft : -1 * wbSlide.slideWidth * nextPosIndex }
        } else if (defaults.direction == "up"){
            var animateObj = {
            marginTop : -1 * wbSlide.slideHeight * nextPosIndex }
        }
        $(wbSlide.slider).animate(animateObj, defaults.speed, function(){
                $(wbSlide.slides).filter(".current").removeClass("current");
                $(wbSlide.slides).eq(nextPosIndex).addClass("current");
        }); 
    }
    
    wbSlide.autoStart = function(){
        setInterval(wbSlide.nextSlide, defaults.time);
    }
    wbSlide.clickHandle = function(){
        $(defaults.prevSlideButton).click(function(){
            wbSlide.prevSlide();
        });
        $(defaults.nextSlideButton).click(function(){
            wbSlide.nextSlide();
        });
    }
    
    //call the functions
    wbSlide.init()
    wbSlide.clickHandle();
    if (defaults.autoStart){
        wbSlide.autoStart();
    }
});

} //closing plugin definition
})(jQuery);