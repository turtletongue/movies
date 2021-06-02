import paginationReducer, { PaginationState } from "./pagination.slice";

describe("pagination reducer", () => {
  const mockState: PaginationState = {
    currentPage: 1,
  };

  it("should change current page", () => {
    expect(
      paginationReducer(mockState, {
        type: "pagination/changeCurrentPage",
        payload: 2,
      })
    ).toEqual({
      currentPage: 2,
    });
  });
});
