var Note = require('./Note');

var Board = React.createClass({
  getInitialState: function () {
    return {
      notes: []
    };
  },
  nextId: function () {
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  },
  update: function (inputText, i) {
    var arr = this.state.notes;
    arr[i].note = inputText;
    this.setState({
      notes: arr
    });
  },
  removeNote: function (i) {
    var arr = this.state.notes;
    arr.splice(i, 1);
    this.setState({
      notes: arr
    });
  },
  eachNote: function (note, i) {
    return (
      <Note key={note.id}
            index={i}
            onChange={this.update}
            onRemove={this.removeNote}>{note.note}</Note>
    );
  },
  addNote: function (newNote) {
    var arr = this.state.notes;
    arr.push({
      id: this.nextId(),
      note: newNote
    });
    this.setState({
      notes: arr
    });
  },
  render: function() {
    var notes = this.state.notes.map(this.eachNote);
    return (
      <div className="board blue lighten-4">
        {notes}
        <button onClick={this.addNote.bind(null, "Add new Note")} className=" right btn-custom btn-floating btn-large waves-effect waves-light green"><i className="material-icons">add</i></button>
      </div>
    );
  }
});

module.exports = Board;