// wbSlider v. 0.2 - requires jQuery 1.7 !!!

//----- preconditions -----
// This plugin relies on the following html structure
//<div id="wrap"> <!-- this allows us to position the entire slider structure however we'd like. The inner-wrap will be set to relative positioning. -->
// <div id="someid">
//  <div class="wbSlide"></div>
//  <div class="wbSlide"></div>
//  <div class="wbSlide"></div>
// </div>
//</div>
// The "someid" div is where the slider is called; $("#someid").wbSlider(<options>);
// The options are outlined in the default object at the beginning of the plugin.

;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variables rather than globals
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'wbSlider',
        defaults = {
            time : 7000,
            speed : 1250,
            slideRandomly : false,
            prevSlideButton : "#wbSlideLeft", // this can be any selector, as it is passed into the $ function
            nextSlideButton : "#wbSlideRight", // see above; Note: Change these if you have more than one slider on a page!
            slideClass : "wbSlide", // these are only class names (don't include the ".") - these don't have to change for each slider, but can.
            wrapClass : "wb-slide-wrap",
            autoStart : true,
            direction : "left", // other option is "up",
            buttons : true, // white circles at the bottom of the slider
            fade : false // fade transition
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or 
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;
        this.slider = $(this.element);
        this.slides = this.slider.find("." + this.options.slideClass);
        this.numOfSlides = this.slides.length;
        this.slideWidth = this.slides.first().outerWidth();
        this.slideHeight = this.slides.first().outerHeight();
        this.slider.wrap("<div class='" + this.options.wrapClass +"' />");
        this.sliderWrap = this.slider.parent();

        this.init();
    }

    Plugin.prototype.init = function () {
        // Place initialization logic here
        // You already have access to the DOM element and the options via the instance, 
        // e.g., this.element and this.options
        
        var $this = this;

        $this.sliderWrap.css({
            position : "relative",
            width : $this.slideWidth,
            height : $this.slideHeight,
            overflow : "hidden"
        }).append("<div class='clearfix' style='clear:both'/>");

        // setting css on slider based on options
        var sliderCSSObj;
        if (!$this.options.fade){
            if ($this.options.direction == "left"){
                sliderCSSObj = {
                    width: $this.slideWidth * $this.numOfSlides
                }
            } else if ($this.options.direction == "up") {
                sliderCSSObj = {
                    height: $this.slideHeight * $this.numOfSlides
                }
            }
            $this.slides.css({
                "position" : "relative",
                "float" : "left",
                "overflow" : "hidden"
            });
        } else {
            sliderCSSObj = {
                    width: $this.slideWidth
                }
            $this.slides.css({
                "position" : "absolute",
                "top" : "0px",
                "left" : "0px"
            });
        }
        $this.slider.css(sliderCSSObj);
        $this.slides.first().addClass("first current");
        $this.slides.last().addClass("last");
        // create buttons
        var buttonhtml = "<div class='wbSlideButtonWrap'>";
        $this.slides.each(function(i,el){
            buttonhtml += "<div class='wbSlideButton'></div>";
            $(el).css({zIndex : 400 - i });
        });
        buttonhtml += "</div>";
        $this.sliderWrap.append(buttonhtml);
        $(".wbSlideButton").eq($($this.slides).filter(".current").index()).addClass("current");
        $($this.sliderWrap).delegate(".wbSlideButton", "click", function(e){
            $this.changeSlide($(e.target).index());
        });

        $this.changeSlide = function(newIndex){
            var nextPosIndex = newIndex;
            if (!$this.options.fade){
                if ($this.options.direction == "left"){
                    var animateObj = {
                    marginLeft : -1 * $this.slideWidth * nextPosIndex }
                } else if (defaults.direction == "up"){
                    var animateObj = {
                    marginTop : -1 * this.slideHeight * nextPosIndex }
                }
                $($this.slider).animate(animateObj, $this.options.speed, function(){
                    $($this.slides).filter(".current").removeClass("current");
                    $($this.slides).eq(nextPosIndex).addClass("current");
                });
            } else {
                $this.slides.eq(nextPosIndex).fadeIn($this.options.speed, function(){
                    $($this.slides).each(function(i,el){
                        if ($(el).index() >= nextPosIndex){ $(el).show(); }
                    });
                    $($this.slides).filter(".current").removeClass("current");
                    $($this.slides).eq(nextPosIndex).addClass("current");
                });
            }
            $(".wbSlideButton.current").removeClass("current");
            $(".wbSlideButton").eq(nextPosIndex).addClass("current");
            clearInterval($this.interval);
            $this.autoStart();
        }
        $this.prevSlide = function(){
            $this.slider.trigger("wbSlidePrevStart");
            var currentPosIndex = $($this.slides).filter(".current").index();
            if (currentPosIndex == 0) {
                var nextPosIndex = $($this.slides).filter(".last").index();
            } else {
                var nextPosIndex = currentPosIndex - 1; 
            }
            if (!$this.options.fade){
                if ($this.options.direction == "left"){
                    var animateObj = {
                    marginLeft : -1 * $this.slideWidth * nextPosIndex }
                } else if ($this.options.direction == "up"){
                    var animateObj = {
                    marginTop : -1 * $this.slideHeight * nextPosIndex }
                }
                $($this.slider).animate(animateObj, $this.options.speed, function(){
                    $($this.slides).filter(".current").removeClass("current");
                    $($this.slides).eq(nextPosIndex).addClass("current");
                    $this.slider.trigger("wbSlidePrevDone");
                });
            } else {
                $($this.slides).eq(nextPosIndex).hide().css({zIndex : 401 }).fadeIn($this.options.speed, function(){
                    $($this.slides).filter(".current").hide();
                    $($this.slides).eq(nextPosIndex).css({zIndex : 400 - nextPosIndex});
                    $($this.slides).each(function(i,el){
                        if ($(el).index() >= nextPosIndex){ $(el).show(); }
                        $($this.slides).filter(".current").removeClass("current");
                        $($this.slides).eq(nextPosIndex).addClass("current");
                        $this.slider.trigger("wbSlidePrevDone");
                    });
                });
            }
            $(".wbSlideButton.current").removeClass("current");
            $(".wbSlideButton").eq(nextPosIndex).addClass("current");
        };
        $this.nextSlide = function(){
            $this.slider.trigger("wbSlideNextStart"); 
            var currentPosIndex = $($this.slides).filter(".current").index();
            var lastIndex = $($this.slides).filter(".last").index();
            if (currentPosIndex == lastIndex) {
                var nextPosIndex = 0;
            } else {
                var nextPosIndex = currentPosIndex + 1;
            }
            if (!$this.options.fade){
                if ($this.options.direction == "left"){
                    var animateObj = {
                    marginLeft : -1 * $this.slideWidth * nextPosIndex }
                } else if ($this.options.direction == "up"){
                    var animateObj = {
                    marginTop : -1 * $this.slideHeight * nextPosIndex }
                }
                $($this.slider).animate(animateObj, this.options.speed, function(){
                    $($this.slides).filter(".current").removeClass("current");
                    $($this.slides).eq(nextPosIndex).addClass("current");
                    $this.slider.trigger("wbSlideNextDone");
                });
            } else {
                $($this.slides).eq(nextPosIndex).hide().css({zIndex : 401 }).fadeIn($this.options.speed, function(){
                    $($this.slides).filter(".current").hide();
                    $($this.slides).eq(nextPosIndex).css({zIndex : 400 - nextPosIndex});
                    $($this.slides).each(function(i,el){
                        if ($(el).index() >= nextPosIndex){ $(el).show(); }
                        $($this.slides).filter(".current").removeClass("current");
                        $($this.slides).eq(nextPosIndex).addClass("current");
                        $this.slider.trigger("wbSlideNextDone");
                    });
                });
            }
            $(".wbSlideButton.current").removeClass("current");
            $(".wbSlideButton").eq(nextPosIndex).addClass("current");
        }
        $this.autoStart = function(){
            $this.interval = setInterval(function(){
                $this.slider.trigger("slideControlNext");
            }, $this.options.time);
        }
        $this.clickHandle = function(){
            $($this.options.prevSlideButton).click(function(){
                $this.slider.trigger("slideControlPrev");
            });
            $($this.options.nextSlideButton).click(function(){
                $this.slider.trigger("slideControlNext");
            });
        }
        $this.eventHandle = function(){
            $this.slider.on("slideControlNext", function(){
                $this.nextSlide();
            }).on("slideControlPrev", function(){
                $this.prevSlide();
            });
        }

        $this.clickHandle();
        $this.eventHandle();
        if ($this.options.autoStart){
            $this.autoStart();
        }

    };

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );