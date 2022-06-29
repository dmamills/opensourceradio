import React, { Component } from 'react';
import cn from 'classnames';
import Dropzone from 'dropzone';

import { getHeaders, SERVER_URL } from '../../api';
import previewTemplate from './previewTemplate';
import { flex, spaceBetween, alignItemsCenter, p05, heavyText, flex2, ml1, p1 } from '../../../styles';
import { dropzoneStyles, folderLabel } from './styles';

const acceptedFiles = '.mp3,audio/*';

// TODO: oh god oh god why oh god
class AudioUpload extends Component {
  state = {
    isUploading: false,
    fileCount: 0,
    folderName: '',
    error: null,
  }

  componentDidMount() {
    const headers = getHeaders();
    this.dropzone = new Dropzone('div#dropzoneEl', {
      url: `${SERVER_URL}/library`,
      headers,
      previewTemplate,
      acceptedFiles,
      autoProcessQueue: false,
      uploadMultiple: true,
    });

    this.dropzone.on('addedfile', this.onAdd);
    this.dropzone.on('removedfile', this.onRemove);
    this.dropzone.on("sendingmultiple", this.onSending);
    this.dropzone.on("successmultiple", this.onSuccess);
    this.dropzone.on("error", this.onError);
  }

  componentWillUnmount() {
    this.dropzone.off('addedfile', this.onAdd);
    this.dropzone.off('removedfile', this.onRemove);
    this.dropzone.off("sendingmultiple", this.onSending);
    this.dropzone.off("successmultiple", this.onSuccess);
    this.dropzone.off("error", this.onError);
  }

  onSending = (file, xhr, data) => {
    const { folderName } = this.state;
    data.append("folderName", folderName);
  }

  onRemove = () => {
    let { fileCount } = this.state;
    fileCount--;
    this.setState({ fileCount });
  }

  onAdd = () => {
    let { fileCount } = this.state;
    fileCount++;
    this.setState({ fileCount });
  }

  onSuccess = files => {
    files.forEach(f => this.dropzone.removeFile(f));
    if(this.dropzone.files.length > 0) {
      this.dropzone.processQueue();
    } else {
      this.props.fetchLibrary();
      this.setState({ isUploading: false });
    }
  }

  onError = error => {
    const message = JSON.parse(error.xhr.response).error
    this.setState({ isUploading: false, error: message });
  }

  onUpload = () => {
    this.dropzone.processQueue();
    this.setState({ isUploading: true, error: null });
  }

  onClear = () => {
    this.dropzone.files.forEach(f => this.dropzone.removeFile(f));
    this.setState({ fileCount: 0 });
  }

  onChange = (e) => {
    this.setState({ folderName: e.target.value });
  }

  render() {
    const { isUploading, fileCount, folderName, error } = this.state;
    const hasNoFiles = fileCount === 0;
    return (
      <div className={cn(p1)}>
        <h3>Upload Audio</h3>
        <div className={cn(flex, spaceBetween, alignItemsCenter, p05)}>
          <label
            className={cn(heavyText, folderLabel)}
            htmlFor="folder"
          >
            Folder Name
          </label>
          <input
            defaultValue={folderName}
            onChange={this.onChange}
            id="folder"
            className={cn(flex2, ml1)}
            type="text"
          />
        </div>
        <div className={cn(flex, spaceBetween, alignItemsCenter, p05)}>
          <button disabled={isUploading} onClick={this.onUpload}>Upload</button>
          <button disabled={isUploading} onClick={this.onClear}>Clear</button>
        </div>

        {isUploading && <div>CURRENTLY UPLOADING</div>}
        {error && <div>Error: {error}</div>}
        <div id="dropzoneEl" className={cn(p1, dropzoneStyles, { flex: hasNoFiles }, { flexCenter: hasNoFiles })}>
          {(hasNoFiles) && <span>Drop files, or click here</span>}
        </div>
      </div>
    );
  }
}

export default AudioUpload;
