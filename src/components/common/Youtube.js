import React, { Component } from 'react';

class Youtube extends Component{
  constructor(props){
    super(props);
    this.state = {
      video: this.props.video,
      fullurl: `https://www.youtube.com/embed/${this.props.video}?autoplay=0&rel=0&modestbranding=1`
    }
  }

  render(){
    return(
      <div style={styles.videoStyle}>
        <iframe
          type="text/html"
          width="100%"
          height="100%"
          src={this.state.fullurl}
          frameborder="0"
        />
      </div>
    );
  }
}

const styles = {
  videoStyle:{
    height:"400px",
    width:"600px",
  }
}

export default Youtube;
