import React, { Component, PropTypes } from 'react';
import { Dropdown } from '@jenkins-cd/design-language';
import Slide from './Slide';
import KeyCodes from '../helper/KeyCodes';
import { preventDefault } from '../helper/preventDefault';

export default class Slider extends Component {
    constructor() {
        super();
        this.state = {
            current: "0",
        }
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyEvent);
    }
    componentWillUnmount() {
        document.addEventListener('keydown', this.handleKeyEvent);
    }
    handleKeyEvent = (event) => {
        const { keyCode } = event;
        const currentSlideNumber = Number.parseInt(this.state.current);
        switch (keyCode) {
            case KeyCodes.ARROW_RIGHT:
            case KeyCodes.ENTER:
                preventDefault(event);
                const lastSlide = this.props.slides.length - 1;
                if (currentSlideNumber === lastSlide) {
                    console.log("end of the road");
                    break;
                }
                this.setState({
                    current: new String(currentSlideNumber + 1),
                });
                break;
            case KeyCodes.ARROW_LEFT:
                preventDefault(event);
                if (currentSlideNumber === 0) {
                    console.log("end of the road");
                    break;
                }
                this.setState({
                    current: new String(currentSlideNumber - 1),
                });
                break;

            default:
                break;
        }
    };
    render() {
        const { slides: slidesProps } = this.props;
        if (!slidesProps) {
            return null;
        }
        const parseOption = (option) => {
            // the labe is the title
            return option.title;
        };
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
