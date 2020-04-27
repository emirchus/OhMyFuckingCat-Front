
import React, { Component } from 'react';
import './Footer.css';

import { Link } from 'react-router-dom'

export default class Footer extends Component {

    render() {
        return (
            <footer >
                <div className="logo">
                    <Link to="/"></Link>
                </div>
                <ul>
                    <li><Link to="/lostmycat" >Perdí mi gato</Link></li>
                </ul>
            </footer>
        )
    }

}