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
    currentlySelected: {},
    modalShow: false,
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

  handleShow = (movie) => {
    this.setState({
      modalShow: true,
      currentlySelected: { ...movie },
    });
  };

  handleButtonModal = (event) => {
    switch (event.target.name) {
      case "toWatch":
        if(!this.state.toWatchList.includes(this.state.currentlySelected)) {
          this.setState({
            toWatchList: [
              ...this.state.toWatchList,
              this.state.currentlySelected,
            ],
          });
        }

        break;
      case "waiting":
        if(!this.state.waitingNewSeasonList.includes(this.state.currentlySelected)) { 
          this.setState({
            waitingNewSeasonList: [
              ...this.state.waitingNewSeasonList,
              this.state.currentlySelected,
            ],
          });
        }
        
        break;
      case "watched":
        if(!this.state.watchedList.includes(this.state.currentlySelected)) {
          this.setState({
            watchedList: [
              ...this.state.watchedList,
              this.state.currentlySelected,
            ],
          });
        }
     
        break;
    }
  };

  render() {
    console.log(this.state)
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
            contentList={this.state.seriesList}
            handleShow={this.handleShow}
            listTitle="Series"
          />
          <MoviesList
            contentList={this.state.moviesList}
            handleShow={this.handleShow}
            listTitle="Movies"
          />
          <MoviesList
            contentList={this.state.toWatchList}
            handleShow={this.handleShow}
            listTitle="To Watch"
          />
          <MoviesList
            contentList={this.state.waitingNewSeasonList}
            handleShow={this.handleShow}
            listTitle="Waiting New Season"
          />
          <MoviesList
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
          handleButtonModal={this.handleButtonModal}
        />
      </div>
    );
  }
}

export default Home;
