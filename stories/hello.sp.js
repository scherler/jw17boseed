import co from 'co';
import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import Logo from '../src/main/js/Logo';
import { beforeEach, storiesOf, describe, it, specs } from '../.storybook/facade';

const stories = storiesOf('Hello World', module);

let storyName = 'say hello to unit testing in storybook';
stories.add(storyName, () => {
    const story = (<div>
        <div className="BasicHeader BasicHeader--default ContentPageHeader">
            <Logo />
        </div>
        <div className="hello">
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
