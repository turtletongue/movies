import moviesTableReducer, { MoviesTableState } from "./movies-table.slice";

describe("moviesTable reducer", () => {
  it("should change selected movie id", () => {
    const mockState: MoviesTableState = {
      selectedMovieId: -1,
      commentInputText: "",
    };

    expect(
      moviesTableReducer(mockState, {
        type: "moviesTable/changeSelectedMovieId",
        payload: 23,
      })
    ).toEqual({
      selectedMovieId: 23,
      commentInputText: "",
    });
  });

  it("should change comment input text", () => {
    const mockState: MoviesTableState = {
      selectedMovieId: -1,
      commentInputText: "",
    };

    expect(
      moviesTableReducer(mockState, {
        type: "moviesTable/changeCommentInputText",
        payload: "hello",
      })
    ).toEqual({
      selectedMovieId: -1,
      commentInputText: "hello",
    });
  });
});
