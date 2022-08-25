window.onload = function(){
    setInterval(setClock, 1000);
    setInterval(setMeal, 1000);
    console.log("script load. 220813")
}

function setMeal(){
    var dateInfo = new Date(); 
    var year = dateInfo.getFullYear();
    var month = modifyNumber(dateInfo.getMonth()+1);
    var date = modifyNumber(dateInfo.getDate());

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var xmlDoc = this.responseXML;
            var x = xmlDoc.getElementsByTagName("row");
            for(var i = 0; i < x.length; i++){
                if(x[i].getElementsByTagName("MMEAL_SC_NM")[0].childNodes[0].nodeValue == "중식"){
                    $("#lunch").html(`열량: ${x[i].getElementsByTagName("CAL_INFO")[0].childNodes[0].nodeValue}<br><br>${x[i].getElementsByTagName("DDISH_NM")[0].childNodes[0].nodeValue}`);
                }
            }
        }
    };
    xhttp.open("GET", `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=02523639969a4d6a961200f98959e647&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530881&MLSV_YMD=${year}${month}${date}`, true);
    xhttp.send();
}

// ${year}${month}${date}

function setClock(){
    var dateInfo = new Date(); 
    var hour = modifyNumber(dateInfo.getHours());
    var min = modifyNumber(dateInfo.getMinutes());
    var sec = modifyNumber(dateInfo.getSeconds());
    var year = dateInfo.getFullYear();
    var month = modifyNumber(dateInfo.getMonth()+1);
    var date = modifyNumber(dateInfo.getDate());
    var day_ = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var day = day_[dateInfo.getDay()];
    
    var dateDisplay = `${year}년 ${month}월 ${date}일 ${day}`;
    var timeDisplay = `${hour}:${min}:${sec}`;
    $("#date").html(dateDisplay);
    $("#time").html(timeDisplay);
    dateInfo.getHours();
}

function modifyNumber(time){
    if(parseInt(time) < 10){
        return "0" + time;
    }
    else{
        return time;
    }
}