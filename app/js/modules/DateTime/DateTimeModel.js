window.varCraft = window.varCraft || {}; 
window.varCraft.DateTimeModel = window.varCraft.DateTimeModel || {};
// varCraft.DateTime = varCraft.DateTime || {};
// varCraft.DateTime.pubsub = varCraft.DateTime.pubsub || new CreatePubSub();

varCraft.DateTimeModel = (function(namespace){
    var time, dayPart, date;
    return {
        setDate: function (newDate){
            if(newDate){
                date = newDate;
                namespace.DateTime.pubsub.publish("ModelDateChanged", date);
            }
        },
        getDate: function (){
            return date;
        },
        setTime: function (newTime){
            if(newTime){
                time = newTime;
                namespace.DateTime.pubsub.publish("ModelTimeChanged", time);
            }
        },
        getTime: function(){
            return time;
        },
        setDayPart: function (newDayPart){
            if(newDayPart){
                dayPart = newDayPart;
                namespace.DateTime.pubsub.publish("ModelDayPartChanged", dayPart);
            }
        },
        getDayPart: function(){
            return dayPart;
        }
    };
})(window.varCraft);