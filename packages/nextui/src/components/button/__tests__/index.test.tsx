import React from 'react'
import { mount } from 'enzyme'
import { Button } from 'components'
import { sleep } from 'tests/utils'

describe('Button', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Button>Button</Button>)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should support all types', () => {
    const wrapper = mount(
      <div>
        <Button type="secondary" />
        <Button type="secondary-light" />
        <Button type="success" />
        <Button type="success-light" />
        <Button type="warning" />
        <Button type="warning-light" />
        <Button type="error" />
        <Button type="error-light" />
        <Button type="abort" />
      </div>,
    )
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should support all sizes', () => {
    const wrapper = mount(
      <div>
        <Button size="mini" />
        <Button size="small" />
        <Button size="medium" />
        <Button size="large" />
      </div>,
    )
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render different text', () => {
    const wrapper = mount(<Button>button</Button>)
    expect(wrapper.text()).toContain('button')

    wrapper.setProps({
      children: <span>按钮</span>,
    })
    expect(wrapper.text()).toContain('按钮')
  })

  it('should render empty button correctly', () => {
    expect(<Button></Button>).toMatchSnapshot()
  })

  it('should trigger callback function', () => {
    const WrapperButton = () => {
      const [state, setState] = React.useState<string>('state1')
      return <Button onClick={() => setState('state2')}>{state}</Button>
    }
    const wrapper = mount(<WrapperButton />)
    expect(wrapper.text()).toContain('state1')

    wrapper.simulate('click')
    expect(wrapper.text()).toContain('state2')
  })

  it('should ignore events when disabled', () => {
    const WrapperButton = () => {
      const [state, setState] = React.useState<string>('state1')
      return (
        <Button disabled onClick={() => setState('state2')}>
          {state}
        </Button>
      )
    }
    const wrapper = mount(<WrapperButton />)
    expect(wrapper.text()).toContain('state1')

    wrapper.simulate('click')
    expect(wrapper.text()).toContain('state1')
    expect(wrapper.text()).not.toContain('state2')
  })

  it('should ignore events when loading', () => {
    const WrapperButton = () => {
      const [state, setState] = React.useState<string>('state1')
      return (
        <Button loading onClick={() => setState('state2')}>
          {state}
        </Button>
      )
    }
    const wrapper = mount(<WrapperButton />)
    wrapper.simulate('click')
    expect(wrapper.text()).not.toContain('state2')
  })

  it('should render special styles', () => {
    const wrapper = mount(
      <div>
        <Button ghost>button</Button>
        <Button ghost type="success">
          button
        </Button>
        <Button ghost type="warning">
          button
        </Button>
        <Button ghost loading>
          button
        </Button>
        <Button shadow>button</Button>
        <Button auto>button</Button>
        <Button effect={false}>button</Button>
      </div>,
    )
    expect(wrapper).toMatchSnapshot()
    expect(<Button loading>button</Button>).toMatchSnapshot()
  })

  it('should remove expired events', () => {
    const wrapper = mount(<Button>button</Button>)
    wrapper.simulate('click')
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should support loading change with deply', async () => {
    const wrapper = mount(<Button>button</Button>)
    wrapper.simulate('click')
    await sleep(500)
    wrapper.setProps({ loading: true })
    await sleep(500)
    expect(wrapper.find('.loading-container').length).not.toBe(0)
  })

  it('ref should be forwarded', () => {
    const ref = React.createRef<HTMLButtonElement>()
    const wrapper = mount(<Button ref={ref}>action</Button>)
    expect(wrapper.find('button').getDOMNode()).toEqual(ref.current)
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
