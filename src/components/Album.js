import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import '.././styles/normalize.css';
import '.././styles/main.css';
import '.././styles/album.css';
import '.././styles/player_bar.css';

class Album extends Component {
    constructor(props) {
        super(props);

        const album = albumData.find( album => {
          return album.slug === this.props.match.params.slug
         });

        this.state = {
        album: album,
        artist: album.artist,
        currentSong: album.songs[0],
        currentTime: 0,
        duration: album.songs[0].duration,
        volume: .5,
        isPlaying: false
        };

        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
        this.audioElement.volume = this.state.volume;
    }

    play() {
        this.audioElement.play();
        this.setState({isPlaying: true });
    }

    pause() {
        this.audioElement.pause();
        this.setState({isPlaying: false});
    }

    componentDidMount() {
        this.eventListeners = {
        timeupdate: e => {
            this.setState({ currentTime: this.audioElement.currentTime });
        },
        durationchange: e => {
            this.setState({ duration: this.audioElement.duration });
        }
        };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    }

    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    }



    setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong:song });
    }

    handleSongClick(song) {
        const isSameSong = this.state.currentSong === song ;
        if (this.state.isPlaying && isSameSong) {
            this.pause();
        } else {
             if (!isSameSong) { this.setSong(song); }
            this.play();
        }
    }

    handlePrevClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleNextClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex + 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleTimeChange(e) {
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({ currentTime: newTime });
    }

    handleVolumeChange(e) {
        const newVolume = e.target.value;
        this.audioElement.volume = newVolume;
        this.setState({ volume: newVolume});

    }

    formatTime(s) {
        if (isNaN(s)) {
            (timeFormatted == "-:--" )
        }
        const seconds = Math.floor(s);
        const minutes = Math.floor(seconds / 60);
        var secondsRemainder = seconds % 60;
        if (secondsRemainder  < 10) {
            secondsRemainder = "0" + secondsRemainder;
        }
        const timeFormatted = minutes + ':' + secondsRemainder;
        return timeFormatted;
    }


    render() {
        return (
          <section className="album">
                <main className= "album-view container narrow">
                <section className="clearfix">
                    <div className="column half">
                        <img className="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
                    </div>
                    <div className="album-view-details column half">
                          <h1 className="album-view-title">{this.state.album.title}</h1>
                          <h2 className="artist-view-artist">{this.state.album.artist}</h2>
                          <h3 className="album-view-release-info">{this.state.album.releaseInfo}</h3>
                    </div>

                </section>
                <table className="album-view-song-list">
                  <colgroup>
                  <col id="song-number-column" />
                  <col id="song-title-column" />
                  <col id="song-duration-column" />
                  </colgroup>
                  <tbody>
                {this.state.album.songs.map( (song,index) =>
                                            <tr className="album-view-song-item" key={index} onClick={() => this.handleSongClick(song)} >
                                            <td className="song-actions">
                                            <button className="button">
                                            <span className="song-item-number">{index+1}</span>
                                            <span className="ion-play"></span>
                                            <span className="ion-pause"></span>
                                            </button>
                                            </td>
                                            <td className="song-item-title">{song.title}</td>
                                            <td className="song-item-duration">{this.formatTime(song.duration)}</td>
                                            </tr>
                )}
                        </tbody>
                        </table>
                        </main>
                        <PlayerBar
                        isPlaying={this.state.isPlaying}
                        currentSong={this.state.currentSong}
                        artist={this.state.artist}
                        currentTime={this.audioElement.currentTime}
                        duration={this.audioElement.duration}
                        volume={this.state.volume}
                        handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                        handlePrevClick={() => this.handlePrevClick()}
                        handleNextClick={() => this.handleNextClick()}
                        handleTimeChange={(e) => this.handleTimeChange(e)}
                        formatTime={(e) => this.formatTime(e)}
                        handleVolumeChange={(e) => this.handleVolumeChange(e)}
                        />
        </section>
                );
    }

}

export default Album;
