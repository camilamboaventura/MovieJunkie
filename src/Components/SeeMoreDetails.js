import { Component } from "react";
import axios from "axios";

// When the user clicks to see more details through one of the modal buttons, the Browser Router will idenfy the modification in the url and redirect the user to see this component.
// Show more details that weren't displayed in the modal.

class SeeMoreDetails extends Component {
  state = {
    mediaDetails: {},
    cast: [],
  };

  // In the first boot will send a request to the API accordingly with the params inherited from the Route path stablished
  componentDidMount = async () => {
    try {
      if (this.props.match.params.location === "searchMovies") {
        const moviesResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=125c6992a7675d6c3e35696ea71a8c59`
        );
        const moviesCreditsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${this.props.match.params.id}/credits?api_key=125c6992a7675d6c3e35696ea71a8c59`
        );
        this.setState({
          mediaDetails: { ...moviesResponse.data },
          cast: [...moviesCreditsResponse.data.cast],
        });
      } else {
        const seriesResponse = await axios.get(
          `https://api.themoviedb.org/3/tv/${this.props.match.params.id}?api_key=125c6992a7675d6c3e35696ea71a8c59`
        );
        const seriesCreditResponse = await axios.get(
          `https://api.themoviedb.org/3/tv/${this.props.match.params.id}/credits?api_key=125c6992a7675d6c3e35696ea71a8c59`
        );

        console.log(seriesResponse.data);
        this.setState({
          mediaDetails: { ...seriesResponse.data },
          cast: [...seriesCreditResponse.data.cast],
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    // console.log(this.state.cast)
    return (
      <div className="container mt-5">
        <div className="row d-flex justify-content-evenly">
          <div className="col-8">
            <div>
              <h1 className="title">
                <strong>
                  {this.state.mediaDetails.title
                    ? this.state.mediaDetails.title
                    : this.state.mediaDetails.name}
                </strong>
              </h1>
              {this.state.mediaDetails.tagline !== undefined ? (
                <span className="tagline">
                  {this.state.mediaDetails.tagline}
                </span>
              ) : null}
            </div>

            <p className="overview">{this.state.mediaDetails.overview}</p>

            <div className="container">
              <div className="row">
                <h5 className="col-3">Genre</h5>
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
                  <h5 className="col-3">Duration</h5>
                  <div className="col-3">
                    {this.state.mediaDetails.runtime} min
                  </div>
                </div>
              ) : null}
             

              <div className="row info">
                <h5 className="col-3">Movie score</h5>
                <div className="col-3">
                  ★ {this.state.mediaDetails.vote_average}
                </div>
              </div>
              <div className="row">
                <h5 className="col-3">Audio languages</h5>
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
        <div className="container mt-5">
          <h3>Cast</h3>
          <div className="row d-flex justify-content-around">
            {this.state.cast
              .filter((c) => c.profile_path !== null)
              .slice(0, 8)
              .map((character, idx) => {
                return (
                  <div key={idx} className="card" style={{ width: "8rem" }}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${character.profile_path}`}
                      className="card-img-top"
                      alt="cast"
                    />
                    <div className="card-body">
                      <p className="card-text" style={{ color: "black" }}>
                        <strong>{character.name}</strong> as{" "}
                        {character.character}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default SeeMoreDetails;
