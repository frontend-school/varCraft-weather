window.varCraft = window.varCraft || {}; 
window.varCraft.DateTimeModel = window.varCraft.DateTimeModel || {};
varCraft.DateTime = varCraft.DateTime || {};
varCraft.DateTime.pubsub = varCraft.DateTime.pubsub || new CreatePubSub();

varCraft.DateTimeModel = (function(){
    var time, dayPart, date;
    return {
        setDate: function (newDate){
            if(newDate){
                date = newDate;
                varCraft.DateTime.pubsub.publish("ModelDateChanged", date);
            }
        },
        getDate: function (){
            return date;
        },
        setTime: function (newTime){
            if(newTime){
                time = newTime;
                varCraft.DateTime.pubsub.publish("ModelTimeChanged", time);
            }
        },
        getTime: function(){
            return time;
        },
        setDayPart: function (newDayPart){
            if(newDayPart){
                dayPart = newDayPart;
                varCraft.DateTime.pubsub.publish("ModelDayPartChanged", dayPart);
            }
        },
        getDayPart: function(){
            return dayPart;
        }
    };
})();