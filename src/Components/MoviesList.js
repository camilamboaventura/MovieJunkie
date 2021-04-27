import React from "react";

function MoviesList(props) {
  if (props.contentList.length !== 0) {
    return (
      <div>
        <h4>{props.listTitle}</h4>
        <div className="row">
          <div className="d-flex justify-content-start">
            {props.contentList.map((movie) => {
              if (movie.poster_path) {
                return (
                  <div
                    className="image-container m-3"
                    onClick={() => props.handleShow(movie, props.location)}
                    key={movie.id}
                  >
                    <img
                      // className="image-container m-3"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      style={{ height: "200px" }}
                      alt="poster"
                    />
                    <div className="overlay d-flex align-items-center justify-content-center">
                      See details
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default MoviesList;
