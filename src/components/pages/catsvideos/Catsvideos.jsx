
import React, { Component } from 'react';
import './Catsvideos.css';

export default class Catsvideos extends Component {


    constructor() {
        super();
        this.state = {
            videos: [],
            current: null
        }
    }

    fetchVideos = () => {
        this.controller = new AbortController();
        fetch('https://cdn.ohmyfuckingcat.net/clips', {
            method: "POST",
            signal: this.controller.signal,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json()
        })
            .then(json => {
                if (json) {
                    this.setState({
                        videos: json.videos
                    })
                }
            })
    }

    componentWillMount = () => {
        this.fetchVideos();

    }

    componentWillUnmount = () => {
        this.controller.abort();
    }

    loadedVideo = (e) => {
        if (e.target) {
            e.target.parentElement.classList.remove('hidden');
        }
    }


    goCat = (e) => {
        var cat = e.target.getAttribute("name");
        this.setState({
            current: cat
        })
    }

    renderVideos = () => {
        if (this.state.videos) {
            console.log(this.state.videos);

            const map = this.state.videos.map((a, k) => {
                return (
                    <div name={a} onClick={this.goCat} key={k} className="catcontainer hidden">
                        <video name={a} onLoadStart={this.loadedVideo} src={"https://cdn.ohmyfuckingcat.net/clip/" + a}>
                        </video>
                        <h3>Source: @EsosGatosLocos</h3>
                    </div>
                )
            })
            return (map)
        } else {
            return (
                <p>Waiting</p>
            )
        }
    }

    renderFullVideo = () => {
        if (this.state.current) {
            var video = document.querySelector("#video");

            var timeline = document.getElementById("timeline")
            var btn = document.getElementById("play-pause");

            const togglePlayPause = () => {
                var video = document.querySelector("#video");
                var timeline = document.getElementById("timeline")
                var btn = document.getElementById("play-pause");

                if (video.paused) {
                    btn.innerHTML = `<i class="fas fa-pause"></i>`
                    video.play();
                } else {
                    btn.innerHTML = `<i class="fas fa-play"></i>`
                    video.pause();
                }
            }

            const updateTimeline = (e) => {
                var video = e.target
                var timeline = document.getElementById("timeline")
                var currentTime = video.currentTime / video.duration;
                var btn = document.getElementById("play-pause");
                document.getElementById("currentTime").innerText = Math.round(video.currentTime % 60);
                document.getElementById("durationTime").innerText = Math.round(video.duration % 60);
                timeline.style.width = currentTime * 100 + "%";
                console.log(video.volume);
                video.volume = 1;
                console.log(video.volume);
                if (video.ended) {
                    btn.innerHTML = `<i class="fas fa-play"></i>`
                    document.getElementById("currentTime").innerText = 0;
                    document.getElementById("durationTime").innerText = 0;
                    timeline.style.width = 0 + "%";
                }
            }

            const changeProgress = (e) => {

                var target = e.target;
                console.log(target.offsetWidth);
                var offset = e.clientX;
                var video = document.querySelector("#video");
                var cusprog = (offset / target.offsetWidth) * video.duration

                video.currentTime = cusprog
            }
            const toggleMute = (e) => {
                
                var target = document.querySelector("#btnv");
                var video = document.querySelector("#video");
                if (video.volume > 0) {
                    target.innerHTML = `<i class="fas fa-volume-mute"></i>`
                    video.volume = 0;
                } else {
                    target.innerHTML = `<i class="fas fa-volume-down"></i>`
                    video.volume = 1;
                }
            }

            return (
                <React.Fragment>
                    <div className="c-video">
                        <video id="video" onTimeUpdate={updateTimeline} onLoadStart={this.loadedVideo} src={"https://cdn.ohmyfuckingcat.net/clip/" + this.state.current}>
                        </video>
                    </div>
                    <div className="controls">
                        <div className="actionbuttons">
                            <button onClick={togglePlayPause} id="play-pause"><i className="fas fa-play"></i></button>
                            <div className="volumenUi">
                                <button id="btnv" onClick={toggleMute}><i className="fas fa-volume-down"></i></button>
                                <div className="actualVolumen">
                                    <div id="volumeControl"></div>
                                </div>
                            </div>
                        </div>
                        <div className="lowerControl">
                            <p id="currentTime">0</p>
                            <div onClick={changeProgress} className="playbar">
                                <div id="timeline" className="playtimeline"></div>
                            </div>
                            <p id="durationTime">0</p>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }

    render() {
        return (
            <div className="videosWrapper">
                <div className="videoWrap">
                    {this.renderFullVideo()}
                </div>
                {this.renderVideos()}
            </div>
        )
    }

}