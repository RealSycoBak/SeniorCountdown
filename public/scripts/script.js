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
    updateValue("hebrew", data.Hebrew)
    updateValue("science", data.Science)
    updateValue("history", data.History)
    updateValue("israel_ed", data.Israel_Ed)
    updateValue("selah", data.Selah)
    updateValue("english", data.English)
    updateValue("math", data.Maths)
    updateValue("Talmud", data.Talmud)
    updateValue("chumash", data.Chumash)
    updateValue("navi", data.Navi)
    updateValue("schooldays", data.SchoolDays)

}); 

function updateValue(subject, newValue) {
document.getElementById(subject.toLowerCase()).textContent = newValue;
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