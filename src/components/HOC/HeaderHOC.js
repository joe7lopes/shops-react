import React, { Component } from 'react';

const HeaderHOC = (WrappedComponent) => {
    return class HeaderHOC extends Component{
        render(){
            return(
                <div>
                    header
                    <WrappedComponent {... this.props} />
                    </div>
            );
        }
    }
}

export default HeaderHOC;