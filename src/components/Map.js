/* eslint-disable no-undef */
import React from 'react';

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
    if(nextProps.address){
        this.codeAddress(nextProps.address);
    }
}

codeAddress(address){
   this.geocoder.geocode({'address':address}, (results, status) =>{
        if(status === 'OK'){
            this.clearMakers();
            const position = results[0].geometry.location;
            this.map.setCenter(position);
            
            const marker = new google.maps.Marker({
                map:this.map,
                position: position
            });

            const {markers} = this.state;
            markers.push(marker);
            this.setState({markers:markers})
            this.props.onChange(position);
        }else{
            //console.log("address not found");
        }
    });
}

clearMakers(){
    const { markers } = this.state;
    for(var i = 0; i < markers.length; i++ ){
        markers[i].setMap(null);
    }
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

export default Map;