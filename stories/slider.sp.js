import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import Slider from '../src/main/js/slider/Slider';
import { beforeEach, storiesOf, describe, it, specs } from '../.storybook/facade';

const stories = storiesOf('Slider', module);

let storyName = 'Slider';
stories.add(storyName, () => {
    const slides = [
        {
            description: "first slide",
        },
        {
            description: "second slide",
        }
    ];
    const story = (<div className="story">
        <Slider slides={slides}/>
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
