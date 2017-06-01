import React from 'react';
import { saveShop } from '../database';
import SuccessAlert from './SuccessAlert';
import FailureAlert from './SuccessAlert';
import ProgressModal from './ProgressModal';
import Map from './Map';

class NewShop extends React.Component {
constructor() {
 super();
    this.state = {
        name:null,
        comments:null,
        image:null,
        showSuccess:false,
        showFailure:false,
        timeout:null,
        uploadProgress:0,
        address:{
            name: null,
            lat: '',
            lng: ''
        },
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGenericFieldOnchage = this.handleGenericFieldOnchage.bind(this);
    this.handleImageOnChange = this.handleImageOnChange.bind(this);
    this.handleMapOnChange = this.handleMapOnChange.bind(this);
    this.handleAddressNameOnChange = this.handleAddressNameOnChange.bind(this);
    this.handleAddressNotFound = this.handleAddressNotFound.bind(this);
}

componentWillUnmount(){
    clearTimeout(this.state.timeout);
}

handleAddressNotFound(){
    //TODO alert address not found.
}

 handleGenericFieldOnchage(event) {
    const {id, value} = event.target;
    this.setState({[id]: value});
}

handleSubmit(event){
 event.preventDefault();
 const {name, address, comments, image} = this.state;
 const shop = { name, address, comments, image};
 
saveShop(shop,()=>{
    //success
        this.showSuccessAlertMessage();
    },(message)=>{
        //error
        //TODO handle message
        this.showFailureAlertMessage();
    },(progress)=>{
        //progress
        console.log(progress);
        this.setState({uploadProgress:progress});
    });
    
}

showSuccessAlertMessage(){
    this.setState({showSuccess:true});
    this.disableAlertMessage();
}

showFailureAlertMessage(){
    this.setState({showFailure:true});
    this.disableAlertMessage();
}

disableAlertMessage(){

let t = setTimeout(function () {
          this.setState({showSuccess:false,showFailure:false});
        }.bind(this),3000)
this.setState({timeout: t});    
}

handleImageOnChange(event){
    event.preventDefault();
    let reader = new FileReader();
    let image = event.target.files[0];

    reader.onloadend = () =>{
        this.setState({
            image: image,
            imagePreviewUrl: reader.result
        });
    }
    reader.readAsDataURL(image);
}

handleAddressNameOnChange(event){
    const addressName = event.target.value;
    const address = Object.assign({},this.state.address);
    address.name = addressName;
    this.setState({address: address});
}

handleMapOnChange(coodinates){
    const address = Object.assign({},  this.state.address);
    address.lat = coodinates.lat();
    address.lng = coodinates.lng();

    this.setState({address: address});
}

render() {
        const { name, showSuccess, showFailure, imagePreviewUrl, uploadProgress ,address} = this.state;
        return (
            <div>
                <div class="container">
                    <div class="row">
                        {showSuccess ? <SuccessAlert shopName={name} /> : "" }
                        {showFailure ? <FailureAlert/> : "" }
                        <form onSubmit={this.handleSubmit}>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="name">Nome da Loja</label>
                                    <input
                                        id="name"
                                        type="text"
                                        class="form-control"
                                        placeholder="Nome da Loja"
                                        onChange={this.handleGenericFieldOnchage}/>
                                </div>
                                <div class="form-group">
                                    <label for="address">Morada</label>
                                    <input id="address" type="text" class="form-control" placeholder="Morada" onChange={this.handleAddressNameOnChange}/>
                                    <div class="form-inline">
                                        <input ref="address-lat"  type="text" class="form-control" style={{width:"50%"}} placeholder="Lat" value={address.lat} readOnly/>
                                        <input ref="address-long" type="text" class="form-control" style={{width:"50%"}} placeholder="Lng" value={address.lng} readOnly/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="comments">Comentarios</label>
                                    <textarea
                                        id="comments"
                                        class="form-control"
                                        rows="3"
                                        placeholder="Comentários"
                                        onChange={this.handleGenericFieldOnchage}></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary" data-toggle="modal" data-target="#showProgress">Submit</button>
                            </div>
                        </form>

                        <div class="col-md-4">
                            <strong>Foto</strong>
                            <div>
                                <img
                                    id="image-preview"
                                    class="img-responsive"
                                    src={imagePreviewUrl}
                                    alt=""/>
                                <input type="file" accept="image/*" onChange={e => this.handleImageOnChange(e)}/>
                            </div>
                        </div>
                        <div class="col-md-4">
                             <Map address={address} onChange={this.handleMapOnChange} onAddressNotFound={this.handleAddressNotFound}/>
                        </div>
                    </div>
                </div>
                {uploadProgress > 0 ?
                    <ProgressModal progress={uploadProgress}/>
                :''}
            </div>

        );
    }
}
export default NewShop;