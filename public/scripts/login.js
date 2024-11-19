console.log("Login Script")
const selector = document.getElementById('login')

function sendOnClick() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log("Mail: ", email, " Pw: ", password);
}

// let sendButton = document.getElementById("login")
// let sendButton = document.getElementById("login")
// console.log("Send ",sendButton)
// sendButton.addEventListener("click", sendOnClick)
// sendButton.onclick = () =>{
//     console.log("send button"); 
// }

// const isOnline = async () => {
//     console.log("login function");
//     try {
//         const response = await fetch('./api/sessions/online', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         console.log("Respuesta is online? ", data.online);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };