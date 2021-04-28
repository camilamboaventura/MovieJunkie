import { Component } from "react";
import axios from "axios";

class SeeMoreDetails extends Component {
  state = {
    mediaDetails: {},
    
  };

  componentDidMount = async () => {
      console.log(this.props.match.params.id)
    try {
      const moviesResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=125c6992a7675d6c3e35696ea71a8c59`
      );
      const seriesResponse = await axios.get(
        `https://api.themoviedb.org/3/tv/${this.props.match.params.id}?api_key=125c6992a7675d6c3e35696ea71a8c59`
      );
      const finalResponse = moviesResponse ? moviesResponse : seriesResponse
      console.log(finalResponse.data)
      this.setState({ mediaDetails: { ...finalResponse.data } });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return <div>Details</div>;
  }
}

export default SeeMoreDetails;
