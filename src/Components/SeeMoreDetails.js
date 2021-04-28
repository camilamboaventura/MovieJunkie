import { Component } from "react";
import axios from "axios";

class SeeMoreDetails extends Component {
  state = {
    mediaDetails: {},
  };

  componentDidMount = async () => {
    console.log(this.props.match.params);
    try {
      if (this.props.match.params.location === "searchMovies") {
        const moviesResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=125c6992a7675d6c3e35696ea71a8c59`
        );
        this.setState({ mediaDetails: { ...moviesResponse.data } });
      } else {
        const seriesResponse = await axios.get(
          `https://api.themoviedb.org/3/tv/${this.props.match.params.id}?api_key=125c6992a7675d6c3e35696ea71a8c59`
        );
        this.setState({ mediaDetails: { ...seriesResponse.data } });
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    console.log(this.state.mediaDetails);
    return (
      <div>
        title:{" "}
        {this.state.mediaDetails.title
          ? this.state.mediaDetails.title
          : this.state.mediaDetails.name}
      </div>
    );
  }
}

export default SeeMoreDetails;
