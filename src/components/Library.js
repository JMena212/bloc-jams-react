import React, { Component } from 'react';
import { Link }  from 'react-router-dom';
import albumData from './../data/albums';
import '.././styles/library.css';
import '.././styles/main.css';

class Library extends Component {
    constructor(props) {
        super(props);
        this.state = { albums: albumData};
    }
    render() {
        return (
                <div className="album-covers container clearfix">
                {this.state.albums.map((album, index) => (
                                                          <div className="collection-album-container column fourth" key={index}>
                                                        
                                                          <img src={album.albumCover} alt={album.title} />
                                                          <div className="collection-album-info caption">
                                                          <p>
                                                          <a href={`/album/${album.slug}`}className="album-name">{album.title}</a>
                                                          <a href="#">{album.artists}</a>
                                                          <div>{album.songs.length} songs </div>
                                                          </p>
                                                          </div>
                                                          </div>
                                                          ))}
                </div>
                );
    }
    
}

export default Library;
