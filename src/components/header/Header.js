import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi'; 
import './header.css';
function Header (props){
    return(        
        <div className="head">
            <div className='row'>
                <div className='col'>
                    <GiHamburgerMenu onClick={props.clikIcon}/>
                </div>
                <div className='col-6'>

                </div>
                <div className='col'>
                    <div className='avatar'>
                        
                    </div>
                </div>
            </div>
            
        </div>        
    );
}
export default Header;