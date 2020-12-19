import { cleanup, render, screen } from "@testing-library/react";
import Visualization from "../visualization";

// Unit testing
afterEach(cleanup);
test("renders learn react link", () => {
  render(<Visualization />);
  const linkElement = screen.getByText(/Hello User /i);
  expect(linkElement).toBeInTheDocument();
});
