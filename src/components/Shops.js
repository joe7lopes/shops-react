import React from 'react'
import { deleteShop } from '../database';
import LoadingSpinner from './LoadingSpinner';

class Shops extends React.Component{

constructor(){
    super();
    this.state = {
        searchText:'',
        selectedShop: '',
        isLoading: true
    };

    this.handleOnDeleteShop = this.handleOnDeleteShop.bind(this);
    this.handleOnSearch = this.handleOnSearch.bind(this);
}


handleOnSelectShop(shop){
    this.setState({selectedShop:shop});
}

handleOnDeleteShop(){
    const { selectedShop } = this.state;
    deleteShop(selectedShop);
}

handleOnSearch(event){
    const {value} = event.target;
    this.setState({searchText: value});
}

render(){

    const{ selectedShop,searchText} = this.state;
    const { shops, isLoading } = this.props;
    const filteredShops = shops.filter( e => {
        return e.name.toLowerCase().search(searchText.toLowerCase()) !== -1;
        });

    const shopsRows = filteredShops.map(shop =>{
        return (
            <tr key={shop.id}>
                <th>{shop.id}</th>
                <td>{shop.imageUrl ?
                    <img src={shop.imageUrl} alt={shop.name} style={{with:"100px", height:"100px"}}/>
                    : "No image"}
                </td>
                <td>{shop.name}</td>
                <td>{shop.address.name}</td>
                <td>{shop.comments}</td>
                <td> <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#confirmDelete" onClick={this.handleOnSelectShop.bind(this,shop)}>Eliminar</button></td>
            </tr>   
        );
    });

    return(
        <div>
            <div class="container">
                { isLoading ? <LoadingSpinner/>
                :<div>
                    <div class="input-group" style={{marginBottom:'30px'}}>
                        <span class="input-group-addon">
                        <i class="glyphicon glyphicon-search"></i>
                        </span>
                        <input type="text" class="form-control" style={{width:'300px'}} onChange={this.handleOnSearch}/>
                    </div>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Nome</th>
                                <th>Morada</th>
                                <th>Comentatios</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {shopsRows}
                        </tbody>
                    </table>
                </div>
                }
            </div>
            
        {/*  confirm delete modal */}
            <div id="confirmDelete" class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Eliminar Loja</h4>
                        </div>
                        <div class="modal-body">
                            <p>Tem a certeza que pretende eliminar a loja
                                <strong>{" " + selectedShop.name + " "}</strong> ?
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={this.handleOnDeleteShop}>OK</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        );
        }
}
export default Shops;