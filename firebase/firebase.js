import firebase from 'firebase';
import '@firebase/firestore'
import { firebaseConfig } from '../fbconfig';
import {categories, recipes, ingredients, nested} from '../data'

export function getFirebase(){
    try {
        firebase.initializeApp(firebaseConfig);
        return firebase
    } catch (error) {
        return firebase
    }
}