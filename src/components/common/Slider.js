import React, {Component} from 'react';

class Slider extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: this.props.value,
    }
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
    this.props.handleChange(this.state.value);
  }

  render(){
    return(
      <div>
        <label>
          <input
            type="range"
            min="0" max="20"
            value={this.state.value}
            onChange={this.handleChange}
            step="1"
          />
          {this.state.value}
        </label>
      </div>
    );
  }
}

export default Slider;
