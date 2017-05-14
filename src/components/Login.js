import React from 'react';
import {Redirect} from 'react-router-dom';
import { login, isAuthenticated } from '../firebase';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnchage = this.handleOnchage.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.login();
    }

    handleOnchage(event) {
        this.clearErrorMsg();
        const {id, value} = event.target;
        this.setState({[id]: value});
    }

    handleReset() {
        this.clearErrorMsg();
        this.setState({email: '', password: ''});
    }

    login = () => {
        const {email, password} = this.state;
        login(email, password)
        .then(() => {
            this.forceUpdate();
        })
        .catch( ({ message }) =>{
            this.setState({errorMsg: message})
        });
    }

    clearErrorMsg = () =>{
        this.setState({errorMsg: null})
    }

    render() {

        //const { from } = this.props.location.state || { from: { pathname: '/'} };
        const { errorMsg, email, password} = this.state;

        if (isAuthenticated()) {
          //  return (<Redirect to={ from } />)
            return (<Redirect to="/shops" />)
        }

        return (
            
            <div class="container centered">
                <div class="row">
                    <div class="col-xs-6 col-xs-offset-3">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <strong class="">Login</strong>
                            </div>
                            <div class="panel-body">
                                <form class="form-horizontal" role="form" onSubmit={this.handleSubmit}>
                                    <div class="form-group">
                                        <label for="email" class="col-sm-3 control-label">Email</label>
                                        <div class="col-sm-9">
                                            <input
                                                type="email"
                                                class="form-control"
                                                id="email"
                                                placeholder="Email"
                                                onChange={this.handleOnchage}/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="password" class="col-sm-3 control-label">Password</label>
                                        <div class="col-sm-9">
                                            <input
                                                type="password"
                                                class="form-control"
                                                id="password"
                                                placeholder="Password"
                                                onChange={this.handleOnchage}/>
                                        </div>
                                        <div>
                                            <p class="help-inline align-center text-danger">{errorMsg}</p>
                                        </div>
                                    </div>
                                    <div class="form-group last">
                                        <div class="col-sm-offset-3 col-sm-9">
                                            <button type="submit" class="btn btn-success btn-sm" disabled={ !email || !password }>Login</button>
                                            <button type="reset" class="btn btn-default btn-sm" onClick={this.handleReset}>Reset</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        </div> 
        );
    }
}
export default Login;