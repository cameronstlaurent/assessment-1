import {ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage'; 
import {ref as databaseRef, set, get} from 'firebase/database'
import {db, storage } from './libs/firebase/firebaseConfig';

const carForm = document.forms['carForm']

async function pageInit(){
    const key = sessionStorage.getItem('key');
    console.log(key);
    const carRef = databaseRef(db, `rentals/${key}`);
    const carSnapShot = await get(carRef);
    //formatter for the form
    if(carSnapShot.exists()){
        setFieldValues(carSnapShot.val());

    }

    carForm.addEventListener('submit', onUpdateCar);
}

function onUpdateCar(e){
    e.preventDefault();
 
    updateCarData()
}


function setFieldValues(car, urlPath, price, manufacturer){

    carForm.elements['diecastManufacturer'].value = manufacturer
    carForm.elements['carName'].value = car
    carForm.elements['price'].value = price
    document.querySelector('#uploadImage img').src = urlPath;
}


function updateCarData(){

    const car = carForm.elements['carName'].value.trim();

    const file = carForm.elements['carImage'].files;

    const manufacturer = carForm.elements['diecastManufacturer'].value.trim();

    const price = carForm.elements['price'].value.trim();

    // console.log(car, file);
    if(file.length !== 0){
        // format the storage for the new image
        // images 
        const imageRef = storageRef(storage, `images/${file.name}`);
           //uploading file to the storage bucket
      


           const dataRef = databaseRef( db, 'cars');

           //uploading file to the storage bucket
          const uploadResult = await uploadBytes(imageRef, file);
       
           //url to the image stored in storage bucket
          const urlPath = await getDownloadURL(imageRef);
       
          // path on the storage bucket to the image
          const storagePath = uploadResult.metadata.fullPath;
       
           const key = sessionStorage.getItem('key');
       
           const dataRef = databaseRef(db, `cars/${key}`);
       
       
           set(dataRef, {
                urlPath,
                storagePath,
                car,
                price, 
                manufacturer
           })
    }
} 

pageInit()

// document.querySelector("#carImage").addEventListener("change", onImageSelected);


// document.forms["carForm"].addEventListener("submit", updateCarData);

//  function onUpdateCar(e) {
//        e.preventDefault();
//       updateCarData(); 
//          }

//     function onImageSelected(e) {
//         //selected file
//         //file objects [fileObj, fileObj, fileObj]
//        let file = e.target.files[0];
//         console.log(file)
//         //upldate the display with the requested image
//        document.querySelector(".display img").src = URL.createObjectURL(file);
//     }

// async function updateCarData(){
//     // const key = sessionStorage.getItem('key');
//     const car = carForm.elements['#carName'].value.trim();

//     const manufacturer = carForm.elements['#diecastManufacturer'].value.trim();

//     const price = carForm.elements['#price'].value.trim();

//     // const manufacturer = carForm.elements['diecastManufacturer'].value.trim();

//     //format the storage for the new image
//     // images/key/file.name storage path

//     const imageRef = storageRef(storage, `cars/${file[0]}`);

//     const dataRef = databaseRef( db, `cars/${key}`);

//     const file = carForm.elements['#carImage'].files;
    

//         const key = sessionStorage.getItem('key');
    
//           //uploading file to the storage bucket
//     const uploadResult = await uploadBytes(imageRef, file);
//     //url to the image stored in storage bucket
//    const urlPath = await getDownloadURL(imageRef);
//    // path on the storage bucket to the image
//     const storagePath = uploadResult.metadata.fullPath;
    
//         update(dataRef, {
//             key:dataRef.key,
//             sku: `jhvr${dataRef.key}`,
//             urlPath,
//             storagePath,
//             car,
//             price,
//             manufacturer
//         })
//     }

//   async function pageInit() {
  
//     const carRef = dataRef(db, `cars/${key}`);
//     const carSnapShot = await get(carRef);
//     const data = carSnapShot.val();
  
//     carImage.src = data.image;
//     carName.value = data.title;
//     diescastManufacturer.value = data.type;
//     price.value = data.price;
//    }

// pageInit();