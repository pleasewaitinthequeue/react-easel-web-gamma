import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDgENljVoG9-Eg8YDsKZNC9ybcsoZ7HYns",
    authDomain: "react-web-easel-gamma.firebaseapp.com",
    databaseURL: "https://react-web-easel-gamma.firebaseio.com",
    projectId: "react-web-easel-gamma",
    storageBucket: "",
    messagingSenderId: "1086036550815",
    appId: "1:1086036550815:web:6e374a37ed21b2de"
};

let fire = firebase.initializeApp(firebaseConfig);

export default fire;