import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("Header", () => {
  test("renders correctly", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const pageHeading = screen.getByRole("heading", { level: 2 });
    expect(pageHeading).toBeInTheDocument();

    const listItemProducts = screen.getByRole("link", { name: "Products" });
    expect(listItemProducts).toBeInTheDocument();

    const listItemOrders = screen.getByRole("link", { name: "Orders" });
    expect(listItemOrders).toBeInTheDocument();

    const listItemCart = screen.getByRole("link", { name: "Cart cart 0" });
    expect(listItemCart).toBeInTheDocument();

    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();

    const cartImage = screen.getByAltText("cart");
    expect(cartImage).toBeInTheDocument();
  });

  test("links work properly", async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const listItemOrders = screen.getByRole("link", { name: "Orders" });
    act(() => {
      userEvent.click(listItemOrders);
    })
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();

    const listItemCart = screen.getByRole("link", { name: "Cart cart 0" });
    act(() => {
      userEvent.click(listItemCart);
    })
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });
});
