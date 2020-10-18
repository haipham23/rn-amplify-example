import * as React from 'react';
import renderer from 'react-test-renderer';

import Login from './Login';

describe('<Login />', () => {
  const updateUsername = jest.fn();
  const updatePassword = jest.fn();
  const login = jest.fn();

  it('should render', () => {
    const tree = renderer.create(
      <Login
        username="testUser"
        password="12345678"
        updateUsername={updateUsername}
        updatePassword={updatePassword}
        login={login}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
