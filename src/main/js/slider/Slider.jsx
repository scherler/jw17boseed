import React, { Component, PropTypes } from 'react';
import Slide from './Slide';

export default class Slider extends Component {
    render() {
        const { slides: slidesProps } = this.props;
        if (!slidesProps) {
            return null;
        }
        const slides = slidesProps.map((item, index) => (<Slide slide={item} id={index} />));
        console.log('alone');
        // return the component
        return (<ul>
            { slides }
        </ul>);
    }
}
Slider.propTypes = {
    slides: PropTypes.array,
};
