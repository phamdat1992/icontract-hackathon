import React from 'react';
import './loader.scss';

export default function Loader({ isFull }) {
    return (
        <div className={`loader ${isFull ? 'loader--full-viewport' : ''}`}>
            <div className='loader__item'></div>
        </div>
    );
}