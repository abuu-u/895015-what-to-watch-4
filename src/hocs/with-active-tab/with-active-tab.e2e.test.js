import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActiveTab from "./with-active-tab.js";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveTab(MockComponent);

it(`Should change activeTab`, () => {
  const wrapper = shallow(<MockComponentWrapped/>);

  expect(wrapper.props().activeTab).toEqual(`Overview`);

  wrapper.props().onClick(`Review`);
  expect(wrapper.props().activeTab).toEqual(`Review`);

  wrapper.props().onClick(`Details`);
  expect(wrapper.props().activeTab).toEqual(`Details`);
});
