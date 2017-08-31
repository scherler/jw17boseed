import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import Slide from '../src/main/js/slider/Slide';
import Slider from '../src/main/js/slider/Slider';
import { beforeEach, storiesOf, describe, it, specs } from '../.storybook/facade';

const slide = {
    id: '0',
    title: "Deliver Blue Ocean Components at the Speed of Light",
    description: "by Thorsten Scherler",
    content: "Using storybook.js.org for Blue Ocean frontend to \n" +
    "\n" +
    "- speed up the development \n" +
    "- speed up the delivery process \n" +
    "- validate with PM and designer the UX. ",
};
const stories = storiesOf('Deliver Blue Ocean Components at the Speed of Light', module);

const slides = [
    slide,
    {
        id: '1',
        title: "Storybook",
        description: "Development environment for UI components",
        content: "It allows you to browse a component library, view the different states of each component, and interactively develop and test components.\n" +
        "![story](./images/story.png)\n" +
        "![storyAnimated](./images/storybook.gif)\n" +
        "![storyAnimated](./images/storybook-shortcuts.png)\n" +
        "\n",
    },
    {
        id: '2',
        title: "Storybook Specifications Addon",
        description: "Have your unit tests in storybook",
        content: "With https://github.com/mthuret/storybook-addon-specifications you are able to write unit tests directly in storybook\n" +
        "![storySpecification](./images/specifications.png)\n" +
        "\n",
    },
    {
        id: '3',
        title: "Run the test",
        description: "Define the test config in package.json",
        content: "```\n" +
        "  \"jest\": {\n" +
        "    \"setupFiles\": [\n" +
        "      \"./.storybook/__conf__/jestMockConfig.js\"\n" +
        "    ],\n" +
        "    \"automock\": false,\n" +
        "    \"testMatch\": [\n" +
        "      \"**/stories/*.sp.js?(x)\",\n" +
        "      \"**/src/test/js/**/*-spec.{js,jsx}\"\n" +
        "    ],\n" +
        "    \"globals\": {\n" +
        "      \"__TESTS__\": true\n" +
        "    },\n" +
        "    \"collectCoverage\": true,\n" +
        "    \"collectCoverageFrom\": [\n" +
        "      \"src/main/js/**/*.jsx\",\n" +
        "      \"!src/main/js/stories/*.js\",\n" +
        "      \"src/main/js/*.jsx\"\n" +
        "    ],\n" +
        "    \"testResultsProcessor\": \"jest-junit\",\n" +
        "    \"unmockedModulePathPatterns\": [\n" +
        "      \"<rootDir>/node_modules/chai/\",\n" +
        "      \"<rootDir>/node_modules/core-js/\",\n" +
        "      \"<rootDir>/node_modules/enzyme/\",\n" +
        "      \"<rootDir>/node_modules/es6-shim/\",\n" +
        "      \"<rootDir>/node_modules/lodash/\",\n" +
        "      \"<rootDir>/node_modules/react/\",\n" +
        "      \"<rootDir>/node_modules/react-addons-test-utils/\",\n" +
        "      \"<rootDir>/node_modules/react-dom/\",\n" +
        "      \"<rootDir>/node_modules/uuid/\"\n" +
        "    ]\n" +
        "  },\n" +
        "  \"jest-junit\": {\n" +
        "    \"suiteName\": \"tests for storybook\",\n" +
        "    \"output\": \"./target/story-junit.xml\",\n" +
        "    \"classNameTemplate\": \"{classname}\",\n" +
        "    \"titleTemplate\": \"{title}\",\n" +
        "    \"usePathForSuiteName\": \"true\"\n" +
        "  },\n" +
        "```\n",
    },
    {
        id: '4',
        title: "¿Questions? ",
        description: "...and answers",
        content: "![misterion](./images/misterion.png)",
    },
];
const storyName = 'Slides';
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
