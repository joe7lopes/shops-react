import { dbRef, storageRef } from './firebase';

export const getShops = (callback) =>{
    return  dbRef.once('value');
}

export function saveShop(shop,success,error,progressCb) {
     const newShopRef = dbRef.push();
     shop.id = newShopRef.key;

     if(shop.image){
         return saveShopWithImage(shop,newShopRef,success,error,progressCb);
     }else{
         saveShopWIthNoImage(shop,newShopRef,success,error);
     }

     
}

function saveShopWithImage(shop,newShopRef,successCb,error,progressCb){

var uploadTask = storageRef.child(shop.id).put(shop.image);

    return  uploadTask.on('state_changed',snapshot =>{
        var uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;    
        let uploadProgressRounded = Math.round(uploadProgress);
        progressCb(uploadProgressRounded);
    }, error,
    success =>{
        //save to database
        var downloadURL = uploadTask.snapshot.downloadURL;  
        shop.imageUrl= downloadURL;

        saveShopWIthNoImage(shop,newShopRef,success,error);

    });

}


function saveShopWIthNoImage(shop,newShopRef,success,errorCb){
    newShopRef.set(shop).then(()=>{
            success();
    }).catch(error =>{
        errorCb(error.message);
    });
}

export const deleteShop = (shop) =>{
    const imageRef = storageRef.child(shop.id);
    imageRef.delete();
    return dbRef.child(shop.id).remove();
}