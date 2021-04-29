import { Component } from "react";
import axios from "axios";

// When the user clicks to see more details through one of the modal buttons, the Browser Router will idenfy the modification in the url and redirect the user to see this component.
// Show more details that weren't displayed in the modal.

class SeeMoreDetails extends Component {
  state = {
    mediaDetails: {},
  };

  // In the first boot will send a request to the API accordingly with the params inherited from the Route path stablished
  componentDidMount = async () => {
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
    return (
      <div className="container mt-5">
        <div className="row d-flex justify-content-evenly">
          <div className="col-8">
            <div>
              <h3 className="title">
                <strong>
                  {this.state.mediaDetails.title
                    ? this.state.mediaDetails.title
                    : this.state.mediaDetails.name}
                </strong>
              </h3>
              {this.state.mediaDetails.tagline !== undefined ? (
                <span className="tagline">
                  {this.state.mediaDetails.tagline}
                </span>
              ) : null}
            </div>

            <p className="overview">{this.state.mediaDetails.overview}</p>

            <div className="container">
              <div className="row">
                <div className="col-3">Genre</div>
                <div className="col-3">
                  <ul className="list-unstyled">
                    {this.state.mediaDetails.genres !== undefined
                      ? this.state.mediaDetails.genres.map((genre) => {
                          return <li key={genre.id}>{genre.name}</li>;
                        })
                      : null}
                  </ul>
                </div>
              </div>
              {this.state.mediaDetails.runtime !== undefined ? (
                <div className="row info">
                  <div className="col-3">Duration</div>
                  <div className="col-3">
                    {this.state.mediaDetails.runtime} min
                  </div>
                </div>
              ) : null}
              <div className="row info">
                <div className="col-3">Movie score</div>
                <div className="col-3">
                  ★ {this.state.mediaDetails.vote_average}
                </div>
              </div>
              <div className="row">
                <div className="col-3">Audio languages</div>
                <div className=" col-3">
                  <ul className="list-unstyled">
                    {this.state.mediaDetails.spoken_languages !== undefined
                      ? this.state.mediaDetails.spoken_languages.map(
                          (language, idx) => {
                            return <li key={idx}> {language.english_name} </li>;
                          }
                        )
                      : null}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <img
              className="image"
              src={`https://image.tmdb.org/t/p/w500${this.state.mediaDetails.poster_path}`}
              style={{ height: "600px" }}
              alt="poster"
            ></img>
          </div>
        </div>
      </div>
    );
  }
}

export default SeeMoreDetails;
