window.varCraft = window.varCraft || {};
window.varCraft.DateTimeController = window.varCraft.DateTimeController || {};
varCraft.DateTime = varCraft.DateTime || {};
varCraft.DateTime.pubsub = varCraft.DateTime.pubsub || new CreatePubSub();



varCraft.DateTimeController = (function (){
    var running;

    function start(){
        var curDateTime,
            updateInterval = 60000;

        var updateDate = (function(){
            var previousValue;
            return function(curDateTime){
                if( previousValue !== curDateTime.getDate()){
                    var formatedDate = formatDate(curDateTime);
                    varCraft.DateTime.pubsub.publish("ControllerDateUpdate", formatedDate);
                    previousValue = curDateTime.getDate();
                }
                else {
                    previousValue = curDateTime.getDate();

                }
            };
        })();

        var updateDayPart = (function(){
            var previousValue;
            return function(curDateTime){
                var formatedDayPart = formatDayPart(curDateTime);
                varCraft.DateTime.pubsub.publish("ControllerDayPartUpdate", formatedDayPart);
            };
        })();

        function updateTime(curDateTime){
            formatedTime = formatTime(curDateTime);
            varCraft.DateTime.pubsub.publish("ControllerTimeUpdate", formatedTime);
        }

        curDateTime = new Date();
        updateTime(curDateTime);
        updateDayPart(curDateTime);
        updateDate(curDateTime);

        running = setInterval(function(){
            var curDateTime = new Date();
            updateTime(curDateTime);
            updateDayPart(curDateTime);
            updateDate(curDateTime);
        }, updateInterval);

    }

    function stop(){
        clearInterval(running);
    }

    function formatDate(curDateTime){
        var formatedDate = "",
            date = curDateTime.getDate(),
            year = curDateTime.getFullYear(),
            monthes = ["January", "February", "March",
                       "April", "May", "June", "July",
                       "August", "September", "October",
                       "November", "December"],
            days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            month = monthes[curDateTime.getMonth()],
            day = days[curDateTime.getDay()];

        // Wed, September 3
        formatedDate = "" + day + ", " + month + " " + date;
        return formatedDate;
    }

    function formatTime(curDateTime){
        var formatedTime,
            hh = curDateTime.getHours();

        if(hh > 12)hh -= 12;

        var mm = curDateTime.getMinutes();
          if(mm < 10){
            mm = "0" + mm;
          }

        formatedTime = "" + hh + ":" + mm;
        return formatedTime;
    }

    function formatDayPart(curDateTime){
        var hh = curDateTime.getHours();
        if(hh <= 12) {
          formatedDayPart = "am";
        }
        else{
          formatedDayPart = "pm";
        }
        return formatedDayPart;

    }

    return {
        _start: function(){
             if(!varCraft.DateTimeView._enable){
                varCraft.DateTimeView._init();
             }

             varCraft.DateTime.pubsub.subscribe("ControllerTimeUpdate", varCraft.DateTimeModel.setTime);
             varCraft.DateTime.pubsub.subscribe("ControllerDateUpdate", varCraft.DateTimeModel.setDate);
             varCraft.DateTime.pubsub.subscribe("ControllerDayPartUpdate", varCraft.DateTimeModel.setDayPart);

             varCraft.DateTime.pubsub.subscribe("ModelTimeChanged", varCraft.DateTimeView.refreshTime);
             varCraft.DateTime.pubsub.subscribe("ModelDayPartChanged", varCraft.DateTimeView.refreshDayPart);
             varCraft.DateTime.pubsub.subscribe("ModelDateChanged", varCraft.DateTimeView.refreshDate);

             start();
        },
        _stop: stop
    };

})();
