import React from 'react'
import { mount } from 'enzyme'
import { Button } from 'components'
const Icon: React.FC<any> = () => <svg />

describe('ButtonIcon', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Button icon={<Icon />}>action</Button>)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work with right', () => {
    const wrapper = mount(<Button iconRight={<Icon />}>action</Button>)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work without text', () => {
    const wrapper = mount(<Button iconRight={<Icon />} />)
    const text = wrapper.find('.text')
    expect(wrapper.html()).toMatchSnapshot()
    expect(text.length).toBe(0)
  })

  it('the width of the text should be filled', () => {
    const autoWrapper = mount(
      <Button auto icon={<Icon />}>
        action
      </Button>,
    )
    const wrapper = mount(<Button icon={<Icon />}>action</Button>)

    const autoHtml = autoWrapper.find('.text').html()
    const html = wrapper.find('.text').html()
    expect(html).not.toEqual(autoHtml)

    const mini = mount(<Button size="mini">action</Button>)
    const miniIcon = mount(
      <Button size="mini" icon={<Icon />}>
        action
      </Button>,
    )
    const miniHtml = mini.find('.text').html()
    const miniIconHtml = miniIcon.find('.text').html()
    expect(miniHtml).not.toEqual(miniIconHtml)
  })
})
