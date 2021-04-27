import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

import MoviesList from "./MoviesList";
import SearchInput from "./SearchInput";
import SeeDetailsModal from "./SeeDetailsModal";

class Home extends React.Component {
  state = {
    search: "",
    seriesList: [],
    moviesList: [],
    toWatchList: [],
    watchedList: [],
    waitingNewSeasonList: [],
    modalShow: false,
    currentlySelected: {},
    location: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async () => {
    try {
      if (this.state.search) {
        const seriesResponse = await axios.get(
          `https://api.themoviedb.org/3/search/tv?api_key=125c6992a7675d6c3e35696ea71a8c59&query=${this.state.search}`
        );
        const moviesResponse = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=125c6992a7675d6c3e35696ea71a8c59&query=${this.state.search}`
        );

        this.setState({
          seriesList: [...seriesResponse.data.results],
          moviesList: [...moviesResponse.data.results],
        });
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
    }
  };

  handleClose = () => {
    this.setState({
      modalShow: false,
      currentlySelected: {},
    });
  };

  handleShow = (movie, contentLocation) => {
    this.setState({
      modalShow: true,
      currentlySelected: { ...movie },
      location: contentLocation,
    });
  };

  handleButtonModal = (event) => {
    switch (event.target.name) {
      case "toWatch":
        let includes1 = false;
        this.state.toWatchList.forEach((movie) => {
          if (movie.id === this.state.currentlySelected.id) {
            includes1 = true;
          }
        });
        if (!includes1) {
          this.setState({
            toWatchList: [
              ...this.state.toWatchList,
              this.state.currentlySelected,
            ],
          });
        }

        break;
      case "waiting":
        let includes2 = false;
        this.state.waitingNewSeasonList.forEach((movie) => {
          if (movie.id === this.state.currentlySelected.id) {
            includes2 = true;
          }
        });
        if (!includes2) {
          this.setState({
            waitingNewSeasonList: [
              ...this.state.waitingNewSeasonList,
              this.state.currentlySelected,
            ],
          });
        }
        break;
      case "watched":
        let includes3 = false;
        this.state.watchedList.forEach((movie) => {
          if (movie.id === this.state.currentlySelected.id) {
            includes3 = true;
          }
        });
        if (!includes3) {
          this.setState({
            watchedList: [
              ...this.state.watchedList,
              this.state.currentlySelected,
            ],
          });
        }
        break;
      case "delete":
        this.handleDelete();
        console.log(this.state.location);
        console.log(this.state.currentlySelected.id);
        break;
    }
  };

  handleDelete = () => {};

  render() {
    return (
      <div className="container-fluid">
        <h3>Search</h3>
        <SearchInput
          type="text"
          placeHolder="Search title"
          ariaLabel="Text input search"
          name="search"
          value={this.state.search}
          handleChange={this.handleChange}
          handleClick={this.handleSubmit}
        />
        {/* <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search title"
            aria-label="Text input search"
            name="search"
            onChange={this.handleChange}
            value={this.state.search}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="searchSubmitButton"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div> */}
        <div className="container-fluid movie-app">
          <MoviesList
            location="searchList"
            contentList={this.state.seriesList}
            handleShow={this.handleShow}
            listTitle="Series"
          />
          <MoviesList
            location="searchList"
            contentList={this.state.moviesList}
            handleShow={this.handleShow}
            listTitle="Movies"
          />
          <MoviesList
            location="toWatchList"
            contentList={this.state.toWatchList}
            handleShow={this.handleShow}
            listTitle="To Watch"
          />
          <MoviesList
            location="waitingNewSeasonList"
            contentList={this.state.waitingNewSeasonList}
            handleShow={this.handleShow}
            listTitle="Waiting New Season"
          />
          <MoviesList
            location="watchedList"
            contentList={this.state.watchedList}
            handleShow={this.handleShow}
            listTitle="Watched"
          />
        </div>
        {/* Modal */}
        <SeeDetailsModal
          show={this.state.modalShow}
          onHide={() => this.handleClose()}
          currentlySelected={this.state.currentlySelected}
          location={this.state.location}
          handleButtonModal={this.handleButtonModal}
        />
      </div>
    );
  }
}

export default Home;
