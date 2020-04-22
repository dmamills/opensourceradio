import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import MetadataActions from './MetadataActions';

describe('MetadataActions Component', () => {
    it('renders expected buttons based on edit state', () => {
      let component = render(<MetadataActions isEditing={true} />);
      expect(component.getByText('Save')).toBeInTheDocument();
      expect(component.getByText('Cancel')).toBeInTheDocument();

      component = render(<MetadataActions isEditing={false} />);
      expect(component.getByText('Delete')).toBeInTheDocument();
      expect(component.getByText('Edit')).toBeInTheDocument();
    });

  it('should invoke save function', () => {
    const spyFn = jest.fn();
    const { queryByText } = render(<MetadataActions isEditing={true} save={spyFn} />);

    fireEvent.click(queryByText('Save'));
    expect(spyFn).toHaveBeenCalled();
  });

  it('should invoke cancel function', () => {
    const spyFn = jest.fn();
    const { queryByText } = render(<MetadataActions isEditing={true} cancel={spyFn} />);

    fireEvent.click(queryByText('Cancel'));
    expect(spyFn).toHaveBeenCalled();
  });

  it('should invoke edit function', () => {
    const spyFn = jest.fn();
    const { queryByText } = render(<MetadataActions isEditing={false} edit={spyFn} />);

    fireEvent.click(queryByText('Edit'));
    expect(spyFn).toHaveBeenCalled();
  });

  it('should invoke delete function', () => {
    const spyFn = jest.fn();
    jest.spyOn(window, 'confirm').mockImplementation(() => true)
    const { queryByText } = render(<MetadataActions isEditing={false} deleteFile={spyFn} selectedFile="hey" />);

    fireEvent.click(queryByText('Delete'));
    expect(spyFn).toHaveBeenCalled();
  });

  it('shouldnt invoke delete when selected file not set', () => {
    const spyFn = jest.fn();
    /* jest.spyOn(window, 'confirm').mockImplementation(() => true) */
    const { queryByText } = render(<MetadataActions isEditing={false} deleteFile={spyFn} />);

    fireEvent.click(queryByText('Delete'));
    expect(spyFn).not.toHaveBeenCalled();
  });

  it('shouldnt invoke delete when window confirm denied', () => {
    const spyFn = jest.fn();
    jest.spyOn(window, 'confirm').mockImplementation(() => false)
    const { queryByText } = render(<MetadataActions isEditing={false} deleteFile={spyFn} selectedFile="hey" />);

    fireEvent.click(queryByText('Delete'));
    expect(spyFn).not.toHaveBeenCalled();
  });

});
