// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'
const mediaPost = document.querySelectorAll(".media-post");

// Your JavaScript code goes here!

document.addEventListener('DOMContentLoaded', (e) => {
  const modal = document.querySelector("#modal");
  modal.hidden = true
  //modal.setAttribute('class', 'hidden')

//target each heart and add an event listener you can use a forEach or a for...of
  mediaPost.forEach((post) => {
    post.addEventListener("click", (e) => {
      if (
        e.target.className === "like-glyph" ||
        e.target.className === "activated-heart"
      ) {
        console.log(e.target);
        // make a server call
        //When successful change the heart
        // if its empty mak it full add new class .activated-class
        // else if it is full, make it empty
       
        mimicServerCall()
        .then(() => {
          if (e.target.innerHTML === EMPTY_HEART) {
            e.target.innerHTML = FULL_HEART;
            e.target.className = "activated-heart";
          } else {
            e.target.innerHTML = EMPTY_HEART;
            e.target.className = "like-glyph";
          }
        })
        .catch(error => {
          modal.hidden = false
          const modalMessage = document.querySelector('#modal-message')
          modalMessage.innerHTML = error;
          setTimeout(() => {
           modal.hidden = true;
          },5000);
          
        })
        // return a promise
        // promises have the .then() and .catch() methods
        // one then() takes the response and jsonify it
        // the second one takes the json data and do something with it
        // .then((res) => {})
        // .catch((error) => {
        //   return console.log(error.message);
        // });
      }
    });
  });
}) 










//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
