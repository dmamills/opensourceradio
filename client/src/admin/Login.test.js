import React from 'react';
import { getByText, render, wait, act, fireEvent } from '@testing-library/react';
import Login from './Login';
import api from './api';

jest.mock('./api');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Login Component', () => {
    xit('renders without crashing', () => {
        api.authTest.mockResolvedValue(true);
        expect(getByText('opensourceradio admin')).toBeInTheDocument();
    });

    xit('should show invalid key when api test fails', async () => {
        api.authTest.mockResolvedValue(false);

        await act(async () => {
            const { container, queryByTestId } = await render(<Login onAuthChange={() => {}} />);
            await fireEvent.change(queryByTestId('login'), { target: { value: 'testpassword' }});
            await fireEvent.click(container.querySelector('button'));
        });

        expect(getByText('Invalid Key.')).toBeInTheDocument();
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
