import React from 'react'
import { mount } from 'enzyme'
import { Input } from 'components'
import { nativeEvent } from 'tests/utils'

describe('Input', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Input placeholder="placeholder" />)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work with different sizes', () => {
    const wrapper = mount(
      <div>
        <Input size="mini" />
        <Input size="small" />
        <Input size="large" />
        <Input width="50%" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should work with different status', () => {
    const wrapper = mount(
      <div>
        <Input status="secondary" />
        <Input status="success" />
        <Input status="warning" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be work with label', () => {
    const wrapper = mount(
      <div>
        <Input label="label" />
        <Input labelRight="label" />
        <Input>
          <span>Block Label</span>
        </Input>
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should be work with icon', () => {
    const wrapper = mount(
      <div>
        <Input icon={<span>test-icon</span>} />
        <Input iconRight={<span>test-icon</span>} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should set input from value', () => {
    let wrapper = mount(<Input initialValue="test" />)
    let input = wrapper.find('input').getDOMNode() as HTMLInputElement
    expect(input.value).toEqual('test')

    wrapper = mount(<Input value="test2" />)
    input = wrapper.find('input').getDOMNode() as HTMLInputElement
    expect(input.value).toEqual('test2')

    wrapper.setProps({ value: 'test3' })
    input = wrapper.find('input').getDOMNode() as HTMLInputElement
    expect(input.value).toEqual('test3')
  })

  it('should trigger event when input changed', () => {
    let value = ''
    const callback = jest
      .fn()
      .mockImplementation((e: React.ChangeEvent<HTMLInputElement>) => (value = e.target.value))
    const wrapper = mount(<Input onChange={callback} />)
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'test' } })
    expect(callback).toHaveBeenCalled()
    expect(value).toEqual('test')
  })

  it('should ignore event when input disabled', () => {
    const callback = jest.fn()
    const wrapper = mount(<Input onChange={callback} disabled />)
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'test' } })
    expect(callback).not.toHaveBeenCalled()
  })

  it('should ignore event when input readonly', () => {
    const callback = jest.fn()
    const wrapper = mount(<Input onChange={callback} readOnly />)
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'test' } })
    expect(callback).not.toHaveBeenCalled()
  })

  it('should clear text', () => {
    let value = ''
    const callback = jest
      .fn()
      .mockImplementation((e: React.ChangeEvent<HTMLInputElement>) => (value = e.target.value))
    const clearHandler = jest.fn()
    const wrapper = mount(<Input onChange={callback} clearable onClearClick={clearHandler} />)

    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'test' } })
    expect(callback).toHaveBeenCalled()
    expect(value).toEqual('test')

    wrapper.find('.clear-icon').at(0).simulate('click', nativeEvent)
    expect(clearHandler).toHaveBeenCalled()
    expect(value).toEqual('')
  })

  it('should trigger focus correctly', () => {
    const focus = jest.fn()
    const blur = jest.fn()
    const wrapper = mount(<Input onFocus={focus} onBlur={blur} />)

    const input = wrapper.find('input').at(0)
    input.simulate('focus')
    expect(focus).toHaveBeenCalled()
    input.simulate('blur')
    expect(blur).toHaveBeenCalled()
  })

  it('should trigger icon event', () => {
    const click = jest.fn()
    const wrapper = mount(
      <Input icon={<span id="test-icon">icon</span>} onIconClick={click} iconClickable />,
    )
    wrapper.find('#test-icon').simulate('click', nativeEvent)
    expect(click).toHaveBeenCalled()
  })

  it('should ignore icon event when input disabled', () => {
    const click = jest.fn()
    const wrapper = mount(
      <Input icon={<span id="test-icon">icon</span>} onIconClick={click} iconClickable disabled />,
    )
    wrapper.find('#test-icon').simulate('click', nativeEvent)
    expect(click).not.toHaveBeenCalled()
  })

  // check ref is available: https://github.com/geist-org/react/issues/189
  it('should forward ref by default', () => {
    const ref = React.createRef<HTMLInputElement>()
    const wrapper = mount(<Input ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
