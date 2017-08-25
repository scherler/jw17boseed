import React, { Component, PropTypes } from 'react';
import { Dropdown } from '@jenkins-cd/design-language';
import Slide from './Slide';

export default class Slider extends Component {
    constructor() {
        super();
        this.state = {
            current: "0",
        }
    }
    render() {
        const { slides: slidesProps } = this.props;
        if (!slidesProps) {
            return null;
        }
        const parseOption = (option) => {
            console.log('hurt');
          return option.title;
        };
        console.log('alone');
        // return the component
        let currentSlide = slidesProps[this.state.current];
        return (<div className="slider">
            { currentSlide &&
            <Dropdown
                options={slidesProps}
                labelFunction={parseOption}
                defaultOption={currentSlide}
                onChange={(value, index) => this.setState({
                    current: new String(index),
                })}
            /> }
            <Slide slide={currentSlide} id={currentSlide.id} />
        </div>);
    }
}
Slider.propTypes = {
    slides: PropTypes.array,
};
