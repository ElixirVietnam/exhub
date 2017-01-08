import React, {Component, PropTypes} from 'react';


class PanelFooter extends Component {

  render() {
    const { children } = this.props;

    return (
      <div className="panel-footer">
		<div className="row">
		  <div className="col-md-8 col-md-offset-2">
			<div className="btn-toolbar">
			  {children}
			</div>
		  </div>
		</div>
      </div>
    );
  }

}

export default PanelFooter;
