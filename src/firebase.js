import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth"; 

export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
  databaseURL: "",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const messaging = getMessaging(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const facebookAuthProvider = new FacebookAuthProvider();
export const githubAuthProvider = new GithubAuthProvider();

export const requestPermission = () => {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification user permission granted");
      return getToken(messaging, {
        vapidKey:
          "",
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log(currentToken); 
          } else {
            console.log("Failed to generate the app registration token");
          }
        })
        .catch((error) =>
          console.log("error has been occured while getting token", error)
        );
    } else {
      console.log("User denied permission");
    }
  });
};
requestPermission();
onMessage(messaging, (payload) => {
  console.log("Foreground message received: ", payload);
});
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
export default app;
