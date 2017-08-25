import React, { Component, PropTypes } from 'react';
import Markdown from 'react-remarkable';

export default class Slide extends Component {
    render() {
        const { slide, id } = this.props;
        return (<div key={id} className="slide BasicHeader BasicHeader--default ContentPageHeader">
            <div className="Header-topNav">
                <h2 className="jenkins-header-logo">
                    { slide.title }
                </h2>
            </div>
            <div className="slide-main">
                <Markdown>
                    { slide.description }
                </Markdown>
            </div>
        </div>);
    }
}
Slide.propTypes = {
    id: PropTypes.number,
    slide: PropTypes.shape({
        title: PropTypes.node,
        description: PropTypes.node,
    }),
};
