
import React, { Component } from 'react';
import './Header.css';
import { Link, NavLink } from 'react-router-dom'
export default class Header extends Component {

    componentDidMount = () => {
        window.addEventListener("scroll", (e) => {
            var scroll = window.scrollY;
            var header = document.getElementById("header");
            if (scroll >= 200) {
                header.classList.add("header-alt");
            } else {
                header.classList.remove("header-alt");
            }
        })
    }

    render() {
        return (
            <header id="header">
                <div className="logo">
                    <Link to="/"></Link>
                </div>
                <ul>
                    <li><NavLink to="/" exact activeClassName="onpage">Inicio</NavLink></li>
                    <li><NavLink to="/videos" exact activeClassName="onpage">Videos</NavLink></li>
                    <li><NavLink to="/lostmycat" exact activeClassName="onpage">Perdí mi gato</NavLink></li>
                </ul>
            </header>
        )
    }

}