import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8080');
function socketIoStuff(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.on('testFunc', function(data)
  {
	 alert(JSON.stringify(data)); 
  });
}
export { socketIoStuff };