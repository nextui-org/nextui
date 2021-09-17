import React from 'react'
import { mount } from 'enzyme'
import { Textarea } from 'components'
import { nativeEvent } from 'tests/utils'

describe('Textarea', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Textarea placeholder="placeholder" />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work with different styles', () => {
    const wrapper = mount(
      <div>
        <Textarea status="secondary" />
        <Textarea width="20%" />
        <Textarea minHeight="100px" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should set textarea from value', () => {
    const wrapper = mount(<Textarea initialValue="test-value" />)
    let el = wrapper.find('textarea').getDOMNode() as HTMLTextAreaElement
    expect(el.value).toEqual('test-value')

    wrapper.setProps({ value: 'test-value2' })
    el = wrapper.find('textarea').getDOMNode() as HTMLTextAreaElement
    expect(el.value).toEqual('test-value2')
  })

  it('should trigger events when textarea changed', () => {
    let value = ''
    const handler = jest.fn().mockImplementation(e => (value = e.target.value))
    const wrapper = mount(<Textarea onChange={handler} />)
    wrapper.find('textarea').simulate('change', { target: { value: 'test-value' } })
    expect(handler).toHaveBeenCalled()
    expect(value).toEqual('test-value')
    handler.mockRestore()
  })

  it('should ignore events when disabled or readonly', () => {
    const handler = jest.fn()
    const wrapper = mount(<Textarea onChange={handler} disabled />)
    wrapper.find('textarea').simulate('change', { target: { value: 'test-value' } })
    expect(handler).not.toHaveBeenCalled()

    wrapper.setProps({ disabled: false, readOnly: true })
    wrapper.find('textarea').simulate('change', { target: { value: 'test-value2' } })
    expect(handler).not.toHaveBeenCalled()
    handler.mockRestore()
  })

  it('should pass through blur event', () => {
    const blurHandler = jest.fn()
    const focusHandler = jest.fn()
    const wrapper = mount(<Textarea onBlur={blurHandler} onFocus={focusHandler} />)

    wrapper.find('textarea').simulate('focus', nativeEvent)
    expect(focusHandler).toHaveBeenCalled()

    wrapper.find('textarea').simulate('blur', nativeEvent)
    expect(blurHandler).toHaveBeenCalled()
  })
})
