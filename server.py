from flask import Flask, request, render_template
import os
import model

app = Flask(__name__)

@app.route("/")
def index():
  return render_template("board.html")

@app.route("/save_board", methods=["POST"])
def save_board():
  colors = request.json
  new_board = model.Boards(colors=colors)
  model.session.add(new_board)
  model.session.commit()
  return render_template("board.html")

@app.route("/gallery")
def gallery():
  boards = model.session.query(model.Boards).all()
  return render_template("gallery.html", boards=boards)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, port=port)