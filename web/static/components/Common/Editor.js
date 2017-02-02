import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import Markdown from 'react-remarkable';


class Editor extends Component {

  static propTypes = {
    title: PropTypes.string
  }

  constructor() {
    super();
    this.state = {
      content: ""
    };
  }

  handlePreviewClick() {
    const content = this.refs.content.value;
    this.setState({
      content: content
    });
  }

  render() {
    const { content } = this.state;

    return  (
      <div className="panel">
  			<div className="panel-heading">
  				<h2>{this.props.title}</h2>
          <div className="options">
            <ul className="nav nav-tabs">
              <li className="active"><a href="#write" data-toggle="tab">Write</a></li>
              <li>
                <a href="#preview" data-toggle="tab" onClick={this.handlePreviewClick.bind(this)}>Preview</a>
              </li>
            </ul>
  				</div>
  			</div>
        <div className="panel panel-body">
          <div className="tab-content">
            <div className="tab-pane active" id="write">
              <div className="form-group">
                <textarea
                    placeholder="Your thought in markdown format..."
                    style={{resize: "vertical", width: "100%", height: "200px"}}
                    ref="content">
                </textarea>
              </div>
            </div>
            <div className="tab-pane" id="preview" style={{minHeight: "200px"}}>
              <div className="form-group">
                <Markdown source={content} />
              </div>
            </div>
          </div>
          <div className="panel-footer">
            <div className="pull-right">
              <a href="#" className="btn btn-primary">Reply</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
