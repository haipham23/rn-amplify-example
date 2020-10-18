import * as React from 'react';
import renderer from 'react-test-renderer';

import AuthOptions from './AuthOptions';

describe('<AuthOptions />', () => {
  const showRegister = jest.fn();
  const showLogin = jest.fn();
  const showForgetPassword = jest.fn();

  it('should render', () => {
    const tree = renderer.create(
      <AuthOptions
        currentFormState="register"
        showRegister={showRegister}
        showLogin={showLogin}
        showForgetPassword={showForgetPassword}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
