const express = require('express');
const app = express();
const { Server } = require("socket.io");
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);
const fs = require('fs');
const rateLimit = require('express-rate-limit');
const UABlocker = require('express-user-agent-blocker')

app.use(express.static('./public'))
let siteHTML = fs.readFileSync(__dirname + '/public/html/index.html');

const limiter = rateLimit({
  max: 20,
  windowMs: 1 * 60 * 1000,
  message: `${siteHTML}`
});

app.use('/', limiter)
app.use(UABlocker(["curl/7.83.1"]))

let saveFile = fs.readFileSync('speed.txt', 'utf8')
	
let saveFile2 = saveFile.split(',').map(val => parseInt(val))

let speed = saveFile2[0];
let distance = saveFile2[1];
let earth_travel = saveFile2[2];
let ratelimit = 0;

app.get('/', async (req, res) => {
	/*
	speed += 51000000;
	fs.writeFileSync('speed.txt', `${speed},${distance},${earth_travel}`)
	res.sendFile(__dirname + '/public/html/index.html')
 	*/
	res.send('This site has been shut down.')
});

server.listen(3000, () => {
	console.log('server started');
});

io.on('connection', (socket) => {
	setInterval(() => {
		socket.emit("data", `
  		{
			"speed": ${speed},
   			"distance": ${Math.floor(distance)},
	  		"earth_travel": ${earth_travel}
		}
  		`)
	}, 10)
});

/*
setInterval(() => {
	distance += speed / 3600
	earth_travel = Math.floor(distance / 24901)
	fs.writeFileSync('speed.txt', `${speed},${distance},${earth_travel}`)
}, 1000)

setInterval(() =>{
	if (ratelimit > 0) {
		ratelimit--;
	}
	console.log(ratelimit)
}, 1000)
*/

io.on('connection', (socket) => {
	socket.on('reaction', (data) => {
		io.emit('reaction', 0);
	});
});
