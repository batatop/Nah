import firebase from 'firebase'
import Rebase from 're-base'

const config = {
    apiKey: "AIzaSyDZfj-5pcE96pXIxTgx-CCbbewz23ug8lk",
    authDomain: "nahproject-83bdd.firebaseapp.com",
    databaseURL: "https://nahproject-83bdd.firebaseio.com"
}

var app = firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
export const base = Rebase.createClass(app.database())
