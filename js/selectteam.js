var WorldCupRound = "Round2";
var TeamMapArr = [];
var UserMapArr = [];
var sCheckA = "";
var sVoteA = 0;
var sVoteB = 0;
var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_WorldCup")==null) { location.href = "index.html"; }
  if(sessionStorage.getItem("News")==null) {
    sessionStorage.setItem("News", "News");
    document.getElementById('id02').style.display='block';
  }
  Connect_DB();
});

/*
(function () {
  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  //I'm adding this section so I don't have to keep updating this pen every year :-)
  //remove this if you don't need it
  let today = new Date(),
      dd = String(today.getDate()).padStart(2, "0"),
      mm = String(today.getMonth() + 1).padStart(2, "0"),
      yyyy = today.getFullYear(),
      nextYear = yyyy + 1,
      dayMonth = "12/01/",
      birthday = dayMonth + yyyy;
  
  today = mm + "/" + dd + "/" + yyyy;
  if (today > birthday) {
    birthday = dayMonth + nextYear;
  }
  
  const countDown = new Date(birthday).getTime(),
      x = setInterval(function() {    

        const now = new Date().getTime(),
              distance = countDown - now;

        document.getElementById("days").innerText = Math.floor(distance / (day)),
          document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
          document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
          document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

        //do something later when date is reached
        if (distance < 0) {
          document.getElementById("headline").innerText = "It's my birthday!";
          document.getElementById("countdown").style.display = "none";
          document.getElementById("content").style.display = "block";
          clearInterval(x);
        }
        //seconds
      }, 0)
  }());
*/

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
  //dbWorldMember = firebase.firestore().collection("WorldMember2022");
  dbWorldCupLog = firebase.firestore().collection("WorldCup2022Log");
  dbWorldCup = firebase.firestore().collection("WorldCup2022");
  GetAllTeam();
  LoadTeam();
}


function GetAllTeam() {
  var i = 0;
  var str = "";
  dbWorldCupLog
  .where('EmpID','==',sessionStorage.getItem("EmpID_WorldCup"))
  .where('WorldCupRound', '==', WorldCupRound)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      TeamMapArr.push(doc.data().RefID);
      UserMapArr.push({ RefID: doc.data().RefID, SelectTeam: doc.data().SelectTeam , GetPoint: doc.data().GetPoint, DateRegister: doc.data().DateRegister, ID: doc.id });
    });    
    //console.log(UserMapArr);
  });
}



function LoadTeam() {
  var str = "";
  var i = 0;
  dbWorldCup
  .where('WorldCupRound','==', WorldCupRound)
  .orderBy('TeamGroup','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //const results = GetCustomerDetailArr.filter(obj => {return obj.CustomerID === doc.data().CustomerID;});
      //console.log(results[0]);
      const results = UserMapArr.filter(obj => {return obj.RefID === doc.id;});
      var CalA = 0;
      var CalB = 0;
      var CalTotal = 0;
      CalTotal = parseFloat(doc.data().VoteA) + parseFloat(doc.data().VoteB);
      CalA = (parseFloat(doc.data().VoteA) / parseFloat(CalTotal)) * 100;
      CalB = (parseFloat(doc.data().VoteB) / parseFloat(CalTotal)) * 100;
      if(CalA !== CalA) { CalA = 0; }
      if(CalB !== CalB) { CalB = 0; }

      //if(results[0]!=undefined) { 
      //  console.log(results[0].RefID+"==="+results[0].SelectTeam);
      //}
      //console.log(results[0]);
      if(doc.data().TeamStatus==1) {
        if(results[0]!=undefined) { 
          str += '<div class="text-44" style="margin-top:10px;margin-bottom: 14px;">การแข่งขันวันที่ '+ doc.data().MatchDate +'</div>';
          str += '<div class="box-team" id="'+i+'"><div class="box-ShowOpen" style="background:#0056ff;color:#fff;">คุณเลือกทีมไปแล้ว</div>';
          str += '<div class="box-left"><img src="team/'+results[0].SelectTeam+'.png" style="width:50px;"><br>'+results[0].SelectTeam+'';
          if(results[0].SelectTeam==doc.data().TeamA) {
            str += '<br><font color="#f68b1f">เลือก '+ CalA.toFixed(2) +'%</font>';
          } else {
            str += '<br><font color="#f68b1f">เลือก '+ CalB.toFixed(2) +'%</font>';
          }
          str += '</div>';
          str += '<div class="box-non" style="background:#d0defa;">คณเลือกทีมแล้ว<br>Team : '+results[0].SelectTeam+'<br>'+ results[0].DateRegister+'<br>รอลุ้นผลการแข่งขัน</div>';
          str += '</div><div class="clr"></div>';
        } else {
          str += '<div class="text-44" style="margin-top:10px;margin-bottom: 14px;">การแข่งขันวันที่ '+ doc.data().MatchDate +'</div>';
          str += '<div class="box-team" id="'+i+'"><div class="box-ShowOpen">เลือกทีมที่คุณคิดว่าจะชนะ</div>';
          str += '<div class="box-left" onclick="ClickTeam(\''+ doc.id +'\',\''+ doc.data().TeamA +'\',\''+ i +'\')"><img src="team/'+doc.data().TeamA+'.png" style="width:50px;"><br>'+doc.data().TeamA+'<br><font color="#f68b1f">เลือก '+ CalA.toFixed(2) +'%</font></div>';
          str += '<div class="box-center"><img src="img/VS.jpg" style="width:30px;margin-top:22px;"></div>';
          str += '<div class="box-right" onclick="ClickTeam(\''+ doc.id +'\',\''+ doc.data().TeamB +'\',\''+ i +'\')"><img src="team/'+doc.data().TeamB+'.png" style="width:50px;"><br>'+doc.data().TeamB+'<br><font color="#f68b1f">เลือก '+ CalB.toFixed(2) +'%</font></div>';
          str += '</div><div class="clr"></div>';
          i++;
        }
      } else {
        if(results[0]!=undefined) { 
          if(doc.data().TeamWinner=="") {
            str += '<div class="text-44" style="margin-top:10px;margin-bottom: 14px;">การแข่งขันวันที่ '+ doc.data().MatchDate +'</div>';
            str += '<div class="box-team"><div class="box-ShowClose" style="background:#0dd004;color:#fff;">รอผลการแข่งขันของคู่นี้</div>';
            str += '<div class="box-left"><img src="team/'+results[0].SelectTeam+'.png" style="width:50px;"><br>'+results[0].SelectTeam+'';
            if(results[0].SelectTeam==doc.data().TeamA) {
              str += '<br><font color="#f68b1f">เลือก '+ CalA.toFixed(2) +'%</font>';
            } else {
              str += '<br><font color="#f68b1f">เลือก '+ CalB.toFixed(2) +'%</font>';
            }
            str += '</div>';
            str += '<div class="box-non" style="background:#badab9;">คณเลือกทีมแล้ว<br>Team : '+results[0].SelectTeam+'<br>'+ results[0].DateRegister+'<br>รอลุ้นผลการแข่งขัน</div>';
            str += '</div><div class="clr"></div>';
          } else {

            str += '<div class="text-44" style="margin-top:10px;margin-bottom: 14px;">การแข่งขันวันที่ '+ doc.data().MatchDate +'</div>';
            str += '<div class="box-team"><div class="box-ShowClose" style="background:#ff0000;color:#fff;">ผลการเลือกทีมของคุณ</div>';
            str += '<div class="box-left"><img src="team/'+results[0].SelectTeam+'.png" style="width:50px;"><br>'+results[0].SelectTeam+'';
            if(results[0].SelectTeam==doc.data().TeamA) {
              str += '<br><font color="#f68b1f">เลือก '+ CalA.toFixed(2) +'%</font>';
            } else {
              str += '<br><font color="#f68b1f">เลือก '+ CalB.toFixed(2) +'%</font>';
            }
            str += '</div>';
            //str += '<div class="box-non" style="background:#fed7d7;">คณเลือกทีมแล้ว<br>Team : '+results[0].SelectTeam+'<br>'+ results[0].DateRegister+'<br>รอลุ้นผลการแข่งขัน</div>';
            if(results[0].SelectTeam==doc.data().TeamWinner) { 
              str += '<div class="box-non" style="background:#f0b67c;">ผลการแข่งขันของคุณ<br>คุณทายผลได้ "ถูกต้อง"<div style="font-size:16px; color:#0056ff;">ได้ '+results[0].GetPoint+' คะแนน</div></div>';
            } else {
              str += '<div class="box-non" style="background:#c0bebe;">ผลการแข่งขันของคุณ<br>คุณทายผล "ไม่ถูกต้อง"<div style="font-size:16px; color:#000000;">คุณไม่ได้คะแนน</div></div>';
            }
            str += '</div><div class="clr"></div>';


          }
        } else {
            str += '<div class="text-44" style="margin-top:10px;margin-bottom: 14px;">การแข่งขันวันที่ '+ doc.data().MatchDate +'</div>';
            str += '<div class="box-team"><div class="box-ShowClose">คุณไม่ได้ทายผลการแข่งขันคู่นี้</div>';
            str += '<div class="out-box-left"><img src="team/'+doc.data().TeamA+'.png" style="width:50px;"><br>'+doc.data().TeamA+'<br><font color="#f68b1f">เลือก '+ CalA.toFixed(2) +'%</font></div>';
            str += '<div class="box-center"><img src="img/VS.jpg" style="width:30px;margin-top:22px;"></div>';
            str += '<div class="out-box-right"><img src="team/'+doc.data().TeamB+'.png" style="width:50px;"><br>'+doc.data().TeamB+'<br><font color="#f68b1f">เลือก '+ CalB.toFixed(2) +'%</font></div>';
            str += '</div><div class="clr"></div>';
        }


      }
    });
    $("#DisplayTeam").html(str);  
  })
}






function ClickTeam(id,x,i) {
  //var CheckTeamVote = document.getElementById('g1').value;
  var str = "";
  var sid = id;
  str += '<center><div class="text-44" style="margin-top:25px; color:#0056ff;font-size:12px;">เลือกทีมที่ต้องการทายผลการแข่งขัน</div>';
  dbWorldCup.where(firebase.firestore.FieldPath.documentId(), "==", id)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<div class="box-team" style="width:90%;height:170px;">';
      str += '<div class="box-left"><img src="team/'+doc.data().TeamA+'.png" style="width:80px;">';
      str += '<br>'+doc.data().TeamA+'';
      if(x==doc.data().TeamA) {
        str += '<br><input type="radio" id="g1" name="CheckTeamVote" class="option-input radio" value="'+doc.data().TeamA+'" Checked>';
      } else {
        str += '<br><input type="radio" id="g1" name="CheckTeamVote" class="option-input radio" value="'+doc.data().TeamA+'">';
      }
      str += '</div>';
      str += '<div class="box-center"><img src="img/VS.jpg" style="width:30px;margin-top:30px;"></div>';
      str += '<div class="box-right"><img src="team/'+doc.data().TeamB+'.png" style="width:80px;">';
      str +='<br>'+doc.data().TeamB+'';
      if(x==doc.data().TeamB) {
        str += '<br><input type="radio" id="g1" name="CheckTeamVote" class="option-input radio" value="'+doc.data().TeamB+'" Checked>';
      } else {
        str += '<br><input type="radio" id="g1" name="CheckTeamVote" class="option-input radio" value="'+doc.data().TeamB+'">';
      }
      str += '</div>';
      str += '</div><div class="clr"></div>';
    });
    //$("#DisplayProfile").html(str);

    str += '<div class="btn-t1" onclick="SaveVote(\''+ sid +'\',\''+ i +'\')">ยืนยันการเลือก</div>';
    str += '<div class="btn-t4" onclick="CloseAll()">ยังไม่เลือก</div>';
    str += '<div class="clr" style="margin-top:8px; font-size:11px; color:#ff0000; font-weight: 600;">เมื่อเลือกทีมแล้วจะไม่สามารถเลือกใหม่ได้แล้วน้า</div>';
    str += '</center>';
    str += '<div class="clr" style="height:30px;"></div>';
    $("#DisplayTeamSelected").html(str);  
    document.getElementById('id01').style.display='block';
  });
  //alert(g+"==="+x);
}

/*
function CheckVote(id) {
  dbWorldCup.where(firebase.firestore.FieldPath.documentId(), "==", id)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sCheckA = doc.data().TeamA;
      sVoteA = doc.data().VoteA;
      sVoteB = doc.data().VoteB;
      console.log(sCheckA+"==="+sVoteA+"==="+sVoteB);
    });
  });
}
*/

function SaveVote(id,i) {
  NewDate();
  var str = "";
  var VoteTeam = $("input:radio[name=CheckTeamVote]:checked").val();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbWorldCup.where(firebase.firestore.FieldPath.documentId(), "==", id)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sCheckA = doc.data().TeamA;
      sVoteA = doc.data().VoteA;
      sVoteB = doc.data().VoteB;
      console.log(sCheckA+"==="+sVoteA+"==="+sVoteB);
    });
    if(sCheckA == VoteTeam) {
      sVoteA = parseFloat(sVoteA)+1;
    } else {
      sVoteB = parseFloat(sVoteB)+1;
    }
    dbWorldCup.doc(id).update({
      VoteA : parseFloat(sVoteA),
      VoteB : parseFloat(sVoteB)
    });  
    dbWorldCupLog.add({
      LineID : sessionStorage.getItem("LineID"),
      Linename : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID_WorldCup"),
      EmpName : sessionStorage.getItem("EmpName_WorldCup"),
      RefID : id,
      SelectTeam : VoteTeam,
      WorldCupRound : WorldCupRound,
      GetPoint : 0,
      DateRegister : dateString,
      TimeStampDate : TimeStampDate
    });
    GetAllTeam();
    LoadTeam();
    str += '<center>';
    str += '<div style="margin-top:25px;font-size:12px; color:#0056ff; font-weight:600;">คุณได้ทำการเลือกทีม<br><br><img src="team/'+VoteTeam+'.png" style="width:120px;"><br>ทีม : '+VoteTeam+'<br>เรียบร้อยแล้ว<br>รอลุ้นผลการแข่งขันของคู่นี้น้า</div>';
    str += '<div class="btn-t3" onclick="CloseAll()">ปิดหน้าต่างนี้</div>';
    str += '</center>';
    str += '<div class="clr" style="height:30px;"></div>';
    $("#DisplayTeamSelected").html(str);  
  });
}
  //$("input[type='radio'][name='CheckTeamVote']:checked").val();
/*
  if(sCheckA == VoteTeam) {
    sVoteA = parseFloat(sVoteA)+1;
  } else {
    sVoteB = parseFloat(sVoteB)+1;
  }
*/
  //var VoteTeam = $("input:radio[name=CheckTeamVote]:checked").val()
  //document.getElementById('g1').value;
  //alert(id+"==="+VoteTeam);

    //document.getElementById('id01').style.display='none';
    //$("#"+i).html("Check");  





/*
function GetLinePicture() {
  var i = 0;
  var str = "";
  LineEmpIDArr = [];
  LinePictureArr = [];
  dbLeagueMember
  .orderBy('EmpID','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      LineEmpIDArr.push(doc.data().EmpID);
      LinePictureArr.push({ EmpID: doc.data().EmpID, EmpName: doc.data().LineName , EmpPicture: doc.data().LinePicture, EmpRef: doc.id });
    });    
  });
}
*/






function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
}



function NewDate() {
  var months = new Array(12);
  months[0] = "January";
  months[1] = "February";
  months[2] = "March";
  months[3] = "April";
  months[4] = "May";
  months[5] = "June";
  months[6] = "July";
  months[7] = "August";
  months[8] = "September";
  months[9] = "October";
  months[10] = "November";
  months[11] = "December";
  var today = new Date();
  var day = today.getDate() + "";
  var monthEN = (today.getMonth()) + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
  xdateCheck = months[monthEN] + " " + day + ", " + year + " " + hour + ":" + minutes + ":" + seconds ;
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}
