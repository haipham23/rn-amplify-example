import * as React from 'react';
import renderer from 'react-test-renderer';

import Register from './Register';

describe('<Register />', () => {
  const updateUsername = jest.fn();
  const updateEmail = jest.fn();
  const updatePassword = jest.fn();
  const signUp = jest.fn();

  it('should render', () => {
    const tree = renderer.create(
      <Register
        username="testUser"
        email="test@example.com"
        password="12345678"
        updateUsername={updateUsername}
        updateEmail={updateEmail}
        updatePassword={updatePassword}
        signUp={signUp}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
