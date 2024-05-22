function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });
});

//Yevin's New Code
//Button Inilization
var loginButton = document.getElementById("login_button")
var signupButton = document.getElementById("signup_button")
var loginEmailInput = document.getElementById("login_email");
var loginPasswordInput = document.getElementById("login_password");
var signupEmailInput = document.getElementById("signup_email");
var signupPasswordInput = document.getElementById("signupPassword");
var signupRetypePassInput = document.getElementById("signupRetypePass");
var signupUsername = document.getElementById("signupUsername");


//Firebase Auth Stuff
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, signInWithPopup, connectAuthEmulator, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js'


// Initialize Firebase
const firebaseApp = initializeApp({
   apiKey: "AIzaSyAUuQGipq90H8XSKt7OQ3Un5ZwSD-oB5PQ",
   authDomain: "rate-my-undergrade.firebaseapp.com",
   databaseURL: "https://rate-my-undergrade-default-rtdb.firebaseio.com/",
   projectId: "rate-my-undergrade",
   storageBucket: "rate-my-undergrade.appspot.com",
   messagingSenderId: "1081275288722",
   appId: "1:1081275288722:web:56029efa1b17e68c9a6a4b",
   measurementId: "G-3WM7BH8B8D"
 });


const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
const provider = new GoogleAuthProvider();

//Sign In Function
const loginEmailPassword = async () => {
   const loginEmail = loginEmailInput.value;
   const loginPassword = loginPasswordInput.value;


   try {
       const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
       console.log(userCredential.user);
   }
   catch(error) {
       console.log(error);
       setFormMessage(loginForm, error);
   }
}



//Sign Up Func
const createAccount =  async () => {
   const signupEmail = signupEmailInput.value;
   const signupPassword = signupPasswordInput.value;
   const signupRetypePassword = signupRetypePassInput.value;
   const createAccountForm = document.querySelector("#createAccount");
   const accountSetupForm = document.querySelector("#accountInfo");

   try {
       const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
       console.log(userCredential.user);
       console.log("account made");
       createAccountForm.classList.add("form--hidden");
       accountSetupForm.classList.remove("form--hidden");
   }
   catch(error) {
       console.log(error);
       setInputError(inputElement, error);
   }
}


//Save User Info
function writeUserData(userId, username, type, uni, program, uniEmail) {
   const db = getDatabase();


   set(ref(db, 'users/' + userId), {
     username: username,
     accountType: type,
     university: uni,
     program: program,
     uniEmail: uniEmail
   });
 }


 const setupAccount =  async () => {
   const accType = document.getElementById("type").value;
   const uniName = document.getElementById("uni").value;
   const programName = document.getElementById("program").value;
   const uniEmailVerify = document.getElementById("uniEmail").value;
   const usernameValue = document.getElementById("usernameData").value;
   const userIdName = auth.currentUser.uid;
   console.log(userIdName);
   try {
       writeUserData(userIdName, usernameValue, accType, uniName, programName, uniEmailVerify) 
       window.location.replace("http://127.0.0.1:5500/forums.html");
   }
   catch(error) {
       console.log(error);
   }
}


//sign up With google
function signInWithGoogle() {
const createAccountForm = document.querySelector("#createAccount");
const accountSetupForm = document.querySelector("#accountInfo");

signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log("google sign in completed");
    createAccountForm.classList.add("form--hidden");
    accountSetupForm.classList.remove("form--hidden");
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

//Login in with google
function loginInWithGoogle() {
    const createAccountForm = document.querySelector("#createAccount");
    const accountSetupForm = document.querySelector("#accountInfo");
    
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("google sign in completed");
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    }

loginButton.addEventListener("click", e => {
   e.preventDefault(); // Prevent the default form submission behavior
  
   loginEmailPassword();
});


signupButton.addEventListener("click", e => {
   e.preventDefault(); // Prevent the default form submission behavior
  
   createAccount();
});


setup_button.addEventListener("click", e => {
   e.preventDefault(); // Prevent the default form submission behavior
  
   setupAccount();
});

googleSignUp_button.addEventListener("click", e => {
    e.preventDefault(); // Prevent the default form submission behavior
   
    signInWithGoogle();
 });

 googlelogin_button.addEventListener("click", e => {
    e.preventDefault(); // Prevent the default form submission behavior
   
    loginInWithGoogle();
 });