window.varCraft = window.varCraft || {};
window.varCraft.DateTimeController = window.varCraft.DateTimeController || {};
varCraft.DateTime = varCraft.DateTime || {};
varCraft.DateTime.pubsub = varCraft.DateTime.pubsub || new CreatePubSub();



varCraft.DateTimeController = (function (namespace){
    var running;

    function start(){
        var curDateTime,
            updateInterval = 60000;

        var updateDate = (function(){
            var previousValue;
            return function(curDateTime){
                if( previousValue !== curDateTime.getDate()){
                    var formatedDate = formatDate(curDateTime);
                    //namespace.DateTime.pubsub.publish("ControllerDateUpdate", formatedDate);
                    namespace.DateTimeModel.setDate(formatedDate);
                    namespace.DateTimeView.refreshDate(namespace.DateTimeModel.getDate());
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
                namespace.DateTimeModel.setDayPart(formatedDayPart);
                namespace.DateTimeView.refreshDayPart(namespace.DateTimeModel.getDayPart());
                //namespace.DateTime.pubsub.publish("ControllerDayPartUpdate", formatedDayPart);
            };
        })();

        function updateTime(curDateTime){
            formatedTime = formatTime(curDateTime);
            namespace.DateTimeModel.setTime(formatedTime);
            namespace.DateTimeView.refreshTime(namespace.DateTimeModel.getTime());
            //namespace.DateTime.pubsub.publish("ControllerTimeUpdate", formatedTime);
        }

        curDateTime = new Date();
        updateTime(curDateTime);
        updateDayPart(curDateTime);
        updateDate(curDateTime);

        if(running){
            clearInterval(running);
        }

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
             //if(!namespace.DateTimeView._enable){
                namespace.DateTimeView._init();
             // }

             // namespace.DateTime.pubsub.subscribe("ControllerTimeUpdate", namespace.DateTimeModel.setTime);
             // namespace.DateTime.pubsub.subscribe("ControllerDateUpdate", namespace.DateTimeModel.setDate);
             // namespace.DateTime.pubsub.subscribe("ControllerDayPartUpdate", namespace.DateTimeModel.setDayPart);

             // namespace.DateTime.pubsub.subscribe("ModelTimeChanged", namespace.DateTimeView.refreshTime);
             // namespace.DateTime.pubsub.subscribe("ModelDayPartChanged", namespace.DateTimeView.refreshDayPart);
             // namespace.DateTime.pubsub.subscribe("ModelDateChanged", namespace.DateTimeView.refreshDate);

             start();
        },
        _stop: stop
    };

})(window.varCraft);
