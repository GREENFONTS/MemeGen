import React, { Component } from "react";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "https://i.imgflip.com/1bij.jpg",
      allmemeTags: [],
    };
    this.handlechange = this.handlechange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        this.setState({ allmemeTags: memes });
      });
  }
  handlechange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const Rand = Math.floor(Math.random() * this.state.allmemeTags.length);
    const RandImg = this.state.allmemeTags[Rand].url;
    this.setState({
      randomImg: RandImg,
    });
  }
  render() {
    return (
      <div className="container mt-3">
        <div className="row mb-3">
          <div className="col-12 col-md-8 m-auto">
            <header className=" container bg-info p-3">
              <h1 className="text-center ">Meme Generator</h1>
            </header>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-8 m-auto">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>TopText:</label>
                <input
                  type="text"
                  value={this.state.topText}
                  name="topText"
                  placeholder="topText"
                  className="form-control"
                  onChange={this.handlechange}
                  id="Name"
                />
              </div>

              <div className="form-group">
                <label>BottomText:</label>
                <input
                  type="text"
                  value={this.state.bottomText}
                  name="bottomText"
                  placeholder="bottomText"
                  className="form-control"
                  onChange={this.handlechange}
                  id="Name"
                />
              </div>
              <span>
                <button className="btn btn-default bg-info" id="button">
                  Generate
                </button>
              </span>
            </form>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-md-8 m-auto">
            <div className="container" id="meme">
              <img src={this.state.randomImg} alt="Meme failed to Load" />
              <h1 className="text-center">{this.state.topText}</h1>
              <h2>{this.state.bottomText}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
