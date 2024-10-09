import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

export default defineNuxtPlugin((nuxtApp) => {

  const firebaseConfig = {
    apiKey: 'AIzaSyBz-mWZCyFgInsJmYP2RCj-2qhHeqsv5BY',
    authDomain: 'todo-e708b.firebaseapp.com',
    databaseURL: 'https://todo-e708b-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'todo-e708b',
    storageBucket: 'todo-e708b.appspot.com',
    messagingSenderId: '1014546621988',
    appId: '1:1014546621988:web:0be5a1c053e3ea70dd1ab1'
  }
  initializeApp(firebaseConfig)
  const auth = getAuth()

  return {
    provide: {
      auth,
    },
  }
})