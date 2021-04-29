import React from "react";

// As a functional component it receives through props the list of the content to be rendered
function MediasList(props) {
  if (props.contentList.length !== 0) {
    return (
      <>
        <h4>{props.listTitle}</h4>
        <div className="row">
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
      </>
    );
  } else {
    return null;
  }
}

export default MediasList;
