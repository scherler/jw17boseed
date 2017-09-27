import co from 'co';
import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import Logo from '../src/main/js/Logo';
import { beforeEach, storiesOf, describe, it, specs } from '../.storybook/facade';

const stories = storiesOf('Hello World', module);

let storyName = 'say hello to unit testing in storybook';
stories.add(storyName, () => {
    const story = (<div className="hello">
        <Logo>
            <div>Jenkins</div>
        </Logo>
        <div className="teaser">
            Hello
        </div>
    </div>);
    const wrapper = mount(story);

    specs(() => describe(storyName, () => {
        it('renders div saying hello', () => {
            expect(wrapper.find('div.hello').length).toBe(1)
        });
        it('renders our logo component', () => {
            expect(wrapper.find('Logo').length).toBe(1)
        });
    }));
    return story;
});
