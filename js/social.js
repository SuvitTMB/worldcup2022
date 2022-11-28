var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var i = 0;
var Eid = "";
var cleararray = "";
var arrayIN = [];
var arrayNEW = [];
var arrayIN = [];
var CountIN = 0;
var MaxTime = 0;
var qInterval;
var sGroupChart ="WorldCup";


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_WorldCup")==null) { location.href = "index.html"; }
  Connect_DB();
});



function Connect_DB() {
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
  dbSocial = firebase.firestore().collection("WorldMemberChat");
  DisplayChat();
}


var arrayIN = [];
var CountIN = 0;
var CheckLastTime = "";
function DisplayChat() {
  str = "";
  document.getElementById("TextMamo").innerHTML = "";   
  document.getElementById("DisplayMemo").innerHTML = "";   
  dbSocial.where("GroupChart",'==',sGroupChart)
  .orderBy('PostTimeStamp','desc')
  .limit(100).get().then( snapshot => {
    snapshot.forEach(doc=> {
      //doc.data().orderBy('PostTimeStamp','asc');
      ShowChat(doc);
    });
  })
  DisplayLog();
}

function DisplayLog() {
  timecountdown();
  console.log(arrayIN.length);
  $("#DisplayMemo").html(str);    
}


var str = "";
function NewChat(doc) {
  var str1 = "";
  if(CheckLastTimeUpdate=="") { 
    CheckLastTimeUpdate = "1";
    CheckLastTime = doc.data().PostTimeStamp; 
  }
  if(sessionStorage.getItem("LineID")==doc.data().LineID) {
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
}

var str = "";
function ShowChat(doc) {
  i = i+1;
  arrayIN.push(doc.id);
  if(CheckLastTime=="") { CheckLastTime = doc.data().PostTimeStamp; }
  if(sessionStorage.getItem("LineID")==doc.data().LineID) {
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
}


function CheckMemo() {
  var TimeStampDate = Math.round(Date.now() / 1000);
  if(document.getElementById("TextMamo").value=="") {
    alert("กรุณาใส่ข้อความก่อนกดส่งกำลังใจ");
    return
  }
  dbSocial.add({
    GroupChart : sGroupChart,
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    PostMemo : document.getElementById("TextMamo").value,
    PostDate : dateString,
    PostTimeStamp : TimeStampDate
  });  
  i = i+1;
  var str1 = "";  
  str1+='<div class="message-feed right" id="'+i+'"><div class="pull-right">';
  str1+='<img src="'+ sessionStorage.getItem("LinePicture") +'" class="img-avatar"></div>';
  str1+='<div class="media-body"><div class="mf-content">'+ document.getElementById("TextMamo").value +'</div>';
  str1+='<small class="mf-date"><i class="fa fa-clock-o"></i> '+ dateString +'</small></div></div>';
  str = str1+str;
  $("#DisplayMemo").html(str); 
  $("#TextMamo").val('');
}


function CheckUpdate() {
  CheckLastTimeUpdate = "";
  console.log(CheckLastTime);
  dbSocial.where('PostTimeStamp','>',CheckLastTime).get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      NewChat(doc);
    });
  });
  timecountdown();
}


function timecountdown() {
  var timeleft = MaxTime;
    qInterval = setInterval(function(){
    if(timeleft <= 0) {
      stopcountdown();
      CheckUpdate();
    }
    },10000);
}



function stopcountdown() { 
    clearInterval(qInterval);
}
