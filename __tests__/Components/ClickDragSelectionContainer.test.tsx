import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createContext } from "react";

import DragSelectionContainer from "@src/Components/DragSelectionContainer";
import ClickDragSelectionContainer from "@src/Components/ClickDragSelectionContainer";

jest.mock("@src/Components/DragSelectionContainer");
const MOCK_DRAG_SELECTION_CONTAINER_TEST_ID = "dragSelectionContainer";
const mockedDragSelectionContainer =
  DragSelectionContainer as jest.MockedFunction<typeof DragSelectionContainer>;
mockedDragSelectionContainer.mockImplementation((props) => (
  <div data-testid={MOCK_DRAG_SELECTION_CONTAINER_TEST_ID}>
    {props.children}
  </div>
));

const MOCK_CHILD_TEST_ID = "child";
const MOCK_CHILD = <p data-testid={MOCK_CHILD_TEST_ID}>child</p>;

describe("ClickDragSelectionContainer", () => {
  const MockContext = createContext(false);

  afterEach(() => jest.clearAllMocks());

  it("renders a drag selection container with the provided children", () => {
    const mockProps = {
      dragSelectionContext: MockContext,
      as: undefined,
      className: undefined,
    };

    render(
      <ClickDragSelectionContainer {...mockProps}>
        {MOCK_CHILD}
      </ClickDragSelectionContainer>
    );

    expect(
      screen.getByTestId(MOCK_DRAG_SELECTION_CONTAINER_TEST_ID)
    ).toBeInTheDocument();
    expect(screen.getByTestId(MOCK_CHILD_TEST_ID)).toBeInTheDocument();

    expect(mockedDragSelectionContainer).toHaveBeenCalledTimes(1);
    expect(mockedDragSelectionContainer).toHaveBeenCalledWith(
      expect.objectContaining({
        dragSelectionEnabled: false,
        ...mockProps,
      }),
      expect.anything()
    );
  });

  describe("when a user mouses down within the element", () => {
    it("enables the drag selection context", () => {
      const { container } = render(
        <ClickDragSelectionContainer dragSelectionContext={MockContext}>
          {MOCK_CHILD}
        </ClickDragSelectionContainer>
      );

      expect(mockedDragSelectionContainer).toHaveBeenCalledTimes(1);
      expect(mockedDragSelectionContainer).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          dragSelectionEnabled: false,
        }),
        expect.anything()
      );

      fireEvent.mouseDown(container.firstChild as HTMLElement);

      expect(mockedDragSelectionContainer).toHaveBeenCalledTimes(2);
      expect(mockedDragSelectionContainer).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          dragSelectionEnabled: true,
        }),
        expect.anything()
      );
    });
  });

  describe("when a user mouses up within the element", () => {
    it("disables the drag selection context", () => {
      const { container } = render(
        <ClickDragSelectionContainer dragSelectionContext={MockContext}>
          {MOCK_CHILD}
        </ClickDragSelectionContainer>
      );

      expect(mockedDragSelectionContainer).toHaveBeenCalledTimes(1);
      expect(mockedDragSelectionContainer).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          dragSelectionEnabled: false,
        }),
        expect.anything()
      );

      fireEvent.mouseDown(container.firstChild as HTMLElement);

      expect(mockedDragSelectionContainer).toHaveBeenCalledTimes(2);
      expect(mockedDragSelectionContainer).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          dragSelectionEnabled: true,
        }),
        expect.anything()
      );

      fireEvent.mouseUp(container.firstChild as HTMLElement);

      expect(mockedDragSelectionContainer).toHaveBeenCalledTimes(3);
      expect(mockedDragSelectionContainer).toHaveBeenNthCalledWith(
        3,
        expect.objectContaining({
          dragSelectionEnabled: false,
        }),
        expect.anything()
      );
    });
  });
});
