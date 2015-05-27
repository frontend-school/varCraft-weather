window.varCraft.mobileView =  window.varCraft.mobileView || {};

window.varCraft.mobileView = (function(namespace){
    function init(){
        var days = [namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.yesterday.forecastField),
                    namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.today.forecastField),
                    namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.tomorrow.forecastField)
            ];

        var dayIndicators = [namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.mobileDay0),
                                namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.mobileDay1),
                                namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.mobileDay2)
            ];


        var next = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.mobileNextState),
            previous = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.mobilePreviousState),
            mainPage = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.mainPage);

        var curDay = days[namespace.mobileModel.getState()];
        var curDayIndicator = dayIndicators[namespace.mobileModel.getState()];
        var active = namespace.CONSTANTS.cssNames.activeForecast;
        var activeIndicator = namespace.CONSTANTS.cssNames.activeDayIndicator;
        var unactiveArrow = namespace.CONSTANTS.cssNames.unactiveArrow;


        if(!namespace.services.dom.checkClass(curDay, active)){
            namespace.services.dom.addClass(curDay, active);
        }

        if(!namespace.services.dom.checkClass(curDayIndicator, activeIndicator)){
            namespace.services.dom.addClass(curDayIndicator, activeIndicator);
        }


        function slideNext(e){
            var curState = namespace.mobileModel.getState();
            if(curState < 2){
                if(curState === 0 && namespace.services.dom.checkClass(previous, unactiveArrow)){
                    namespace.services.dom.removeClass(previous, unactiveArrow);
                }

                var newState = curState + 1;
                namespace.mobileModel.setState(newState);
                namespace.services.dom.removeClass(days[curState], active);
                namespace.services.dom.addClass(days[newState], active);

                namespace.services.dom.removeClass(dayIndicators[curState], activeIndicator);
                namespace.services.dom.addClass(dayIndicators[newState], activeIndicator);

                if(newState === 2){
                    namespace.services.dom.addClass(next, unactiveArrow);
                }
            }
        }

        function slidePrevious(e){
            var curState = namespace.mobileModel.getState();
            if(curState > 0){
                if(curState === 2 && namespace.services.dom.checkClass(next, unactiveArrow)){
                    namespace.services.dom.removeClass(next, unactiveArrow);
                }

                var newState = curState - 1;
                namespace.mobileModel.setState(newState);
                namespace.services.dom.removeClass(days[curState], active);
                namespace.services.dom.addClass(days[newState], active);

                namespace.services.dom.removeClass(dayIndicators[curState], activeIndicator);
                namespace.services.dom.addClass(dayIndicators[newState], activeIndicator);

                if(newState === 0){
                    namespace.services.dom.addClass(previous, unactiveArrow);
                }
            }
        }

        namespace.services.Event.addEvent(next, "touchstart", slideNext);
        namespace.services.Event.addEvent(previous, "touchstart", slidePrevious);

        //swipe
         var startX, endX;

        namespace.services.Event.addEvent(mainPage, "touchstart", function(e){
            var touch = e.changedTouches[0];
                startX = touch.clientX;
                console.log("[touch Start]:", startX);
        });

        namespace.services.Event.addEvent(mainPage, "touchmove", function(e){
            var touch = e.changedTouches[0];
                endX = touch.clientX;
                console.log("[touch end]:", endX);
                var diff = startX - endX;
                if( diff > 0 && Math.abs(diff) >= window.screen.width / 3 ){
                    slideNext(e);
                    startX = undefined;
                }

                if(diff < 0 && Math.abs(diff) >= window.screen.width/ 3){
                    slidePrevious(e);
                    startX = undefined;
                }
        });


    }

    return {
        _init: init
    }


})(window.varCraft);


