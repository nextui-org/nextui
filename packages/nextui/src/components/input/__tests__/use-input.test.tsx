import React, { useEffect } from 'react'
import { mount } from 'enzyme'
import { Input, useInput } from 'components'

describe('UseInput', () => {
  it('should follow change with use-input', () => {
    let log = ''
    const logSpy = jest.spyOn(console, 'log').mockImplementation(msg => (log = msg))
    const MockInput: React.FC<{ value?: string }> = ({ value }) => {
      const { state, setState, bindings } = useInput('')
      useEffect(() => {
        if (value) setState(value)
      }, [value])
      useEffect(() => {
        if (state) console.log(state)
      }, [state])
      return <Input {...bindings} />
    }

    const wrapper = mount(<MockInput />)
    wrapper.setProps({ value: 'test' })
    const input = wrapper.find('input').at(0).getDOMNode() as HTMLInputElement

    expect(input.value).toEqual('test')
    expect(log).toContain('test')

    log = ''
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'test-change' } })
    expect(log).toContain('test-change')
    logSpy.mockRestore()
  })

  it('should follow change with use-input', () => {
    const MockInput: React.FC<{ value?: string; resetValue?: boolean }> = ({
      value,
      resetValue,
    }) => {
      const { reset, setState, bindings } = useInput('')
      useEffect(() => {
        if (value) setState(value)
      }, [value])
      useEffect(() => {
        if (resetValue) reset()
      }, [resetValue])
      return <Input {...bindings} />
    }

    const wrapper = mount(<MockInput />)
    wrapper.setProps({ value: 'test' })
    let input = wrapper.find('input').at(0).getDOMNode() as HTMLInputElement
    expect(input.value).toEqual('test')

    wrapper.setProps({ resetValue: true })
    input = wrapper.find('input').at(0).getDOMNode() as HTMLInputElement
    expect(input.value).toEqual('')
  })
})
