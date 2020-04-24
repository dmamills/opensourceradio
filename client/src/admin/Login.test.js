import React from 'react';
import { getByText, render, wait, act, fireEvent } from '@testing-library/react';
import Login from './Login';
import api from './api';

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Login Component', () => {
    xit('renders without crashing', () => {
      jest.mock('./api', () => {
        return {
          authTest: () => true,
        }
      });
      const { getByText } = render(<Login onAuthChange={() => {}} />);
      expect(getByText('opensourceradio admin')).toBeInTheDocument();
    });

    xit('should show invalid key when api test fails', async () => {
      jest.mock('./api', () => {
        return {
          authTest: () => false,
        }
      });

      let wcontainer;
      await act(async () => {
          let { queryByTestId, container } = await render(<Login onAuthChange={() => {}} />);
          await fireEvent.change(queryByTestId('login'), { target: { value: 'testpassword' }});
          await fireEvent.click(container.querySelector('button'));
          wcontainer = container;
      });

      const errorValue = wcontainer.querySelector('strong').innerHTML;
      expect(errorValue).toBe('error');
    });

    xit('should call the onAuthChange property', async () => {
        const spyFn = jest.fn();
        api.authTest.mockResolvedValue(true);

        await act(async () => {
            const { container, queryByTestId, debug } = await render(<Login onAuthChange={spyFn} />);
            await fireEvent.change(queryByTestId('login'), { target: { value: 'testpassword' }});
            await fireEvent.click(container.querySelector('button'));
        });
        expect(spyFn).toHaveBeenCalled();
    });
});
