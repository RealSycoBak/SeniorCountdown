var socket = io();

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("sendCount", (data) => {
    console.log(data)
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