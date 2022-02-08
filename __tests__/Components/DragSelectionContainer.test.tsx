import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { createContext } from "react";

import DragSelectionContainer from "@src/Components/DragSelectionContainer";

describe("DragSelectionContainer", () => {
  const MockContext = createContext(false);

  it("renders the provided context provider with the provided value and children", () => {
    const MOCK_VALUE = true;
    const MOCK_CHILD_TEST_ID = "child";

    let actualValue: boolean | undefined;
    const mockChild = (
      <MockContext.Consumer>
        {(value) => {
          actualValue = value;
          return <div data-testid={MOCK_CHILD_TEST_ID} />;
        }}
      </MockContext.Consumer>
    );

    render(
      <DragSelectionContainer
        dragSelectionContext={MockContext}
        dragSelectionEnabled
      >
        {mockChild}
      </DragSelectionContainer>
    );

    const child = screen.getByTestId(MOCK_CHILD_TEST_ID);

    expect(child).toBeInTheDocument();
    expect(child.parentElement).toBeInstanceOf(HTMLDivElement);
    expect(actualValue).toBe(MOCK_VALUE);
  });

  describe("when className is provided", () => {
    it("applies the provided className", () => {
      const mockClassName = "className";

      const { container } = render(
        <DragSelectionContainer
          className={mockClassName}
          dragSelectionContext={MockContext}
          dragSelectionEnabled
        >
          <p>hi</p>
        </DragSelectionContainer>
      );

      expect(container.firstChild).toHaveClass(mockClassName);
    });
  });

  describe("when as is provided", () => {
    it("applies the provided tag", () => {
      const { container } = render(
        <DragSelectionContainer
          as="a"
          dragSelectionContext={MockContext}
          dragSelectionEnabled
        >
          <p>hi</p>
        </DragSelectionContainer>
      );

      expect(container.firstChild).toBeInstanceOf(HTMLAnchorElement);
    });
  });
});
