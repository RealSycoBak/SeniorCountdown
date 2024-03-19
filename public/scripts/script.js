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

var socket = io();

socket.on("connect", () => {
  console.log("Connected to server");
  socket.emit("sendCount", true);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("sendCount", (data) => {
    console.log(data)
    Hebrew = data.Hebrew;
    Science = data.Science;
    History = data.History;
    Israel_Ed = data.Israel_Ed;
    Selah = data.Selah;
    English = data.English;
    Maths = data.Maths;
    Talmud = data.Talmud;
    Chumash = data.Chumash;
    Navi = data.Navi;
    SchoolDays = data.SchoolDays;
    updateValue("hebrew", data.Hebrew, false)
    updateValue("science", data.Science, false)
    updateValue("history", data.History, false)
    updateValue("israel_ed", data.Israel_Ed, false)
    updateValue("selah", data.Selah, false)
    updateValue("english", data.English, false)
    updateValue("math", data.Maths, false)
    updateValue("Talmud", data.Talmud, false)
    updateValue("chumash", data.Chumash, false)
    updateValue("navi", data.Navi, false)
    updateValue("schooldays", data.SchoolDays, false)

}); 

function updateValue(subject, newValue, send) {
document.getElementById(subject.toLowerCase()).textContent = newValue;
if(send) {
socket.emit("updateCount", {
    "Hebrew": Hebrew,
    "Science": Science,
    "History": History,
    "Israel_Ed": Israel_Ed,
    "Selah": Selah,
    "English": English,
    "Maths": Maths,
    "Talmud": Talmud,
    "Chumash": Chumash,
    "Navi": Navi,
    "SchoolDays": SchoolDays
});
}
}

const deadline = new Date("May 2, 2024 17:00:00").getTime();

const timer = setInterval(function() {
    const current = new Date().getTime();
    const remaining = deadline - current;
    
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    const totalHours = days * 24 + hours;
    
    
    document.getElementById("countdown").textContent = `${totalHours}h : ${minutes}m : ${seconds}s`;
    
    if (remaining < 0) {
        clearInterval(timer);
        document.getElementById("countdown").textContent = "WE ARE FREE";
    }
}, 1000);

const classtimer = setInterval(function() {
const today = new Date().getDay();
const now = new Date();
 if (now.getHours() === 0 && now.getMinutes() === 0) {
    if ([1, 2, 3].includes(today) && Hebrew > 0) {
        Hebrew--;
        updateValue("Hebrew", Hebrew, true);
    }
   if ([1, 2, 3, 4].includes(today) && Science > 0) {
     if (today === 3) {
         Science -= 2;
       updateValue("Science", Science, true);
     } else {
         Science--;
        updateValue("Science", Science, true);
     }
   }
   if ([1, 3, 4].includes(today) && History > 0) {
       History--;
       updateValue("History", History, true);
   }
   if ([2].includes(today) && Israel_Ed > 0) {
       Israel_Ed--;
       updateValue("israel_ed", Israel_Ed, true);
   }
   if ([1].includes(today) && Selah > 0) {
       Selah--;
       updateValue("Selah", Selah, true);
   }
   if ([2, 3, 4].includes(today) && English > 0) {
       English--;
       updateValue("English", English, true);
   }
   if ([1, 2, 3].includes(today) && Maths > 0) {
       Maths--;
       updateValue("Math", Maths, true);
   }
   if ([1, 2, 3, 4].includes(today) && Talmud > 0) {
     if (today === 1) {
          Talmud--;
        updateValue("Talmud", Talmud, true);
      } else {
          Talmud-=2;
         updateValue("Talmud", Talmud, true);
      }
   }
   if ([1, 2, 4].includes(today) && Chumash > 0) {
       Chumash--;
       updateValue("Chumash", Chumash, true);
   }
   if ([1, 3].includes(today) && Navi > 0) {
       Navi--;
       updateValue("Navi", Navi, true);
   }
   if ([1, 2, 3, 4].includes(today) && SchoolDays > 0) {
        SchoolDays--;
        updateValue("schooldays", SchoolDays, true);
    }
}
}, 1000 * 60);