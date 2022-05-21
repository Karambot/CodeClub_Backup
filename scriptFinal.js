const DaysOfWeek = [ 'mon', 'tue', 'wed', 'thu', 'fri']
const date = new Date();
day = date.getDay();

// list of stings ex) ["(01-01)", "(01-02)", "(01-03)", "(01-04)", "(01-05)"]
function updateDate(newDates) { 
    dates = document.body.querySelectorAll(".date div:last-child");
    for(let i = 0, len = dates.length; i < len; i++) {
        dates[i].innerText = newDates[i];
    }
    
} 
/* 
**very unsafe**
    validation of argument not checked
    validation of querySelectorAll not checked
    i might be out of range of newDates    
*/

// list of lists 
function updateMenu(newMenus) {
    menus = document.body.querySelectorAll(".menu");
    for(let i = 0, len = menus.length; i < len; i++) {
        menus[i].innerHTML = '';
        for(j in newMenus[i]) {
            const li = document.createElement("li");
            const span = document.createElement("span");
            span.innerText = newMenus[i][j];
            li.appendChild(span);
            menus[i].appendChild(li);
        }
    }
}
/*
**very unsafe**
    validation of argument not checked
    validation of querySelectorAll not checked
    both i, j might be out of range of newMenu

**inefficiency problem**
    same elements created repetitively
    has a time complexity of O(n^2)
*/


//일자 가져오는 함수(출력ex: [2022,05,09])
function fetchDate(d){ //d = Date class 
    year = d.getFullYear();
    month = d.getMonth() + 1;
    if(month<10){
        month = '0' + String(month);
    }
    date_today = d.getDate();
    if(date_today<10){
        date_today = '0' + String(date_today);
    }
    return [String(year),String(month),String(date_today)];
}

//API에 사용할 STARTDATE, ENDDATE 얻음 + dateDemo Array 얻기
let start = date.getDate()
let startDate = new Date()
let endDate = new Date()
switch(day){
    case 0:
        startDate.setDate(start + 1);
        endDate.setDate(start + 5);
        break;
    case 6:
        startDate.setDate(start + 2);
        endDate.setDate(start + 6);
        break;
    default:
        startDate.setDate(start - (day - 1) );
        endDate.setDate(start + (5 - day) );
        break;
}

let dateArray = [];//html의 표에 넣을 숫자. 
startDate2 = new Date(startDate.getTime())

for(let i = 0;i<5;i++){
    let s = startDate2.getDate();
    dateArray.push(fetchDate(startDate2).join(' - '));
    startDate2.setDate(s + 1);
    
}

mlsv_from = fetchDate(startDate).join(''); //시작 날짜
mlsv_to = fetchDate(endDate).join(''); //끝 날짜
console.log(mlsv_from)
console.log(mlsv_to)
//dateDemo = ['(2000 - 01 - 01)', '(2000 - 01 - 02)', '(2000 - 01 - 03)', '(2000 - 01 - 04)', '(2000 - 01 - 05)']
updateDate(dateArray);

title = document.querySelector('#title');
title.innerText =  mlsv_from + ' ~ ' + mlsv_to;

//================================================== 여기부터 메뉴 출력=======================
let link = "https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=a591678623e24d458213f8a1a59b57aa&Type=json&pIndex=1&pSize=5&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530091&MLSV_FROM_YMD="+mlsv_from+"&MLSV_TO_YMD"+mlsv_to;
//링크 주소(너무 길어서 뺌)
fetch(link) //fetch 이용하면 html 추출 가능
    .then((result) => result.json())//html 텍스트가 json 형식이라 변환 가능함.(링크 참조) --> .json()함수로 변환.
    .then((data) => {
        
        const MealList = data.mealServiceDietInfo[1].row
        let warnText = '해당 정보가 없습니다.';
        menuArray = [warnText,warnText,warnText,warnText,warnText]; //급식 정보가 안 읽히면 warnText를 출력하여 오류 방지
        
        for(let i = 0;i<5;i++){
            let meal = MealList[i].DDISH_NM.split('<br/>');
            meal.map(s => s.trim()+'\n');
            menuArray[i] = meal;
            updateMenu(menuArray);
            console.log(data)

        }
    }
    );


