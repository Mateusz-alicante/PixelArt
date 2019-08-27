import React from 'react'
import './header.css'
import Aux from '../Auxiliary/Auxiliary'
import Navigation from './navigation/navigation'


function Header () {
    return(
        <Aux>
            <div id="header">
                <div id="header-image-container">
                <img className="images-header" align="left" height="70" id="header-head-image" alt='header-head' src='pixel-art-header.png'></img>
                <img className="images-header" align="right" height="70" id="spider" alt='header-spider' src='spider.png'></img>
                </div>
                <h1 id='header-title-pixelart'>Pixel Art</h1>
            </div>
            <Navigation className="header-navigation-reference" />
        </Aux>
    )
}

export default Header