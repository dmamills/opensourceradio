import React, { Component } from 'react';
import cn from 'classnames';
import { flex, justifyEnd, m05 } from '../../styles';

class MetadataActions extends Component {

  renderButtons = () => {
    const { isEditing } = this.props;
    if(isEditing) {
      return (<>
        <button onClick={this.props.save}>Save</button>
        <button onClick={this.props.cancel}>Cancel</button>
      </>);
    }

    return (<>
      <button onClick={this.delete}>Delete</button>
      <button onClick={this.props.edit}>Edit</button>
    </>)
  }

  delete = () => {
    const { selectedFile } = this.props;
    if(!selectedFile) return;
    if(window.confirm(`Delete ${selectedFile}?`)) {
      console.log('delete: ', selectedFile);
    }
  }

  render() {
    return (
      <div className={cn(flex, justifyEnd, m05)}>
        {this.renderButtons()}
      </div>
    );
  }
}

export default MetadataActions;