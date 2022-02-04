import {ref as dataRef, get, set, update} from 'firebase/database'; 
import {db} from './libs/firebase/firebaseConfig';
import {buyCars} from './templates/buyCars'
console.log(db)

async function pageInit(){
    const key = sessionStorage.getItem('key');
    console.log(key)
    //read in the object RTD with that key
    async function deleteDocument(key) {
        let request = await deleteDoc(doc(db, "cars", key));
        console.log(request)
    }
    deleteDocument()
}

pageInit()