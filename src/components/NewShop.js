import React from 'react';
import { saveShop } from '../database';
import Header from './Header';
import SuccessAlert from './SuccessAlert';
import FailureAlert from './SuccessAlert';
import ProgressModal from './ProgressModal';
import Map from './Map';

class NewShop extends React.Component {
constructor() {
 super();
    this.state = {
        name:null,
        address:null,
        comments:null,
        image:null,
        showSuccess:false,
        showFailure:false,
        timeout:null,
        uploadProgress:0,
        lat:"",
        lng:""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnchage = this.handleOnchage.bind(this);
    this.handleImageOnChange = this.handleImageOnChange.bind(this);
    this.handleAddressChanged = this.handleAddressChanged.bind(this);
}

componentWillUnmount(){
    clearTimeout(this.state.timeout);
}

 handleOnchage(event) {
    const {id, value} = event.target;
    this.setState({[id]: value});
}

handleSubmit(event){
 event.preventDefault();
 const {name, address, comments, image, lat, lng} = this.state;
 const shop = { name, address, comments, image, lat, lng };
 
saveShop(shop,()=>{
    //success
        this.showSuccessAlertMessage();
    },()=>{
        //error
        this.showFailureAlertMessage();
    },(progress)=>{
        //progress
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

handleAddressChanged(coodinates){
    this.setState({
        lat:coodinates.lat(),
        lng:coodinates.lng()
    });
}

render() {
        const {showSuccess, showFailure, imagePreviewUrl, uploadProgress, address, lat ,lng} = this.state;
        const {user} = this.props;
        return (
            <div>
                <Header user={user}/>
                <div class="container">
                    <div class="row">
                        {showSuccess ? <SuccessAlert/> : "" }
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
                                        onChange={this.handleOnchage}/>
                                </div>
                                <div class="form-group">
                                    <label for="address">Morada</label>
                                    <input id="address" type="text" class="form-control" placeholder="Morada" onChange={this.handleOnchage}/>
                                    <div class="form-inline">
                                        <input ref="address-lat"  type="text" class="form-control" placeholder="Lat" value={lat} readOnly/>
                                        <input ref="address-long" type="text" class="form-control" placeholder="Long" value={lng} readOnly/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="comments">Comentarios</label>
                                    <textarea
                                        id="comments"
                                        class="form-control"
                                        rows="3"
                                        placeholder="Comentários"
                                        onChange={this.handleOnchage}></textarea>
                                </div>
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" value=""/>
                                        Option one
                                    </label>
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
                                <input type="file" onChange={e => this.handleImageOnChange(e)}/>
                            </div>
                        </div>
                        <div class="col-md-4">
                             <Map address={address} onChange={this.handleAddressChanged}/>
                        </div>
                    </div>
                </div>
                <ProgressModal progress={uploadProgress}/>
            </div>

        );
    }
}
export default NewShop;