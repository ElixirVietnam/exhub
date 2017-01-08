import React, {Component, PropTypes} from 'react';


class Loading extends Component {
  render() {
    return  (
      <center>
        <i className="fa fa-spinner fa-pulse" style={{fontSize: 40}} />
      </center>
    );
  }
}

export default Loading;
