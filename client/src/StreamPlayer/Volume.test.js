import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import Volume from './Volume';

describe('Volume Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Volume />);
    expect(getByText('100%')).toBeInTheDocument();
  });

  it('should call the onVolumeChange property', () => {
    const spyFn = jest.fn();
    const { queryByTestId, getByText } = render(<Volume onVolumeChange={spyFn} />);

    fireEvent.change(queryByTestId('volumeControl'), { target: { value: 0.5 }});
    expect(spyFn).toHaveBeenCalled();
    expect(getByText('50%')).toBeInTheDocument();
  });
});
