
import React, { Component } from 'react';
import './Gallery.css';
import { withRouter } from 'react-router-dom';
import $ from 'jquery'
class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cats: undefined,
            currentcat: undefined,
            maxcat: 0,
            backup: 0
        }
    }

    fetchCats = () => {
        this.controller = new AbortController();
        this.signal = this.controller.abort;
        fetch('https://cdn.ohmyfuckingcat.net/cats', {
            method: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            signal: this.controller.signal
        }).then(res => {
            return res.json()
        })
            .then(json => {
                if (json) {
                    this.setState({
                        cats: json,
                        maxcat: (document.body.clientHeight / 2),
                        backup: (document.body.clientHeight / 2)
                    })
                }
            })
    }

    componentWillMount = () => {
        this.fetchCats();

    }

    componentWillUnmount = () => {
        this.controller.abort();

    }

    randomColor = () => {

        let colors = ["#ffd0d2", "#fffdd0", "#d0fffd", "#d0d2ff", "#fc466b", "#3f5efb", "#fffbd5", "#b20a2c", "#D3CCE3", "#E9E4F0", "#00F260", "#0575E6"];
        Array.from(document.getElementsByClassName("catcontainer")).forEach(div => {
            let firstGradient = randomNumber(10, 40);
            $(div).css(
                "background", "linear-gradient(141deg, " + colors[randomNumber(0, colors.length)] + " " + firstGradient + "%, " + colors[randomNumber(0, colors.length)] + " " + (100 - firstGradient) + "%)"
            )
        })
        function randomNumber(min, max) {
            return Math.floor((Math.random() * max) + min);
        }
    }

    loadCat = (e) => {
        if (e.target.complete) {
            e.target.parentElement.classList.remove('hidden');
        }
    }

    componentDidMount = () => {
        console.log(document.body.clientHeight);

    }

    componentDidUpdate = () => {
        this.randomColor();
        document.addEventListener("keydown", (e) => {
            if (e.keyCode === 27) {
                window.location.hash = '';
                window.scrollTo(0, this.state.currentcat)
            }
        })
    }

    goCat = (e) => {
        console.log(e.target);

        var cat = e.target.getAttribute("name");
        if (window.location.pathname) {
            if (window.location.pathname.split("/")[1] === cat) {
                this.props.history.push("/");
            } else {
                this.setState({
                    currentcat: window.scrollY
                })
                var nem = new Image();
                nem.src = "https://cdn.ohmyfuckingcat.net/cat/" + cat;

                this.props.history.push("/"+cat);
                window.scrollTo(0, 0)
            }
        } else {
            this.setState({
                currentcat: window.scrollY
            })

            var nem = new Image();
            nem.src = "https://cdn.ohmyfuckingcat.net/cat/" + cat;

            this.props.history.push("/"+cat);
            window.scrollTo(0, 0)
        }
    }

    renderCats = () => {
        if (this.state.cats) {
            const cats = this.state.cats.map((name, key) => {
                if (key < Math.floor(this.state.maxcat / 20)) {
                    return (
                        <div key={key} onClick={this.goCat} name={name} className="catcontainer hidden">
                            <img onLoadCapture={this.loadCat} name={name} src={"https://cdn.ohmyfuckingcat.net/cat/" + name}></img>
                            <h3>{name}</h3>
                        </div>
                    )
                }
            })
            return (
                cats
            )
        }
    }

    renderFullCat = () => {
        if (window.location.pathname) {

            document.onkeydown = checkKey;

            function checkKey(e) {

                e = e || window.event;

                if (e.keyCode == '37') {
                    prevCat();
                }
                else if (e.keyCode == '39') {
                    nextCat();
                }

            }
            const loadedimg = (e) => {
                if (e.target.complete) {
                    e.target.parentElement.parentElement.classList.remove('hidden');
                }
            }
            const closeFull = () => {
                window.location.hash = '';
                window.scrollTo(0, this.state.currentcat)
            }

            const twitterShare = () => {
                var url = window.location
                window.open("https://twitter.com/intent/tweet?text=Miren%20ésta%20hermosa%20foto%20de un gato 😹😹😹 !%20vía%20@MrEmiii%20@KiritoDev&url=" + url,
                    "OhMyFuckingCat",
                    "menubar=no,toolbar=no,resizable=yes,scrollbars=no,height=600,width=800")
            }
            const facebookShare = () => {
                var url = window.location
                window.open(
                    'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url),
                    'OhMyFuckingCat',
                    'width=800,height=436');
            }
            const whatsappShare = () => {
                var url = window.location
                window.open(
                    'https://wa.me/?text=' + encodeURIComponent(url),
                    'OhMyFuckingCat',
                    'width=800,height=436');
            }
            const prevCat = () => {
                var current = this.state.cats.indexOf(window.location.pathname.split("/")[1])
                if (current === 0) {
                   this.props.history.push("/"+ this.state.cats[this.state.cats.length - 1]);
                } else {
                    this.props.history.push("/"+ this.state.cats[current - 1]);
                }
                window.scrollTo(0, 0)
                document.getElementById("inputvalue").value = window.location
            }
            const nextCat = () => {
                var current = this.state.cats.indexOf(window.location.pathname.split("/")[1])
                if (current === (this.state.cats.length - 1)) {
                    this.props.history.push("/"+ this.state.cats[0]);
                } else {
                    this.props.history.push("/"+ this.state.cats[current + 1]);
                }
                document.getElementById("inputvalue").value = window.location
                window.scrollTo(0, 0)
            }
            const copyText = (e) => {
                var target = e.target;
                console.log(target);
                
                target.select();
                target.setSelectionRange(0, 99999); /*For mobile devices*/
                document.execCommand("copy")
            }
            return (
                <React.Fragment>
                    <a onClick={closeFull} className="fas fa-times"></a>
                    <div className="imagefull">
                        <a onClick={prevCat} className="btn-prev"></a>
                        <a onClick={nextCat} className="btn-next"></a>
                        <img onLoadCapture={loadedimg} src={"https://cdn.ohmyfuckingcat.net/cat/" + window.location.pathname.split("/")[1]} />
                    </div>
                    <div className="linkshare">
                        <p>Ninguna imagen es de nuestra propiedad, los créditos a sus respectivo autor. <span>Ningún gato u otro animal fue lástimado para tomar la foto.</span></p>
                        <input id="inputvalue" type="text" onClick={copyText} defaultValue={window.location} contentEditable="false"/>
                        <a href={"https://cdn.ohmyfuckingcat.net/cat/" + window.location.pathname.split("/")[1]} target="_blank" download={window.location.hash.split("#")[1]} className="descargar-btn"><span>Descargar</span><i className="fas fa-cat"></i></a>
                        <a onClick={twitterShare} className="twitter"><span>Compatir en twittter</span><i className="fab fa-twitter"></i></a>
                        <a onClick={facebookShare} className="facebook"><span>Compatir en Facebook</span><i className="fab fa-facebook"></i></a>
                        <a onClick={whatsappShare} className="whatsapp"><span>Compatir en WhatsApp</span><i className="fab fa-whatsapp"></i></a>
                    </div>
                </React.Fragment>
            )
        }
    }

    buttonMore = () => {
        if (this.state.maxcat <= (document.body.clientHeight)) {
            const showMore = (e) => {
                this.setState({
                    maxcat: Math.floor(this.state.maxcat * 2)
                })
            }
            const showNotMore = (e) => {
                this.setState({
                    maxcat: Math.floor(this.state.maxcat / 2)
                })
            }
            var showmoring;
            if (this.state.maxcat >= (this.state.backup / 2)) {
                showmoring = <button onClick={showNotMore}>Mostrar menos <i className="fas fa-angle-up"></i></button>;
            }
            return (
                <div className="showmore">
                    <button onClick={showMore}>Mostrar más <i className="fas fa-angle-down"></i></button>
                    {showmoring}
                </div>
            )
        } else {
            const shownotMore = (e) => {
                this.setState({
                    maxcat: this.state.backup
                })
            }
            const showNotMore = (e) => {
                this.setState({
                    maxcat: Math.floor(this.state.maxcat / 2)
                })
            }
            var showmoring;
            if (this.state.maxcat >= (this.state.backup / 2)) {
                showmoring = <button onClick={showNotMore}>Mostrar menos <i className="fas fa-angle-up"></i></button>;
            }
            return (
                <div className="showmore">
                    <button onClick={shownotMore}>Ir al inicio <i className="fas fa-angle-double-up"></i></button>
                    {showmoring}
                </div>
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                <div id="catWrapper" className="catwrap hidden">
                    {this.renderFullCat()}
                </div>
                {this.renderCats()}

                {this.buttonMore()}
            </React.Fragment>
        )
    }

}

export default withRouter(Gallery)