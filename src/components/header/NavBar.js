import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
function NavBar(props){   
    return (
        <React.Fragment>
            <div className={props.show ? 'sidenav active' : 'sidenav'}>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    
                </ul>
            </div>
        </React.Fragment>
    )
}

export default NavBar;