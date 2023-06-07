# Simple-VideoChat-App
 <br>
 Simple video chat app made with JavaScript, NodeJS and Agora API.
 <br>
 The app features 2 main functionalities:
<ul>
 <li>For each user trying to enter a room, a random session key will be generated providing them with access to the platform</li>
 <li>Users can enter a room and talk to each other via their microphone or use their webcam as well.</li>
</ul>

# Dependencies:

<ul>
 <li>NPM</li>
 <li>https://www.agora.io registration</li>
</ul>

# Installation & Usage

 # 1. Npm modules installation
    1. After downloading, initiate "npm install" command inside the TokenServer folder.
    2. Next, you have to execute "npm audit fix"/"npm audit fix --force".
    3. After this, execute "npm fund" and you are done with this part.

 # 2. Ensuring Back-end functionality
    1. Go inside the main directory and open the .env file.
    2. Assuming you already have created an agora.io profile, add your AGORA CHANNEL_NAME, APP_ID and APP_CERTIFICATE details so that main.js can function properly and TokenServer.js can generate each user an AGORA token in order for them to be able to join the voice channel.

 # 3. Running the project
    1. Run "npm start" inside the TokenServer folder to start the NodeJS token generator.
    2. Host the app however you like - e.g. xampp & ngrok.

 # 4. Usage
    1. When you first open the app in the browser, you will be presented with a button to join.
    2. If the server is working properly, you will be able to enter the voice channel. (If there is anything wrong with the server, or it is not started, you will receive a pop-up message saying the server is down.)
    3. By sending the room link to other people, they can also join (if used with ngrok you can make it, so other people across the internet can join).
    4. You can enable/disable microphone and webcam and leave the channel by clicking the buttons on the bottom part of your screen.
