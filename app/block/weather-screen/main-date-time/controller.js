function mainDateTimeController(){
    MainDateTimeModel.setDateTime(new Date().getTime());
    mainDateTimeView();
    setTimeout(mainDateTimeController, 1000);
}