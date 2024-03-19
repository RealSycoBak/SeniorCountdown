const express = require('express');
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const { readFileSync } = require('fs');
const { writeFileSync } = require('fs');

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("sendCount", (send) => {
    //Retreive data from JSON file
    if(send) {
      const data = readFileSync('count.json');
      dataparse = JSON.parse(data)
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
    
  })

  socket.on("updateCount", (data) => {
    //Update JSON file with new count data.
    try {
      writeFileSync('count.json', JSON.stringify(data, null, 2), 'utf8');
      console.log('Data successfully saved to disk');
    } catch (error) {
      console.log('An error has occurred ', error);
    }
  })

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

}); 


server.listen(3000, () => {
  console.log("listening on *:3000");
});
