function pageInit(){
    const key = sessionStorage.getItem('key');
    console.log(key)
    //read in the object RTD with that key
    // function updatePost(urlPath, key, car, price, manufacturer) {
    //     const db= getDatabase();

    //     const postData = {
    //         key:key,
    //         urlPath: urlPath,
    //         car: car,
    //         price: price,
    //         manufacturer: manufacturer
    //     };


    //     const newPostKey = push(child(ref(db), 'posts')).key;

    //     const updates = {};
    //     updates['/cars/' + newPostKey] = postData;
    //     updates['/cars/' + key + '/' + newPostKey ] = postData;

    //     return update(ref(db), updates);
    // }
}

pageInit()