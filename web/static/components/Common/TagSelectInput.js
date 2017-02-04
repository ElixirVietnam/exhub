import React, {Component, PropTypes} from 'react';

import Multiselect from 'react-widgets/lib/Multiselect';


class TagSelectInput extends Component {

  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string)
  }

  constructor(props) {
    super(props);
    this.state = {
      data: props.tags,
      value: []
    };
  }

  createNewTag(tagName) {
    const name = tagName.toLowerCase();
    const data = this.state.data.concat(name);
    const value = this.state.value.concat(name);
    this.setState({ value, data });
  }

  render() {
    return  (
      <Multiselect
          ref="input"
          data={this.state.data}
          value={this.state.value}
          onCreate={this.createNewTag.bind(this)}
          onChange={value => this.setState({ value })} />
    );
  }
}

export default TagSelectInput;
