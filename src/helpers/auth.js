import { ref, firebaseAuth } from "../config/constants"

export function auth (email, pw, company) {
    return firebaseAuth().createUserWithEmailAndPassword(email, pw)
        .then(saveUser.bind(null, company))
}

export function logout () {
    return firebaseAuth().signOut()
}

export function login (email, pw) {
    return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
    return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (company, user) {
    return ref.child(`users/${user.uid}/info`)
        .set({
            uid: user.uid,
            email: user.email,
            company: company
        })
        .then(() => user)
}
