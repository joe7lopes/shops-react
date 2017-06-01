import React from 'react';
import {onAuthStateChanged, isAuthenticated, onDataChanged, detachListeners} from './firebase'
import { getShops } from './database';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
//import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Shops from './components/Shops';
import NewShop from './components/NewShop';
import NotFound from './components/NotFound';
import Header from './components/Header';

class App extends React.Component{ 
  constructor() {
    super();
    this.state = {
      currentUser: null,
      shops: [],
      isLoading:true
    }
  }

componentDidMount() {
  
    onAuthStateChanged((user) =>{
      if(user){
        //fist load when app starts
        this.loadShops();
        this.setState({currentUser:user});
        this.attachDataChangedListener();
      }
    });
}

componentWillUnmount(){
  detachListeners();
}

attachDataChangedListener(){
    onDataChanged( snap => {
          this.addShops(snap);
    });
}

loadShops = () =>{
  getShops().then( snapshot =>{
   this.addShops(snapshot);
  });
}     

addShops(snapshot){
 var featchedShops = [];
      snapshot.forEach(shop => {
        featchedShops.push(shop.val());
      });
      //this.setState({ isLoading:false, shops: featchedShops});
}

  render(){
      const { currentUser, shops, isLoading } = this.state;
      return (
            <Router>
              <div>
                <Switch>
                  <Route path="/login" component={Login}/>
                  <Route path="/" exact component={Login}/>
                  <PrivateRoute path="/shops" component={Shops} user={currentUser} shops={shops} isLoading={isLoading}/>
                  <PrivateRoute path="/new-shop" component={NewShop} user={currentUser}/>
                  <Route component={NotFound}/>
                </Switch>
              </div>
            </Router>
      );
  }
  
}

// const renderMergedProps = (component, ...rest) => {
//   const finalProps = Object.assign({}, ...rest);
//   return (
//     React.createElement(component, finalProps)
//   );
// }

const renderRoutesWithHeader = (Component, rest, props ) =>{
  const {user} = rest;
  return (
      <div>
        <Header user={user} {...props} />
        <Component {...rest}/>
     </div>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={ props => (
    isAuthenticated() ? (
      //renderMergedProps(component,props,rest)
      renderRoutesWithHeader(Component, rest, props)
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default App;
