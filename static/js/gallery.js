var BoardsContainer = React.createClass({
  render: function() {
    var numRows = Object.keys(this.props.colors);
    var rows = [];
    var _this = this;
    _.each(numRows, function(row) {
      rows.push(<Row colors={_this.props.colors[row]} />);
    });
    return(<div>{rows}</div>);
  }
})

var Row = React.createClass({
  render: function() {
    var numTiles = Object.keys(this.props.colors);
    var tiles = [];
    var _this = this;
    _.each(numTiles, function(tile) {
      tiles.push(<Tile color={_this.props.colors[tile]} />)
    });
    return(<div className="board-row">{tiles}</div>);
  }
});

var Tile = React.createClass({
  render: function() {
    var style = {backgroundColor: this.props.color};
    return(<div className="tile" style={style}>&nbsp;</div>);
  }
})
