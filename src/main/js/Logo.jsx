import React, { Component, PropTypes } from 'react';
import { Icon } from '@jenkins-cd/react-material-icons';

export default class Logo extends Component {
    render() {
        // return the component
        return (<a className="MasterLogo BlueOceanLogo MyLogo">
            <Icon icon="favorite" size={50} />
            my{ this.props.children }
        </a>);
    }
}
Logo.propTypes = {
    children: PropTypes.any,
};
