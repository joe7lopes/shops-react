import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../firebase';


const Header = ({history, user}) => {

const hadleLogout = () =>{
    logout().then( () => {
        history.push('/');
    });

};

    return (
        <div>
            <header>
                <nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <Link class="navbar-brand" to="/shops">Lojas</Link>
                        </div>
                        <ul class="nav navbar-nav">
                            <li>
                                <Link to="/new-shop">Nova Loja</Link>
                            </li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right">
                            <li class="dropdown">
                                <a
                                    href=""
                                    class="dropdown-toggle"
                                    data-toggle="dropdown"
                                    role="button"
                                    aria-haspopup="true"
                                    aria-expanded="false">{user}
                                    <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <Link to="#" onClick={hadleLogout}>logout</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Header;