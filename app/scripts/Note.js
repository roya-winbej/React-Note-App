var _ = require('lodash');

var Note = React.createClass({

  //events
  edit: function () {
    this.setState({
      editing: true
    });
  },
  save: function () {
    this.props.onChange(this.refs.inputText.getDOMNode().value, this.props.index);
    this.setState({
      editing: false
    });
  },
  destroy: function () {
    this.props.onRemove(this.props.index);
  },
  //default state
  getInitialState: function () {
    return {
      editing: false
    };
  },
  componentWillMount: function () {
    this.styles = {
      right: _.random(0, window.innerWidth - 170) + "px",
      top: _.random(0, window.innerHeight - 150) + "px",
      transform: "rotate(" + _.random(-15, 15) + "deg)"
    }
  },
  componentDidMount: function () {
    var a = 1;
    $(this.getDOMNode()).draggable({
      start: function() { $(this).css("z-index", a++); },
      stop: function () {$(this).css("z-index", 1 )}
    });

  },

  //templates
  editTpl: function () {
    return (
      <div className="note lime accent-2" style={this.styles}>
        <textarea ref="inputText" defaultValue={this.props.children} className="form-control"></textarea>
        <button onClick={this.save} className="waves-effect waves-light btn green right"><i className="material-icons">done</i></button>
      </div>
    );
  },
  basicTpl: function () {
    return (
      <div  className="note lime accent-2" style={this.styles}>
        <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit}
                            className="waves-effect waves-light btn" ><i className="material-icons">settings</i></button>
                    <button onClick={this.destroy}
                            className="waves-effect waves-light btn red"><i className="material-icons">delete</i></button>
                </span>
      </div>
    );
  },
  render: function() {
    if (this.state.editing) {
      return this.editTpl();
    }else {
      return this.basicTpl();
    }
  }
});

module.exports = Note;
