import React from 'react';
import { mount } from 'enzyme';
import { Grid } from '@components';

describe('Grid', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Grid.Container>
        <Grid>test</Grid>
        <Grid>test</Grid>
      </Grid.Container>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('all breakpoint values should be supported', () => {
    const wrapper = mount(
      <Grid.Container xs={1} sm={2} md={3} lg={4} xl={5}>
        <Grid xs={1} sm={2} md={3} lg={4} xl={5}>
          test
        </Grid>
      </Grid.Container>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('css value should be passed through', () => {
    const wrapper = mount(
      <Grid.Container
        justify="center"
        alignItems="center"
        alignContent="center"
        direction="column"
        wrap="wrap"
      >
        <Grid
          justify="center"
          alignItems="center"
          alignContent="center"
          direction="column"
        >
          test
        </Grid>
      </Grid.Container>
    );

    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('decimal spacing should be supported', () => {
    const wrapper = mount(
      <Grid.Container gap={0.11123}>
        <Grid>test</Grid>
      </Grid.Container>
    );

    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('nested components should be supported', () => {
    const wrapper = mount(
      <Grid.Container>
        <Grid>test</Grid>
        <Grid.Container>
          <Grid>test</Grid>
          <Grid.Container>
            <Grid>test</Grid>
            <Grid.Container>
              <Grid>test</Grid>
            </Grid.Container>
            ,
          </Grid.Container>
          ,
        </Grid.Container>
        ,
      </Grid.Container>
    );

    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('there should be no alignment class when not set', () => {
    let wrapper = mount(<Grid.Container justify="flex-end" />);
    expect(wrapper.find('.item').hasClass('justify')).toBeTruthy();
    wrapper = mount(<Grid.Container />);
    expect(wrapper.find('.item').hasClass('justify')).not.toBeTruthy();
  });

  it('there should be no responsive class when not set', () => {
    let wrapper = mount(<Grid.Container sm={2} />);
    expect(wrapper.find('.item').hasClass('sm')).toBeTruthy();
    expect(wrapper.find('.item').hasClass('xs')).not.toBeTruthy();
    wrapper = mount(<Grid.Container />);
    expect(wrapper.find('.item').hasClass('sm')).not.toBeTruthy();
  });

  it('should work correctly when use alone', () => {
    const wrapper = mount(<Grid />);
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should work correctly when size exceeds', () => {
    const wrapper = mount(
      <Grid.Container>
        <Grid xs={13}>test</Grid>
        <Grid xs={-1}>test</Grid>
      </Grid.Container>
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
