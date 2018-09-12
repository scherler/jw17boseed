import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import Pulls from '../src/main/js/github/Pulls';
import { storiesOf, describe, it, specs } from '../.storybook/facade';

const stories = storiesOf('GitHub', module);

let storyName = 'say hello to unit testing in storybook';
stories.add(storyName, () => {
    const story = (<div className="hello">
        <Pulls/>
    </div>);
    const wrapper = mount(story);

    specs(() => describe(storyName, () => {
        it('renders div saying hello', () => {
            expect(wrapper.find('div.hello').length).toBe(1)
        });
    }));
    return story;
});
