import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import Slide from '../src/main/js/slider/Slide';
import Slider from '../src/main/js/slider/Slider';
import { beforeEach, storiesOf, describe, it, specs } from '../.storybook/facade';

const slide = {
    id: '0',
    title: "Pimp my Blue Ocean",
    description: " - with custom css\n" +
    " - custom components",
    content: "### create a custom plugin \n" +
    "\n" +
    "We will use [JenkinsWorld 2017 BO seed](https://github.com/scherler/jw17boseed)\n" +
    "\n" +
    "### customize Blue Ocean\n" +
    " - with custom css\n" +
    " - custom components",
};
const stories = storiesOf('Pimp my BO', module);

const slides = [
    slide,
    {
        id: '1',
        title: "Plugin Anatomy",
        description: "Extension Point definition file and implementation",
        content: "![Anatomy](./images/anatomy.png)",
    },
    {
        id: '2',
        title: "Extension Point",
        description: "How to Implement a Client-Side (JavaScript) Extension Point",
        content: "![Extension](./images/extensionpoint.png)\n" +
        "1. `jenkins-js-extension.yaml` - Extension Point definition file. \n" +
        "Needs to be placed in `src/main/js` (the root of your JavaScript source).   \n" +
        "1. The `.jsx` component file that implements the Extension Point.\n" +
        "Placed relative to `jenkins-js-extension.yaml`. The `.jsx` file contains a [React] component needs `export default class Logo extends Component`. \n",
    },
    {
        id: '3',
        title: "jenkins-js-extension.yaml",
        description: "The implementation of an extension point is declare/define in `jenkins-js-extension.yaml` in order \"picked up\" by Blue Ocean. \n",
        content: "```yaml\n" +
        "# Extension point implementations in this plugin.\n" +
        "# This file tells Blue Ocean what Extension Point components are in this\n" +
        "# plugin + what extension points they implement.\n" +
        "\n" +
        "extensions:\n" +
        "  - component: Logo\n" +
        "    extensionPoint: jenkins.header.logo\n" +
        "```\n" +
        "\n" +
        "![final](./images/extensionFinal.png)\n",
    },
    {
        id: '4',
        title: "Logo.jsx",
        description: "How does it work?",
        content: "```javascript\n" +
        "import React, { Component, PropTypes } from 'react';\n" +
        "import { Icon } from '@jenkins-cd/react-material-icons';\n" +
        "\n" +
        "export default class Logo extends Component {\n" +
        "    render() {\n" +
        "        // return the component\n" +
        "        return (<a className=\"MasterLogo BlueOceanLogo MyLogo\">\n" +
        "            <Icon icon=\"favorite\" size={50} />\n" +
        "            my{ this.props.children }\n" +
        "        </a>);\n" +
        "    }\n" +
        "}\n" +
        "Logo.propTypes = {\n" +
        "    children: PropTypes.any,\n" +
        "}\n" +
        "```",
    },
    {
        id: '5',
        title: "Add Style using LESS",
        description: "1. mkdir src/main/less\n" +
        "1. touch extensions.less",
        content: "```less\n" +
        ".MyLogo{\n" +
        "  border-bottom: 2px outset red;\n" +
        "  background-color: #c7ddef;\n" +
        "}\n" +
        ".BlueOceanLogo svg, .BlueOceanLogo:hover svg{\n" +
        "  height: 50px;\n" +
        "}\n" +
        "```",
    },
];
const storyName = 'Slider';
stories.add(storyName, () => {
    const story = (<div className="story">
        <Slider slides={slides}/>
    </div>);
    const wrapper = mount(story);

    specs(() => describe(storyName, () => {
        it('renders main div', () => {
            expect(wrapper.find('div.slider').length).toBe(1)
        });
    }));
    return story;
});
