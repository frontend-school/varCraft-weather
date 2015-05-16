//view
function setZ(zYesterday, zToday, zTomorrow){
    document.getElementsByClassName('col-2')[0].style.zIndex = zYesterday;
    document.getElementsByClassName('col-3')[0].style.zIndex = zToday;
    document.getElementsByClassName('col-4')[0].style.zIndex = zTomorrow;
}

//controller
function getActive(){
    var weatherElements = [
        document.getElementsByClassName('col-2')[0],
        document.getElementsByClassName('col-3')[0],
        document.getElementsByClassName('col-4')[0]
    ];
    if(!document.getElementsByClassName('col-2')[0].style.zIndex) {
        setZ(2,3,4);
    }
    var biggestIndex;
    weatherElements.map(function(element, index){
        if(element.style.zIndex == 4)
        {
            biggestIndex = index;
        }
    });
    return biggestIndex;
}

function mobileBack() {
    switch(getActive()) {
        case 0:
            setZ(2, 3, 4);
            break;
        case 1:
            setZ(4, 3, 2);
            break;
        case 2:
            setZ(2, 4, 3);
            break;
        default:
            console.log('An error occurred, which you shall never see');
    }
}

function mobileForward() {
    switch(getActive()) {
        case 0:
            setZ(2, 4, 3);
            break;
        case 1:
            setZ(2, 3, 4);
            break;
        case 2:
            setZ(4, 2, 3);
            break;
        default:
            console.log('An error occurred, which you shall never see');
    }
}