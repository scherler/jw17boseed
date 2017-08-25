import React, { Component, PropTypes } from 'react';
import Slide from './Slide';

export default class Slider extends Component {
    render() {
        const { slides: slidesProps } = this.props;
        if (!slidesProps) {
            return null;
        }
        const slides = slidesProps.map((item, index) => (<li key={index}><Slide slide={item} id={index} /></li>));
        console.log('alone');
        // return the component
        return (<ul className="slider">
            { slides }
        </ul>);
    }
}
Slider.propTypes = {
    slides: PropTypes.array,
};
