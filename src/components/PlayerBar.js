import React, { Component } from 'react';
import Album from './Album';
import albumData from './../data/albums';
import '.././styles/normalize.css';
import '.././styles/main.css';
import '.././styles/album.css';



class PlayerBar extends Component {
    render() {
        return (
    <section className="player-bar">
      <div className="container">
                <div className="control-group main-controls">
                 <button className="previous" onClick={this.props.handlePrevClick}>
                    <span className="ion-skip-backward"></span>
                 </button>
                 <button className="play-pause" onClick={this.props.handleSongClick}>
                    <span className={this.props.isPlaying ? 'ion-pause' : 'ion-play'}></span>
                 </button>
                 <button className="next" onClick={this.props.handleNextClick}>
                    <span className="ion-skip-forward"></span>
                 </button>
                </div>


         <div className="control-group currently-playing">
         <h2 className="song-name">{this.props.currentSong.title}</h2>
                <h3 className="artist-name">ARTIST</h3>
            <div className="seek-control">{this.props.formatTime(this.props.currentTime)}
                <input
                type="range"
                className="seek-bar"
                value={(this.props.currentTime / this.props.duration) || 0}
                max="1"
                min="0"
                step="0.01"
                onChange={this.props.handleTimeChange}
                />
                <div className="total-time">{this.props.formatTime(this.props.duration)}</div>
             </div>
         </div>

         <div className="control-group volume-control">
                <span className="icon ion-volume-low"></span>
                <input
                type="range"
                className="seek-bar"
                value={this.props.volume}
                max="1"
                min="0"
                step="0.01"
                onChange={this.props.handleVolumeChange}
                />
                <span className="icon ion-volume-high"></span>
          </div>
        </div>
    </section>

        );
    }
}

export default PlayerBar;
