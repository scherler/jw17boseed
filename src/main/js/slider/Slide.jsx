import React, { Component, PropTypes } from 'react';
import Markdown from 'react-remarkable';

export default class Slide extends Component {
    render() {
        const { slide, id } = this.props;
        return (<div key={id} className="slide">
           <section className="BasicHeader BasicHeader--default ContentPageHeader">
               <div className="Header-topNav">
                   <h2 className="jenkins-header-logo">
                       { slide.description }
                   </h2>
               </div>
               <div className="slide-main">
                   <Markdown>
                       { slide.title }
                   </Markdown>
               </div>
           </section>
            <main>
                <Markdown>
                   { slide.content }
                </Markdown>

            </main>
        </div>);
    }
}
Slide.propTypes = {
    id: PropTypes.string,
    slide: PropTypes.shape({
        title: PropTypes.node,
        content: PropTypes.node,
        description: PropTypes.node,
    }),
};
