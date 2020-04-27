
import React, { Component } from 'react';
import './App.css';
import Header from './global/header/Header'
import Footer from './global/footer/Footer'
import './fontawesome/all.css'
export default class App extends Component {

    componentDidMount = () => {
        window.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        })
    }

    render() {
        const { children } = this.props
        return (
            <div className="app">
                <Header></Header>
                {children}
                <Footer></Footer>
            </div>
        )
    }

}