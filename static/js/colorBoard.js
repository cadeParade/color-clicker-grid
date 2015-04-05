var initialColor = "#ffffff";

var BoardContainer = React.createClass({
  getInitialState: function() {
    return{
      numRows: this.props.numRows,
      numCols: this.props.numCols
    };
  },
  regenerateBoard: function(newNumRows, newNumCols) {
    this.setState({
      numRows: newNumRows,
      numCols: newNumCols
    });
  },
  resetColors: function() {
    _.each($(".tile"), function(tile){$(tile).css("background-color", initialColor)});
  },

  saveColors: function() {
    var states = {};
    _.each($(".board-row"), function(row, i) {
      states[i] = {};
      _.each($(row).children(), function(tile, j) {
        states[i][j] = $(tile).css('background-color');
      });
    });
    $.ajax({
      type : "POST",
      url : "/save_board",
      data: JSON.stringify(states),
      contentType: 'application/json;charset=UTF-8',
      success: function(result) {
        window.location ="/gallery";
      }
    });
  },

  render: function() {
    return(
      <div>
        <p className="container">
          Click the boxes to change colors.
          <br />
          Click a box again to return it to white.
          <br />
          Click 'Save Board' to put your board in the gallery
          <br />
          Click 'Reset Colors' to return all boxes to white.
          <br />
          Enter new dimensions and click 'Regenerate Board' to change the board dimensions.
          <br />
          It is recommended that you enter fewer than 45 columns and you enter numbers.
        </p>
        <div className="col-md-2">
          <DimensionForm regenerateBoard={this.regenerateBoard} />
          <button onClick={this.saveColors} className="board-btn btn btn-success">Save board</button>
          <br />
          <button onClick={this.resetColors} className="board-btn btn btn-warning">Reset Colors</button>
        </div>
        <div className="col-md-10">
          <div className="container">
          <TileBoard numRows={this.state.numRows} numCols={this.state.numCols} />
          </div>
        </div>
      </div>
    );
  }
});

var DimensionForm = React.createClass({
  getInitialState: function() {
    return({
      rowForm: 5,
      colForm: 5
    });
  },

  regenerateBoard: function() {
    this.props.regenerateBoard(this.state.rowForm, this.state.colForm);
  },

  handleRowChange: function(event) {
    this.setState({rowForm: event.target.value});
  },

  handleColChange: function(event) {
    this.setState({colForm: event.target.value});
  },

  render: function() {
    return(
      <div className="dimension-form">
        <div className="input-group inputs">
          <span className="input-group-addon row-col-form"># Rows</span>
          <input type="text" className="form-control" placeholder="5" onChange={this.handleRowChange} />
        </div>
        <div className="input-group inputs">
          <span className="input-group-addon row-col-form"># Cols</span>
          <input type="text" className="form-control" placeholder="5" onChange={this.handleColChange} />
        </div>
        <button className="btn btn-default" onClick={this.regenerateBoard}>Regenerate board</button>
      </div>
    );
  }
});


var TileBoard = React.createClass({
  render: function() {
    var rows = [];
    var _this = this;
    _.range(this.props.numRows).forEach(function(num){
      rows.push(<TileRow numCols={_this.props.numCols} />);
    });
    return(<div>{rows}</div>);
  }
});


var TileRow = React.createClass({
  render: function() {
    var tiles = [];
    _.range(this.props.numCols).forEach(function(num) {
      tiles.push(<Tile />);
    });
    return(<div className="board-row">{tiles}</div>);
  }
});


var Tile = React.createClass({
  getInitialState: function() {
    return {color: initialColor};
  },

  generateRandomNumberWithLeadingZero: function() {
    var num = _.random(255).toString(16);
    return num.length < 2 ? "0" + num : num;
  },

  generateRandomHexColor: function() {
    return [
      "#",
      this.generateRandomNumberWithLeadingZero(),
      this.generateRandomNumberWithLeadingZero(),
      this.generateRandomNumberWithLeadingZero() 
    ].join("");
  },

  handleClick: function() {
    if(this.state.color === initialColor) {
      this.setState({color: this.generateRandomHexColor()});
    } else {
      this.setState({color: initialColor});
    }
  },

  render: function() {
    var style = {backgroundColor: this.state.color};
    return(<div className="tile noselect" style={style} onClick={this.handleClick}>&nbsp;</div>);
  }
});


var board = React.render(
  <BoardContainer numCols={5} numRows={5} />,
  document.getElementById('board-container')
);
