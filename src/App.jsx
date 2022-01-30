import React, { Component } from 'react';
import { BsGearFill, BsX, BsGithub, BsCheck } from 'react-icons/bs';
import { colorToText } from './utils/functions';
import MatrixRain from './models/MatrixRain';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matrixRain: null,
      settings: {
        red: 0,
        green: 255,
        blue: 0,
        random: false
      },
      showSettings: false
    };
  }
  toggleSettings() {
    this.setState({ showSettings: !this.state.showSettings });
  }
  componentDidMount() {
    this.setState({
      matrixRain: new MatrixRain({
        element: document.getElementById("canvas"),
        width: window.innerWidth,
        height: window.innerHeight,
        charList: [
          '0','1','2','3','4','5','6','7','8','9',
          'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
          '+','-','*','=','<','>',':','.',
          'ﾊ','ﾐ','ﾋ','ｰ','ｳ','ｼ','ﾅ','ﾓ','ﾆ','ｻ','ﾜ','ﾂ','ｵ','ﾘ','ｱ','ﾎ','ﾃ','ﾏ','ｹ','ﾒ','ｴ','ｶ','ｷ','ﾑ','ﾕ','ﾗ','ｾ','ﾈ','ｽ','ﾀ','ﾇ','ﾍ'
        ],
        red: this.state.settings.red, 
        green: this.state.settings.green, 
        blue: this.state.settings.blue,
        randomColors: this.state.settings.random
      })
    });
    window.addEventListener("resize", () => {
      this.state.matrixRain.setCanvasDimensions(window.innerWidth, window.innerHeight);
    });
  }
  render() {
    return (
      <div className="container">
        <canvas id="canvas"></canvas>
        {
          this.state.showSettings ?
          <>
            <div className="settings">
              {['red', 'green', 'blue'].map((color) =>
                <div key={`f-${color}`} className="field">
                  <label key={`l-${color}`}>{color}</label>
                  <input type="text" value={this.state.settings[color]} key={`i-${color}`} onChange={(e) => this.setState((state) => {
                    if (e.target.value.match(/\D/) == null) {
                      let val = parseInt(e.target.value) || 0;
                      state.settings[color] = val;
                      state.matrixRain.color[color] = Math.min(Math.max(val, 0), 255);
                      return { settings: state.settings, matrixRain: state.matrixRain };
                    }
                  })} />
                </div>
              )}
              <div className="field">
                <label>random</label>
                <button className="checkbox" onClick={() => this.setState((state) => {
                  state.settings.random = !state.settings.random;
                  state.matrixRain.randomColors = state.settings.random;
                  return { settings: state.settings, matrixRain: state.matrixRain };
                })}>{
                  this.state.settings.random ? <BsCheck size="40" color={colorToText(0, 255, 0)} /> : null
                }</button>
              </div>
            </div>
            <button onClick={() => this.toggleSettings()} className="btn btn-settings">
              <BsX size="40" />
            </button>
          </>
          :
          <button onClick={() => this.toggleSettings()} className="btn btn-settings">
            <BsGearFill size="30" />
          </button>
        }
        <button onClick={() => window.location = "https://github.com/jordanbkatz/matrixrain"} className="btn btn-repo">
          <BsGithub size="30" />
        </button>
      </div>
    );
  }
}