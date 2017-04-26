# SnakeArcade
2 player online Snake game 
Node server runs the game, and posts the snake positions into a readable firebase structure.
Clients are able to send input to firebase, which the node server listens on. The client also listens and draws the snake positions onto a p5.js canvas.

Snake game logic was mostly derived from "The Coding Train": https://youtu.be/AaGK-fj-BAM
and just converted into a client/server format, and extended to allow 2 players.

This was more of a proof of concept to see Firebases and Firebase Function abilities and limitations.
Firebase functions proved to not work very well for hosting the server side code. The onWrite database trigger would go into sleep mode and it would take 30+ seconds from the client asking to start the game, for the server to actually do it. Also, there were other performance issues, which caused me to host the server side as a node.js service instead.

Firebase itself also probably wasn't optimal for this specific application, as it seems to have 300ms lag spikes from time to times. For this snake game, a 300ms lag spike could cause a snake to crash into the wall. I don't think firebase was intended to be used for this scenario, as this probably should have been a socket.io/signalR project. For most other use cases it should not be an issue, and I still highly recommend firebase as a "Backend as a Service" solution.

