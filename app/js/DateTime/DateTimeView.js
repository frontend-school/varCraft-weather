window.varCraft = window.varCraft || {};
window.varCraft.DateTimeView = window.varCraft.DateTimeView || {};
varCraft.DateTime = varCraft.DateTime || {};
varCraft.DateTime.pubsub = varCraft.DateTime.pubsub || new CreatePubSub();


varCraft.DateTimeView = (function(){
    function init(){
        var dateField = document.querySelector('.js-main-date'),
            timeField = document.querySelector('.js-main-time'),
            dayPartField = document.querySelector('.js-dayPart');


        this.refreshDate = function(date){
            if(date){
                dateField.textContent = date;
                //console.log("[DateTimeView dateRefresh]" + date);
                return true;
            }
            return false;
        };

        this.refreshTime = function (time, dayPart){
            if(time){
                //console.log("[DateTimeView timeRefresh]" + time);
                timeField.textContent = time;
                return true;
            }

        };

        this.refreshDayPart = function(dayPart){
            if(dayPart){
                var span =document.createElement("span");
                span.innerHTML = dayPart;
                span.className = "user-info__day-part js-dayPart";
                var t = document.createTextNode(dayPart);
                timeField.appendChild(span);


                //console.log("[DateTimeView dayPartRefresh]" + dayPart);

                return true;
            }
        };
    }

    return {
        _init: init,
        _enable: false
    };

})();