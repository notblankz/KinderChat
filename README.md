
> This repository is no longer maintained and will not receive further updates


<h1>KinderChat</h1>
KinderChat is a safe and fun chat application designed specifically for kids. The app allows children to communicate in a secure environment where every message is scanned by an advanced machine learning model to detect threats, negative comments, and inappropriate content. The chat is room-based, where kids can enter a room name and chat with others in the same room.

<h2>Features</h2>

- **Safe Environment:** All messages are scanned by an ML model to filter out harmful content, ensuring a safe chatting experience for kids.

> The ML model is still in premature stage, thus some harmful msgs might still seep through. But we are actively working on fine tuning our model for a better experience

- **Room-Based Chat:** Kids can create or join chat rooms by simply entering a room name. All participants in the room can communicate with each other.
- **Real-Time Messaging:** Powered by Socket.io, KinderChat provides real-time messaging, making conversations smooth and instantaneous.
- **User Authentication:** Simple and secure login and registration process with password encryption.
- **Sentiment Analysis:** Messages are analysed for sentiment to detect any negative or harmful language.

<h2>App Flow</h2>
<img src="/extras/Kinderchat-flow.svg">

<h2>Technology Stack</h2>
<center>
<p>
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=html,css,js,nodejs,express,py,flask,webpack,postgres,figma" />
  </a>
</p>
</center>

<h2>Host the API and Website Locally</h2>

- Install all the python packaged in `requirements.txt` and make sure you have PyTorch and Tensorflow installed too
- You can run the API server using `flask app run`
- Install all the node packages using `npm i`
- Run the chat server using `nodemon server.js`
- Finally, run the website using `nodemon index.js`

> Note: To be able to chat it is necessary for both the users to be on the same network (it was a hackathon we could not do much more ;-; )

<h2>License</h2>
This project is licensed under the MIT License

<h2>Contributors</h2>

This project was built as part of the InFeynite'24 Hackathon with the following as a team:
- [Aahan](https://github.com/ItsBlankz) - Frontend, Backend, Python API
- [Medhavi](https://github.com/medhavibhargava) - Website Design
- [Shivam](https://github.com/sshivamanand) - Frontend Code
- [Chitraansh](https://github.com/Chitraansh) - Frontend code and DB Handling
