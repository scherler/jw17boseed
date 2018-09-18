import React, { Component, PropTypes } from 'react';
import { Icon } from '@jenkins-cd/design-language';

export default class Logo extends Component {
    render() {
        // return the component
        return (<h1 className="MasterLogo BlueOceanLogo MyLogo">
            <Icon icon="ActionBookmark" size={50} />
            My Jenkins</h1>);
    }
}
Logo.propTypes = {
    children: PropTypes.any,
};
