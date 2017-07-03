import { ref, firebaseAuth } from "../config/constants"

export function auth (email, pw, name, lastName, company, hierarchy) {
    return firebaseAuth().createUserWithEmailAndPassword(email, pw)
        .then(saveUser.bind(null, name, lastName, company, hierarchy))
}

export function authStaff (email, pw, name, lastName, company, hierarchy) {
    return firebaseAuth().createUserWithEmailAndPassword(email, pw)
        .then(saveStaff.bind(null, name, lastName, company, hierarchy))
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

export function saveUser (name, lastName, company, hierarchy, user) {
    return ref.child(`users/${user.uid}/info`)
        .set({
            uid: user.uid,
            email: user.email,
            name: name,
            lastName: lastName,
            company: company,
            hierarchy: hierarchy
        })
        .then(() => user)
}

export function saveStaff (name, lastName, company, hierarchy, user) {
    return ref.child(`users/${user.uid}/info`)
        .set({
            uid: user.uid,
            email: user.email,
            name: name,
            lastName: lastName,
            company: company,
            hierarchy: hierarchy
        })
}
