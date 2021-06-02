import moviesDataReducer, { MoviesDataState } from "./movies-data.slice";

describe("movies reducer", () => {
  it("should append comment", () => {
    const mockState: MoviesDataState = {
      movies: [
        {
          id: 12121,
          medium_cover_image: "",
          comments: [],
          title: "",
          synopsis: "",
          genres: [],
        },
      ],
      totalCountOfMovies: 0,
      isLoading: "idle",
    };

    expect(
      moviesDataReducer(mockState, {
        type: "moviesData/appendComment",
        payload: { movieId: 12121, content: "hello" },
      })
    ).toEqual({
      movies: [
        {
          id: 12121,
          medium_cover_image: "",
          comments: [{ id: 1, content: "hello" }],
          title: "",
          synopsis: "",
          genres: [],
        },
      ],
      totalCountOfMovies: 0,
      isLoading: "idle",
    });
  });

  it("shouldn't append comment if movie id is not found", () => {
    const mockState: MoviesDataState = {
      movies: [
        {
          id: 12121,
          medium_cover_image: "",
          comments: [],
          title: "",
          synopsis: "",
          genres: [],
        },
      ],
      totalCountOfMovies: 0,
      isLoading: "idle",
    };

    expect(
      moviesDataReducer(mockState, {
        type: "moviesData/appendComment",
        payload: { movieId: -3232232, content: "hello" },
      })
    ).toEqual({
      movies: [
        {
          id: 12121,
          medium_cover_image: "",
          comments: [],
          title: "",
          synopsis: "",
          genres: [],
        },
      ],
      totalCountOfMovies: 0,
      isLoading: "idle",
    });
  });

  it("should delete comment", () => {
    const mockState: MoviesDataState = {
      movies: [
        {
          id: 12121,
          medium_cover_image: "",
          comments: [{ id: 1, content: "hello" }],
          title: "",
          synopsis: "",
          genres: [],
        },
      ],
      totalCountOfMovies: 0,
      isLoading: "idle",
    };

    expect(
      moviesDataReducer(mockState, {
        type: "moviesData/deleteComment",
        payload: { movieId: 12121, commentId: 1 },
      })
    ).toEqual({
      movies: [
        {
          id: 12121,
          medium_cover_image: "",
          comments: [],
          title: "",
          synopsis: "",
          genres: [],
        },
      ],
      totalCountOfMovies: 0,
      isLoading: "idle",
    });
  });

  it("shouldn't delete comment if movie is not found", () => {
    const mockState: MoviesDataState = {
      movies: [
        {
          id: 12121,
          medium_cover_image: "",
          comments: [{ id: 1, content: "hello" }],
          title: "",
          synopsis: "",
          genres: [],
        },
      ],
      totalCountOfMovies: 0,
      isLoading: "idle",
    };

    expect(
      moviesDataReducer(mockState, {
        type: "moviesData/deleteComment",
        payload: { movieId: -12121, commentId: 1 },
      })
    ).toEqual({
      movies: [
        {
          id: 12121,
          medium_cover_image: "",
          comments: [{ id: 1, content: "hello" }],
          title: "",
          synopsis: "",
          genres: [],
        },
      ],
      totalCountOfMovies: 0,
      isLoading: "idle",
    });
  });

  it("shouldn't delete comment if comment is not found", () => {
    const mockState: MoviesDataState = {
      movies: [
        {
          id: 12121,
          medium_cover_image: "",
          comments: [{ id: 1, content: "hello" }],
          title: "",
          synopsis: "",
          genres: [],
        },
      ],
      totalCountOfMovies: 0,
      isLoading: "idle",
    };

    expect(
      moviesDataReducer(mockState, {
        type: "moviesData/deleteComment",
        payload: { movieId: 12121, commentId: -3321 },
      })
    ).toEqual({
      movies: [
        {
          id: 12121,
          medium_cover_image: "",
          comments: [{ id: 1, content: "hello" }],
          title: "",
          synopsis: "",
          genres: [],
        },
      ],
      totalCountOfMovies: 0,
      isLoading: "idle",
    });
  });

  it("should add movies to state, populate comments, end loading and set total count of movies", () => {
    const mockState: MoviesDataState = {
      movies: [],
      totalCountOfMovies: 0,
      isLoading: "loading",
    };

    expect(
      moviesDataReducer(mockState, {
        type: "moviesData/fetchMoviesDataStatus/fulfilled",
        payload: {
          movie_count: 5,
          movies: [
            {
              id: 3,
              title: "",
              genres: [],
              synopsis: "",
              medium_cover_image: "",
            },
          ],
        },
      })
    ).toEqual({
      movies: [
        {
          id: 3,
          medium_cover_image: "",
          comments: [],
          title: "",
          synopsis: "",
          genres: [],
        },
      ],
      totalCountOfMovies: 5,
      isLoading: "idle",
    });
  });

  it("should end loading and save error in state", () => {
    const mockState: MoviesDataState = {
      movies: [],
      totalCountOfMovies: 0,
      isLoading: "loading",
    };

    const ERROR = new Error("Something went wrong");

    expect(
      moviesDataReducer(mockState, {
        type: "moviesData/fetchMoviesDataStatus/rejected",
        payload: ERROR,
      })
    ).toEqual({
      movies: [],
      totalCountOfMovies: 0,
      isLoading: "idle",
      error: ERROR,
    });
  });

  it("should set loading", () => {
    const mockState: MoviesDataState = {
      movies: [],
      totalCountOfMovies: 0,
      isLoading: "idle",
    };

    expect(
      moviesDataReducer(mockState, {
        type: "moviesData/fetchMoviesDataStatus/pending",
      })
    ).toEqual({
      movies: [],
      totalCountOfMovies: 0,
      isLoading: "loading",
    });
  });
});
