import React, { Component } from 'react';
import './App.css';
import img from './loader.gif'

class App extends Component {
  constructor(props) {
    super(props)
    document.title = "Allan & Jose - CodeBreaker"
    this.state = {
      number : '',
      response: false,
      type: false,
      message: ''
    }
    this.setNumber = this.setNumber.bind(this)
    this.send = this.send.bind(this)
  }
  setNumber(e){
    this.setState({number: e.target.value})
  }
  send(e){
    e.preventDefault()
    this.setState({loader: true})
    let that = this
    fetch('http://localhost:3000/?number='+this.state.number, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(function (response) {
      return response.json()
    })
    .then(function (response) {
    // Checks if there's and error. If not, redirect to /
      that.setState({
        loader: false
      })
      if(response.type !== 0){
        that.setState({
          response: true,
          message:response.message
        })
      } else {
        that.setState({
          response: true,
          message:response.message,
          type: false
        })
      }
    })
  }
  render() {
    return (
      <div>
      {
        this.state.loader ? (
          <div style={{height: '100vh', width: '100vw', position: 'absolute', 'zIndex': '10'}}>
            <div style={{margin: 'auto', width: '10%', marginTop: '25%'}}>
              <img src={img} alt="loader" style={{'width': '100%'}} />
            </div>
          </div>) : (null)
      }
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to CodeBreaker</h1>
          </header>
          <div className="form">
            <p className="App-intro">
              To get started, type a number.
            </p>
            <form>
              <input type='text' value={this.state.number} onChange={(e) => this.setNumber(e)} name='number' placeholder='Number'/>
              <button onClick={(e) => this.send(e)}>
                Send
              </button>
            </form>
            {
              this.state.response ? (
                <div>
                <hr/>
                {
                  this.state.type ? (
                    <p>Error: {this.state.message}</p>
                  ) : (
                    <p>Result: {this.state.message}</p>
                  )
                }
                </div>
              ):
              (null)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
