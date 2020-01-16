import React from 'react';
import '../styles/Map.css';
import Nash from '../Nashville cropped board.jpeg'

function Map() {
    return (
        <div className="Map">
            <img src={Nash} className="Nashville-map" />
        </div>
    );
}

export default Map;
