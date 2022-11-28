var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });


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
  dbWorldMember = firebase.firestore().collection("WorldMember2022");
  CalPointUser();
  ProfileUser();
}

function CalPointUser() {
}


function ProfileUser() {
  var str = "";
  var xMyPoint = 0;
  dbWorldMember.where('LineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xMyPoint = doc.data().UserPoint;
      sessionStorage.setItem("UserPoint_WorldCup", doc.data().UserPoint);
    });    
    str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" style="margin:-60px auto 20px auto;"></div>';
    str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
    str += '<div style="color:#f68b1f; font-size: 13px; font-weight: 600;"><center>'+ sessionStorage.getItem("EmpName_WorldCup")+'</div>';
    str += '<div class="text-44" style="margin-top:20px;">คะแนนล่าสุดของคุณ<br><br><img src="./img/logo-cup.png" style="width:40px;"></div>';
    str += '<div style="font-size:40px;font-weight:600; color:#0056ff;">'+ xMyPoint +'</div>';
    str += '<div class="text-44" style="margin-top:-8px;">คะแนน</div>';
    str += '<div class="btn-t1" onClick=window.location="selectteam.html";>ไปเลือกทีมกันเถอะ</div>';
    $("#MyProfile").html(str);  
  });
}