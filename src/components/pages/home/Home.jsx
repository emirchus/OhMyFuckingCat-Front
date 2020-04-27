
import React, { Component } from 'react';
import './Home.css';
import Gallery from '../gallery/Gallery';

export default class Home extends Component {

    render() {
        return (
            <div className="homeWrap" >
                <div className="titleWrap">
                    <h2>Oh My Fucking Cat!</h2>
                    <h1>Página dedicada a los gatos y sus divertidas aventuras</h1>
                </div>
                <div className="gallerywrap">
                    <Gallery></Gallery>
                </div>
            </div>
        )
    }

}