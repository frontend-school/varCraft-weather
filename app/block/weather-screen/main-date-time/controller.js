function mainDateTimeController(){
    publish(new Topic('datetime', new Date().getTime()),{replace:true});
    mainDateTimeView();
    setTimeout(mainDateTimeController, 1000);
}