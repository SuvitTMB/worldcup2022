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
  dbBALife_RH = firebase.firestore().collection("BAlifeMember_RH");
  //dbWorldCupLog = firebase.firestore().collection("WorldCup2022Log");
  //dbWorldCup = firebase.firestore().collection("WorldCup2022");
  MemberRanking()
  //LoadTeam();
}


function MemberRanking(){
  var i = 0;
  count = 0;
  dataSet = "";
  dataSrc = [];
  //.where('EmpGroup','==', sessionStorage.getItem("EmpGroup_BA"))
  dbWorldMember
  .orderBy('UserPoint','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = (i+1);
      var ShowPicture = '<img src="'+doc.data().LinePicture+'" style="width:30px;">';
      //sAchievement = addCommas(doc.data().Achievement);
      //dataSet = [doc.data().LinePicture, doc.data().Ranking ,addCommas(doc.data().Target_BATrip.toFixed(0)) ,addCommas(doc.data().TotalAPENet.toFixed(0)), doc.data().Achievement, doc.id, i];
      dataSet = [ShowPicture, doc.data().EmpName ,addCommas(doc.data().UserPoint.toFixed(0)), i];
      dataSrc.push(dataSet);
      count++;
    }); 
    dTable=$('#ex-table').DataTable({
      "bDestroy": true,    
      data: dataSrc,
      columns: [
        { title: "LINE", className: "txt-center" },
        { title: "Player" },
        { title: "คะแนน", className: "txt-center"  },
        { title: "อันดับ", className: "txt-center"  },
        ],
        dom: 'lfrtipB',
        buttons: [
            //'copy', 'excelFlash', 'excel', 'pdf', 'print'
        ],
          lengthMenu: [[50, 100, -1], [50, 100, "All"]],

        columnDefs: [ { type: 'num-fmt', 'targets': [1] } ],
        order: [[ 2, 'desc']]
      });   
  });
  $('#ex-table').DataTable().destroy();
  $("#ex-table tbody").remove();
}

function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}


/*
function UserRanking() {
  var str = "";
  dbWorldMember.where('LineID','==',sessionStorage.getItem("LineID"))
  .limit(1).get().then((snapshot)=> {
    snapshot.forEach(doc=> {
        str += '<div class="btn-leaderboard1" style="background:#002d63; color:#fff;">';
        str += '<div style="width:70%;float: left;line-height: 1.2;"><b>'+doc.data().EmpName+'</b></div>';
        str += '<div class="leader-rank"><div class="Rainking-number" style="color:#f68b1f;"></div><div style="font-size:10px;color:#fff;">อันดับ</div></div>';
        str += '<div class="leader-rank"><div class="Rainking-number" style="color:#f68b1f;">'+addCommas(doc.data().UserPoint)+'</div><div style="font-size:10px;color:#fff;">คะแนน</div></div>';
        str += '</div>';        
    });
    $("#DisplayUserRanking").html(str);
  });
}





function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}
*/