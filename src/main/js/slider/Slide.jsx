import React, { Component, PropTypes } from 'react';
import Markdown from 'react-remarkable';

export default class Slide extends Component {
    render() {
        const { slide, id } = this.props;
        return (<li>
            <div className="index">
                {id}
            </div>
            <div className="slide">
                <Markdown>
                    { slide.description }
                </Markdown>
            </div>
        </li>);
    }
}
Slide.propTypes = {
    id: PropTypes.number,
    slide: PropTypes.shape({
        description: PropTypes.node,
    }),
};
