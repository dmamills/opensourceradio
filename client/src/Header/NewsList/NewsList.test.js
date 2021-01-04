import React from 'react';
import { render } from '@testing-library/react';
import NewsList from './index';
import * as api from '../../api';
import { act } from 'react-dom/test-utils';

describe('News List', () => {
  it('should call api', async () => {
    const p = Promise.resolve([]);
    api.getNews = jest.fn().mockReturnValueOnce(p);
    const { getByText } = render(<NewsList />);
    expect(getByText('opensourceradio news!')).toBeInTheDocument();

    await act(() => p);
  });
});
