//function MainDateTimeModelConstructor(){
//    var hours;
//    var minutes;
//    var ampm;
//    var date;
//
//    this.setDateTime = function setDateTime(unixTime){
//        var dateTime = new Date(unixTime);
//        hours = dateTime.getHours();
//        minutes = dateTime.getMinutes();
//        ampm = (hours >= 12)
//            ? 'PM'
//            : 'AM';
//        hours = (hours > 12)
//            ? hours - 12
//            : hours;
//        date = dateTime.toDateString();
//    };
//
//    this.getDateTime = function getDateTime(){
//        return {
//            hours: hours,
//            minutes: minutes,
//            ampm: ampm,
//            date: date
//        }
//    };
//}
//var MainDateTimeModel = new MainDateTimeModelConstructor();