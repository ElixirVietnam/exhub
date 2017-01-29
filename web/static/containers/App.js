import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Common/Header';
import TagCloud from '../components/Common/TagCloud';


class App extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  renderContent() {
    return (
      <div className="page-content" style={{paddingTop: "100px"}}>
        <div className="container" style={{paddingTop: "50px"}}>
        	<div className="row blog">
            {this.props.children}
        		<div className="col-md-3 hidden-xs">
              <TagCloud tags={this.props.tags} />
        		</div>
        	</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="wrapper">
        <Header />
        {this.renderContent()}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
};

function mapStateToProps(state) {
  const {
    auth,
    entities: { users },
  } = state;

  return {
    tags: [
      "elixir",
      "ruby",
      "propgramming",
      "hardcore",
      "algorithm"
    ],
  };
}

export default connect(mapStateToProps, {
})(App);
