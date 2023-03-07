math.config({
  number: 'BigNumber',      // Default type of number:
                            // 'number' (default), 'BigNumber', or 'Fraction'
  precision: 64,            // Number of significant digits for BigNumbers
  epsilon: 1e-60
})

var socket = io();
let reactionCount = 0;

let speed = document.getElementById('speed')
let distance = document.getElementById('distance')
let earth = document.getElementById('earth')
let sun = document.getElementById('sun')
let reactions = document.getElementById('reactions')

window.addEventListener("click", () => {
	const audio = document.getElementById('audio')
	audio.loop = true;
	audio.play();
});

socket.on('data', (data) => {
	let data2 = JSON.parse(data);
	speed.innerText = `Furret speed: ${data2.speed} m/h`
	distance.innerText = `Distance traveled: ${data2.distance} miles`
	earth.innerText = `Furret has walked around the Earth ${data2.earth_travel} times`
	let distanceFromEdge = math.evaluate(`${math.format(1.8740159e+15, {notation: 'fixed'})} - ${data2.distance}`)
	sun.innerText = `${distanceFromEdge} miles until the furret reaches Polaris`
});

socket.on('reaction', (data) => {
	reactionCount++;
	let reaction = document.createElement('img')
	let currentCount = reactionCount;
	reaction.width = 60
	reaction.height = 60
	reaction.src = '/assets/party-popper.png'
	reaction.classList.add('hover-up');
	reaction.id = `reaction-${currentCount}`
	reaction.style = `position: fixed; left: ${~~(Math.random()*70)}%; top: ${~~(Math.random()*70)}%`
	reactions.appendChild(reaction);
	setTimeout(() => {
		reaction.remove();
		reactionCount--
	}, 3500)
});