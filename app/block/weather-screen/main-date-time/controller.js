function mainDateTimeController(){
    publish(new Topic('datetime', new Date().getTime()),{replace:true});
    //MainDateTimeModel.setDateTime(new Date().getTime());
    mainDateTimeView();
    setTimeout(mainDateTimeController, 1000);
}