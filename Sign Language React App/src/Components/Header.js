import React from 'react'
import logo from './Wayne.png';

function Header() {
    return (
    <React.Fragment>
        <div style={{display:"flex",
                    flexDirection:"row", 
                    width:"100%", 
                    justifyContent:'center', 
                    backgroundColor:"black"}}>
            <div className="custom">
            <img src={logo} className="logo"/>
            <h1 id="ti">Wayne Sight</h1>
            </div>
        </div>
    </React.Fragment>
    )
}

export default Header
