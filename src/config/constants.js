import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDZfj-5pcE96pXIxTgx-CCbbewz23ug8lk",
    authDomain: "nahproject-83bdd.firebaseapp.com",
    databaseURL: "https://nahproject-83bdd.firebaseio.com"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
