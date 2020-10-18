import * as React from 'react';
import renderer from 'react-test-renderer';

import Confirmation from './Confirmation';

describe('<Confirmation />', () => {
  const updateConfirmCode = jest.fn();
  const confirm = jest.fn();

  it('should render', () => {
    const tree = renderer.create(
      <Confirmation
        email="test@example.com"
        confirmCode="111111"
        updateConfirmCode={updateConfirmCode}
        confirm={confirm}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
