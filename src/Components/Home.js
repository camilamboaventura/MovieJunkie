import React from "react";
import axios from "axios";

import MediasList from "./MediasList";
import SearchInput from "./SearchInput";
import SeeDetailsModal from "./SeeDetailsModal";

import logoPicture from "../Images/Logo.png";

class Home extends React.Component {
  state = {
    search: "vikings",
    seriesList: [],
    moviesList: [],
    toWatchList: [],
    watchedList: [],
    waitingNewSeasonList: [],
    modalShow: false,
    currentlySelected: {},
    location: "",
  };

  //Provides the first request from the API in the first boot of the app
  componentDidMount = async () => {
    if (this.props.match.params.userId) {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/MovieJunkie/${this.props.match.params.userId}`
        );
        this.setState({
          toWatchList: [...response.data.toWatchList],
          watchedList: [...response.data.watchedList],
          waitingNewSeasonList: [...response.data.waitingNewSeasonList],
        });
      } catch (err) {
        console.error(err);
      }
    }
    this.handleSubmit();
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      prevState.toWatchList.length !== this.state.toWatchList.length ||
      prevState.watchedList.length !== this.state.watchedList.length ||
      prevState.waitingNewSeasonList.length !==
        this.state.waitingNewSeasonList.length
    ) {
      if (this.props.match.params.id) {
        try {
          await axios.put(
            `https://ironrest.herokuapp.com/MovieJunkie/${this.props.match.params.userId}`,
            {
              toWatchList: this.state.toWatchList,
              watchedList: this.state.watchedList,
              waitingNewSeasonList: this.state.waitingNewSeasonList,
            }
          );
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  //Triggered by modifications in the search input, this method provides that the attribute search from the state keeps lined up with the value from the search input
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Whenever the user click the submit button, it will send a request to the API containing the title typed in the search input. It will also set the seriesList and moviesList from the state in order to match with the updated response from the API.
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

  // Whenever a media is clicked this method will be called to show the modal containing the media's info and buttons for media management
  handleShow = (movie, contentLocation) => {
    this.setState({
      modalShow: true,
      currentlySelected: { ...movie },
      location: contentLocation,
    });
  };

  //Close the modal and reset the currently selected item to an empty object
  handleClose = () => {
    this.setState({
      modalShow: false,
      currentlySelected: {},
    });
  };

  // Whenever any of the 5 possibles buttons of the modal is clicked, this method will be called and perform the due action, removing the item from the previous location and sending it to the asked one.
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
      default:
        break;
    }
  };

  // Whenever the button delete is clicked, this method will be called.
  handleDelete = () => {
    // The switch bellow check the location of the media clicked and remove this from the respective list
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
      default:
        break;
    }
    this.handleClose();
  };

  render() {
    return (
      <div className="container-fluid" style={{ paddingBottom: "100px" }}>
        <div className="logo">
          <img src={logoPicture} className="logo-picture" alt="Logo" />
          <h2>Movie Junkie</h2>
          {/* Search Input */}
          <SearchInput
            type="text"
            placeHolder="Search a title"
            ariaLabel="Text input search"
            name="search"
            value={this.state.search}
            handleChange={this.handleChange}
            handleClick={this.handleSubmit}
          />
        </div>
        {/* Contains all the lists shown in the home-screen */}
        <div className="container-fluid movie-app">
          {/* Series found List */}
          <MediasList
            location="searchSeries"
            contentList={this.state.seriesList}
            handleShow={this.handleShow}
            listTitle="Series"
          />
          {/* Movies found List */}
          <MediasList
            location="searchMovies"
            contentList={this.state.moviesList}
            handleShow={this.handleShow}
            listTitle="Movies and Documentaries"
          />
          {/* Want to watch List */}
          <MediasList
            location="toWatchList"
            contentList={this.state.toWatchList}
            handleShow={this.handleShow}
            listTitle="Want To Watch"
          />
          {/* Waiting new season List */}
          <MediasList
            location="waitingNewSeasonList"
            contentList={this.state.waitingNewSeasonList}
            handleShow={this.handleShow}
            listTitle="Waiting New Season and Currently Watching"
          />
          {/* Already watched List */}
          <MediasList
            location="watchedList"
            contentList={this.state.watchedList}
            handleShow={this.handleShow}
            listTitle="Already Watched"
          />
        </div>
        {/* See details Modal */}
        <SeeDetailsModal
          show={this.state.modalShow}
          onHide={() => this.handleClose()}
          currentlySelected={this.state.currentlySelected}
          location={this.state.location}
          handleButtonModal={this.handleButtonModal}
          userId={this.props.match.params.id}
        />
      </div>
    );
  }
}

export default Home;
