const express = require('express');
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const { readFileSync } = require('fs');
const { writeFileSync } = require('fs');

var Hebrew = 0; //Initialcount
var Science = 0;
var History = 0;
var Israel_Ed = 0;
var Selah = 0;
var English = 0;
var Maths = 0;
var Talmud = 0;
var Chumash = 0;
var Navi = 0;
var SchoolDays = 0;

function Initialcount(){
  const data = readFileSync('count.json');
  var dataparse = JSON.parse(data)
  Hebrew = dataparse.Hebrew
  Science = dataparse.Science
  History = dataparse.History
  Israel_Ed = dataparse.Israel_Ed
  Selah = dataparse.Selah
  English = dataparse.English
  Maths =  dataparse.Maths
  Talmud = dataparse.Talmud
  Chumash = dataparse.Chumash
  Navi = dataparse.Navi
  SchoolDays = dataparse.SchoolDays
}

Initialcount();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});


function sendData() {
  const data = readFileSync('count.json');
  var dataparse = JSON.parse(data)
  console.log(dataparse); 
  io.emit("sendCount", {
          "Hebrew": dataparse.Hebrew,
          "Science": dataparse.Science,
          "History": dataparse.History,
          "Israel_Ed": dataparse.Israel_Ed,
          "Selah": dataparse.Selah,
          "English": dataparse.English,
          "Maths": dataparse.Maths,
          "Talmud": dataparse.Talmud,
          "Chumash": dataparse.Chumash,
          "Navi": dataparse.Navi,
          "SchoolDays": dataparse.SchoolDays
      });
}

io.on("connection", (socket) => {
  console.log("a user connected");
  sendData()

  socket.on("disconnect", () => {
    console.log("user disconnected");

});

});


function updateValue(name, value) {
  const data = readFileSync('count.json');
  var dataparse = JSON.parse(data)
  try {
    dataparse[name] = value;
    writeFileSync('count.json', JSON.stringify(dataparse, null, 2), 'utf8');
    console.log('Data successfully saved to disk');
    sendData()
  } catch (error) {
    console.log('An error has occurred ', error);
  }
}

setInterval(function() {
const today = new Date().getDay();
const now = new Date();
 if (now.getHours() === 0 && now.getMinutes() === 0) {
    if ([1, 2, 3].includes(today) && Hebrew > 0) {
        Hebrew--;
        updateValue("Hebrew", Hebrew);
    }
   if ([1, 2, 3, 4].includes(today) && Science > 0) {
     if (today === 3) {
         Science -= 2;
       updateValue("Science", Science);
     } else {
         Science--;
        updateValue("Science", Science);
     }
   }
   if ([1, 3, 4].includes(today) && History > 0) {
       History--;
       updateValue("History", History);
   }
   if ([2].includes(today) && Israel_Ed > 0) {
       Israel_Ed--;
       updateValue("israel_ed", Israel_Ed);
   }
   if ([1].includes(today) && Selah > 0) {
       Selah--;
       updateValue("Selah", Selah);
   }
   if ([2, 3, 4].includes(today) && English > 0) {
       English--;
       updateValue("English", English);
   }
   if ([1, 2, 3].includes(today) && Maths > 0) {
       Maths--;
       updateValue("Math", Maths);
   }
   if ([1, 2, 3, 4].includes(today) && Talmud > 0) {
     if (today === 1) {
          Talmud--;
        updateValue("Talmud", Talmud);
      } else {
          Talmud-=2;
         updateValue("Talmud", Talmud);
      }
   }
   if ([1, 2, 4].includes(today) && Chumash > 0) {
       Chumash--;
       updateValue("Chumash", Chumash);
   }
   if ([1, 3].includes(today) && Navi > 0) {
       Navi--;
       updateValue("Navi", Navi);
   }
   if ([1, 2, 3, 4].includes(today) && SchoolDays > 0) {
        SchoolDays--;
        updateValue("schooldays", SchoolDays);
    }
}
}, 1000 * 60);


server.listen(3000, () => {
  console.log("listening on *:3000");
});
