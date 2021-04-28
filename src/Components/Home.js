import React from "react";
import axios from "axios";

import MediasList from "./MediasList";
import SearchInput from "./SearchInput";
import SeeDetailsModal from "./SeeDetailsModal";

class Home extends React.Component {
  state = {
    search: "",
    seriesList: [],
    moviesList: [],
    genericList: [],
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
          search: "",
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
    if (this.state.location !== "searchList") {
      this.handleDelete();
    }
    let includes = false;
    switch (event.target.name) {
      case "toWatch":
        this.state.toWatchList.forEach((movie) => {
          if (movie.id === this.state.currentlySelected.id) {
            includes = true;
          }
        });
        if (!includes) {
          this.setState({
            toWatchList: [
              ...this.state.toWatchList,
              this.state.currentlySelected,
            ],
          });
          includes = false;
        }
        this.handleClose();
        break;
      case "waiting":
        this.state.waitingNewSeasonList.forEach((movie) => {
          if (movie.id === this.state.currentlySelected.id) {
            includes = true;
          }
        });
        if (!includes) {
          this.setState({
            waitingNewSeasonList: [
              ...this.state.waitingNewSeasonList,
              this.state.currentlySelected,
            ],
          });
          includes = false;
        }
        this.handleClose();
        break;
      case "watched":
        this.state.watchedList.forEach((movie) => {
          if (movie.id === this.state.currentlySelected.id) {
            includes = true;
          }
        });
        if (!includes) {
          this.setState({
            watchedList: [
              ...this.state.watchedList,
              this.state.currentlySelected,
            ],
          });
          includes = false;
        }
        this.handleClose();
        break;
      // case "delete":
      //   this.handleDelete();
      //   break;
    }
  };

  handleDelete = () => {
    switch (this.state.location) {
      case "toWatchList":
        let newToWatchList = this.state.toWatchList.filter(
          (movie) => movie.id !== this.state.currentlySelected.id
        );
        this.setState({ toWatchList: newToWatchList });
        break;
      case "watchedList":
        let newWatchedList = this.state.watchedList.filter(
          (movie) => movie.id !== this.state.currentlySelected.id
        );
        this.setState({ watchedList: newWatchedList });
        break;
      case "waitingNewSeasonList":
        let newWaitingNewSeasonList = this.state.waitingNewSeasonList.filter(
          (movie) => movie.id !== this.state.currentlySelected.id
        );
        this.setState({ waitingNewSeasonList: newWaitingNewSeasonList });
        break;
    }
    this.handleClose();
  };

  render() {
    console.log(this.state.currentlySelected);
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
        <div className="container-fluid movie-app">
          <MediasList
            location="searchSeries"
            contentList={this.state.seriesList}
            handleShow={this.handleShow}
            listTitle="Series"
          />
          <MediasList
            location="searchMovies"
            contentList={this.state.moviesList}
            handleShow={this.handleShow}
            listTitle="Movies and Documentaries"
          />
          <MediasList
            location="toWatchList"
            contentList={this.state.toWatchList}
            handleShow={this.handleShow}
            listTitle="Want To Watch"
          />
          <MediasList
            location="waitingNewSeasonList"
            contentList={this.state.waitingNewSeasonList}
            handleShow={this.handleShow}
            listTitle="Waiting New Season"
          />
          <MediasList
            location="watchedList"
            contentList={this.state.watchedList}
            handleShow={this.handleShow}
            listTitle="Already Watched"
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
