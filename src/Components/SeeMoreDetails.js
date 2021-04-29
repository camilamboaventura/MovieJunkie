import { Component } from "react";
import axios from "axios";

class SeeMoreDetails extends Component {
  state = {
    mediaDetails: {},
    cast: [],
  };

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
        
        console.log(seriesCreditResponse.data.cast);
        this.setState({
          mediaDetails: { ...seriesResponse.data },
          cast: [...seriesCreditResponse.data.cast]
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    // console.log(this.state.cast)
    return (
      <div>
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
                            (language) => {
                              return <li> {language.english_name} </li>;
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
                style={{ height: "500px" }}
                alt="poster"
              ></img>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <h3>Casting</h3>
          <div className="row d-flex justify-content-around">
          {this.state.cast.filter((c) => c.profile_path !== null).slice(0, 7).map((character) => {
              return (
                <div className="card" style={{ width: "10rem" }}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${character.profile_path}`}
                    className="card-img-top"
                    alt="cast image"
                  />
                  <div className="card-body">
                    <p className="card-text" style={{ color: "black" }}>
                      <strong>{character.name}</strong> as {character.character}
                    </p>
                  </div>
                </div>
              )}
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SeeMoreDetails;
