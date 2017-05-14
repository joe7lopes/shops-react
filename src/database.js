import { dbRef, storageRef } from './firebase';

export const getShops = (callback) =>{
    return  dbRef.once('value');
}

export function saveShop(shop,successCb,error,progressCb) {
     const newShopRef = dbRef.push();
     const shopId= newShopRef.key;

     var uploadTask = storageRef.child(shopId).put(shop.image);

    return  uploadTask.on('state_changed',snapshot =>{
        var uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;    
        let uploadProgress2 = Math.round(uploadProgress);
        console.log(uploadProgress2);
        progressCb(uploadProgress2);
    }, error,
    success =>{
        //save to database
        var downloadURL = uploadTask.snapshot.downloadURL;  
        shop.imageUrl= downloadURL;
        shop.id = shopId;
        newShopRef.set(shop).then(()=>{
            successCb();
        });
    });
}

export const deleteShop = (shop) =>{
    const imageRef = storageRef.child(shop.id);
    imageRef.delete();
    return dbRef.child(shop.id).remove();
}