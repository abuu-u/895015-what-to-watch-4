import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withLoginValidation from "./with-login-validation.js";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withLoginValidation(MockComponent);

it(`Should change errorText`, () => {
  const wrapper = shallow(<MockComponentWrapped
    onSubmit={() => {}}
  />);

  expect(wrapper.props().errorText).toEqual(``);

  wrapper.props().onLogin({login: 123, password: 123});
  expect(wrapper.props().errorText).toEqual(`Please enter a valid email address`);
});
