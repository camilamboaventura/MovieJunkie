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
    console.log("Show media details: ");
    console.log(this.state.mediaDetails);
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-8">
            <h3>
              <strong>
                {this.state.mediaDetails.title
                  ? this.state.mediaDetails.title
                  : this.state.mediaDetails.name}
              </strong>
            </h3>
            <p className="">{this.state.mediaDetails.overview}</p>
            <div className="container">
              <div className="row">
                <div className="col-2">Genre</div>
                <div className="d-inline-flex col-2">
                  {this.state.mediaDetails.genres !== undefined
                    ? this.state.mediaDetails.genres.map((genre) => {
                        return <span key={genre.id}>{genre.name}  </span>;
                      })
                    : null}
                </div>
              </div>
              <div className="row"></div>
              <div className="row"></div>
            </div>
          </div>
          <div className="col-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${this.state.mediaDetails.poster_path}`}
              style={{ height: "500px" }}
              alt="poster"
            ></img>
          </div>
        </div>
      </div>
    );
  }
}

export default SeeMoreDetails;
