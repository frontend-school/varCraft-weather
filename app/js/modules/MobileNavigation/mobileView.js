window.varCraft.mobileView =  window.varCraft.mobileView || {};

window.varCraft.mobileView = (function(namespace){
    function init(){
        var days = [namespace.dom.getElem(namespace.CONST.yesterday.forecast),
                    namespace.dom.getElem(namespace.CONST.today.forecast),
                    namespace.dom.getElem(namespace.CONST.tomorrow.forecast)
            ];

        var dayIndicators = [namespace.dom.getElem(namespace.CONST.mobileDay0),
                                namespace.dom.getElem(namespace.CONST.mobileDay1),
                                namespace.dom.getElem(namespace.CONST.mobileDay2)
            ];


        var next = namespace.dom.getElem(namespace.CONST.mobileNextState),
            previous = namespace.dom.getElem(namespace.CONST.mobilePreviousState),
            mainPage = namespace.dom.getElem(namespace.CONST.mainPage);

        var curDay = days[namespace.mobileModel.getState()];
        var curDayIndicator = dayIndicators[namespace.mobileModel.getState()];
        var active = namespace.CONST.activeForecast;
        var activeIndicator = namespace.CONST.activeDayIndicator;
        var unactiveArrow = namespace.CONST.unactiveArrow;

        var statesAmount = namespace.mobileModel.getStatesAmount(),
            firstState = 0,
            lastState = statesAmount - 1;


        if(!namespace.dom.checkClass(curDay, active)){
            namespace.dom.addClass(curDay, active);
        }

        if(!namespace.dom.checkClass(curDayIndicator, activeIndicator)){
            namespace.dom.addClass(curDayIndicator, activeIndicator);
        }


        function slideNext(e){
            var curState = namespace.mobileModel.getState();
            if(curState < lastState){
                if(curState === firstState && namespace.dom.checkClass(previous, unactiveArrow)){
                    namespace.dom.removeClass(previous, unactiveArrow);
                }

                var newState = curState + 1;
                namespace.mobileModel.setState(newState);
                namespace.dom.removeClass(days[curState], active);
                namespace.dom.addClass(days[newState], active);

                namespace.dom.removeClass(dayIndicators[curState], activeIndicator);
                namespace.dom.addClass(dayIndicators[newState], activeIndicator);

                if(newState === lastState){
                    namespace.dom.addClass(next, unactiveArrow);
                }
            }
        }

        function slidePrevious(e){
            var curState = namespace.mobileModel.getState();
            if(curState > firstState){
                if(curState === lastState && namespace.dom.checkClass(next, unactiveArrow)){
                    namespace.dom.removeClass(next, unactiveArrow);
                }

                var newState = curState - 1;
                namespace.mobileModel.setState(newState);
                namespace.dom.removeClass(days[curState], active);
                namespace.dom.addClass(days[newState], active);

                namespace.dom.removeClass(dayIndicators[curState], activeIndicator);
                namespace.dom.addClass(dayIndicators[newState], activeIndicator);

                if(newState === firstState){
                    namespace.dom.addClass(previous, unactiveArrow);
                }
            }
        }

        namespace.Event.addEvent(next, "touchstart", slideNext);
        namespace.Event.addEvent(previous, "touchstart", slidePrevious);

        //swipe
         var startX, endX;

        namespace.Event.addEvent(mainPage, "touchstart", function(e){
            var touch = e.changedTouches[0];
                startX = touch.clientX;
                //console.log("[touch Start]:", startX);
        });

        namespace.Event.addEvent(mainPage, "touchmove", function(e){
            var touch = e.changedTouches[0];
                endX = touch.clientX;
                //console.log("[touch end]:", endX);
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
    };


})(window.varCraft);


