// Creating questionss and answers
//*****************************************************************************
var i = 0;
var Eid = "";
var cleararray = "";
var arrayIN = [];
var arrayNEW = [];
var arrayIN = [];
var CountIN = 0;
var MaxTime = 0;
var qInterval;
var sGroupChart ="Bento";

var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
var sLineName = "Website";
var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
//sessionStorage.setItem("LineID", sLineID);
//sessionStorage.setItem("LineName", sLineName);
//sessionStorage.setItem("LinePicture", sLinePicture);
//sessionStorage.setItem("Survey1", sSurvey1);


var firebaseConfig = {
  apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
  authDomain: "retailproject-6f4fc.firebaseapp.com",
  projectId: "retailproject-6f4fc",
  storageBucket: "retailproject-6f4fc.appspot.com",
  messagingSenderId: "653667385625",
  appId: "1:653667385625:web:a5aed08500de80839f0588",
  measurementId: "G-9SKTRHHSW9"
};
firebase.initializeApp(firebaseConfig);
//var db = firebase.firestore().collection("Bento");

var db = firebase.firestore();



$(document).ready(function () {
  DisplayChat();
  //alert("Array IN : "+arrayIN.length);
  //LoadID();
});


const loadmore = document.querySelector('#loadmore');
let currentItems = 8;
loadmore.addEventListener('click', (e) => {
    const elementList = [...document.querySelectorAll('.list .list-element')];
    for (let i = currentItems; i < currentItems + 8; i++) {
        if (elementList[i]) {
            elementList[i].style.display = 'block';
        }
    }
    currentItems += 8;

    // Load more button will be hidden after list fully loaded
    if (currentItems >= elementList.length) {
        event.target.style.display = 'none';
    }
})



//var table = document.querySelector('#tbresult');
var arrayIN = [];
var CountIN = 0;
var CheckLastTime = "";
function DisplayChat() {
  str = "";
  //$("#DisplayMemo").remove();
  document.getElementById("TextMamo").innerHTML = "";   
  document.getElementById("DisplayMemo").innerHTML = "";   
  //db.orderBy("state").orderBy("PostTimeStamp", "desc").limit(3).get().then((snapshot)=> {
  //db.collection("Bento").orderBy("PostTimeStamp", "desc").get().then((snapshot)=> {
  //db.orderBy("state").orderBy("PostTimeStamp", "desc").get().then((snapshot)=> {
    //console.log(snapshot.length);
  //db.collection("Bento").where("GroupChart", "==", sGroupChart).orderBy("PostTimeStamp","desc").get().then((snapshot)=> {
    //snapshot.forEach(doc=>{

/*
  db.firestore().collection('Bento')
    .where("GroupChart",'==',sGroupChart)
    .orderBy('PostTimeStamp','asc')
    .limit(2).get()
    .then((snapshot)=> { snapshot.forEach(doc=> {


      //db.collection("Bento").orderBy("PostTimeStamp","desc");
      //.orderBy("GroupChart", "desc");
      //arrayIN.push(doc.id);
      //console.log(doc);
      ShowChat(doc);
    });
    DisplayLog();
    //alert(i);
  });
*/


  db.collection('Bento')
    //.where("GroupChart",'==',sGroupChart)
    .orderBy('PostTimeStamp','desc')
    .limit(100).get().then( snapshot => {
      snapshot.forEach(doc=> {
        //doc.data().orderBy('PostTimeStamp','asc');
        ShowChat(doc);
      });
  })
  DisplayLog();






  //alert(arrayIN.length);
  //console.log(doc);
  
  //console.log(arrayIN.length);



    //arrayIN.forEach(function(element) {
    //console.log(element.length);
    //});

  //CountIN = arrayIN.length;
  //alert(i);
  //var ShowResults = arrayIN.length;
  //alert(ShowResults);
}


function DisplayLog() {
  timecountdown();
  //CheckUpdate();
  console.log(arrayIN.length);
  $("#DisplayMemo").html(str);    
}



var str = "";
function ShowChat(doc) {
  i = i+1;
  arrayIN.push(doc.id);
  if(CheckLastTime=="") { CheckLastTime = doc.data().PostTimeStamp; }
  if(sLineID==doc.data().LineID) {
    str+='<div class="list-element"><div class="message-feed right" id="'+i+'"><div class="pull-right">';
    str+='<img src="'+ doc.data().LinePicture +'" class="img-avatar"></div>';
    str+='<div class="media-body"><div class="mf-content">'+ doc.data().PostMemo +'</div>';
    str+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ doc.data().PostDate +'</small></div></div></div>';
  } else {
    str+='<div class="list-element"><div class="message-feed media" id="'+i+'"><div class="pull-left">';
    str+='<img src="'+ doc.data().LinePicture +'" class="img-avatar"></div>';
    str+='<div class="media-body"><div class="mf-content">'+ doc.data().PostMemo +'</div>';
    str+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ doc.data().PostDate +'</small></div></div></div>';
  }
    $("#DisplayMemo").html(str); 
  //console.log(arrayIN.length);
}



function CheckMemo() {
  var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
  if(document.getElementById("TextMamo").value=="") {
    alert("กรุณาใส่ข้อความก่อนกดส่งกำลังใจ");
    return
  }
  db.collection("Bento").add({
    GroupChart : sGroupChart,
    LineID : sLineID,
    LineName : sLineName,
    LinePicture : sLinePicture,
    PostMemo : document.getElementById("TextMamo").value,
    PostDate : dateString,
    PostTimeStamp : dateString
  });  
  i = i+1;
  var str1 = "";  

  str1+='<div class="message-feed right" id="'+i+'"><div class="pull-right">';
  str1+='<img src="'+ sLinePicture +'" class="img-avatar"></div>';
  str1+='<div class="media-body"><div class="mf-content">'+ document.getElementById("TextMamo").value +'</div>';
  str1+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ dateString +'</small></div></div>';

  str = str1+str;
  $("#DisplayMemo").html(str); 
  $("#TextMamo").val('');
}


function CheckUpdate() {
  CheckLastTimeUpdate = "";
  //alert("stoptime : "+CheckLastTime);
  console.log(CheckLastTime);


  db.collection("Bento").where('PostTimeStamp','>',CheckLastTime).get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      NewChat(doc);
    });
  });
  timecountdown();
}




var str = "";
function NewChat(doc) {
  var str1 = "";
  if(CheckLastTimeUpdate=="") { 
    CheckLastTimeUpdate = "1";
    CheckLastTime = doc.data().PostTimeStamp; 
  }
  if(sLineID==doc.data().LineID) {
    str1+='<div class="list-element"><div class="message-feed right" id="'+i+'"><div class="pull-right">';
    str1+='<img src="'+ doc.data().LinePicture +'" class="img-avatar"></div>';
    str1+='<div class="media-body"><div class="mf-content">'+ doc.data().PostMemo +'</div>';
    str1+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ doc.data().PostDate +'</small></div></div></div>';
  } else {
    str1+='<div class="list-element"><div class="message-feed media" id="'+i+'"><div class="pull-left">';
    str1+='<img src="'+ doc.data().LinePicture +'" class="img-avatar"></div>';
    str1+='<div class="media-body"><div class="mf-content">'+ doc.data().PostMemo +'</div>';
    str1+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ doc.data().PostDate +'</small></div></div></div>';
  }
  str = str1+str;
  $("#DisplayMemo").html(str); 
  //console.log(arrayIN.length);
}



function timecountdown() {
  var timeleft = MaxTime;
    qInterval = setInterval(function(){
    if(timeleft <= 0) {
      stopcountdown();
      CheckUpdate();
      //DisplayHeart();
    }
    },10000);
}



function stopcountdown() { 
    clearInterval(qInterval);
}

