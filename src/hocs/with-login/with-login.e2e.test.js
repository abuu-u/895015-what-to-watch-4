import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withLogin from "./with-login.js";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withLogin(MockComponent);

it(`Should change activeTab`, () => {
  const wrapper = shallow(<MockComponentWrapped
    onSubmit={() => {}}
  />);

  expect(wrapper.props().errorText).toEqual(``);

  wrapper.props().onSubmit({login: 123, password: 123});
  expect(wrapper.props().activeTab).toEqual(`Please enter a valid email address`);
});
