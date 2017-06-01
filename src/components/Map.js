/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';

const LISBON_POSITION = {
  lat: 38.725544,
  lng: -9.140120
};

const mapOptions = {
    center: LISBON_POSITION,
    zoom: 8
}

class Map extends React.Component{

    constructor(){
        super();
        this.state ={
            markers: []
        }
    }

componentDidMount(){
    this.geocoder = new google.maps.Geocoder();
    this.map = new google.maps.Map(this.refs.map,mapOptions);
}

componentWillReceiveProps(nextProps) {
    const { address } =  this.props;
    if(address.name){
        this.codeAddress(address.name);
    } 
}

addSingleMarker(position,map){
    this.clearMakers();
    
    const marker = new google.maps.Marker({
        map:map,
        position: position
    });

    const {markers} = this.state;
    markers.push(marker);
    this.setState({markers:markers})
    this.props.onChange(position);
}

codeAddress(address){
   this.geocoder.geocode({'address':address}, (results, status) =>{
        if(status === 'OK'){
            const position = results[0].geometry.location;
            this.map.setCenter(position);
            this.addSingleMarker(position,this.map);
        }else{
            this.props.onAddressNotFound();
        }
    });
}

clearMakers(){
    const { markers } = this.state;
    for(var i = 0; i < markers.length; i++ ){
        markers[i].setMap(null);
    }
    this.setState({markers: []});
}

    render(){

    const mapStyle = {
      width: '100%',
      height: 300,
      border: '1px solid black',
      position: 'absolute'
    };

        return(
            <div>
                <div ref="map" style={mapStyle}>map </div>
            </div>
        );
    }
}

Map.propTypes = {
    address: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    onAddressNotFound: PropTypes.func
}

export default Map;