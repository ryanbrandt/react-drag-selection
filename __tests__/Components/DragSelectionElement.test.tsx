import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";

import DragSelectionElement from "@src/Components/DragSelectionElement";

describe("DragSelectionElement", () => {
  const MockContext = React.createContext(true);

  const MOCK_ON_SELECTION = jest.fn();

  const createElementSpy = jest.spyOn(React, "createElement");
  const MOCK_CREATE_ELEMENT_TEST_ID = "createElementResult";
  createElementSpy.mockReturnValue(
    <div data-testid={MOCK_CREATE_ELEMENT_TEST_ID} />
  );

  const useContextSpy = jest.spyOn(React, "useContext");

  it("returns an element of the specified type with the provided className, children and onSelection applied", () => {
    const MOCK_AS = "div";
    const MOCK_CLASS_NAME = "class";
    const MOCK_CHILDREN = <p>children</p>;

    useContextSpy.mockReturnValue(true);

    render(
      <DragSelectionElement
        as={MOCK_AS}
        dragSelectionContext={MockContext}
        onSelection={MOCK_ON_SELECTION}
        className={MOCK_CLASS_NAME}
      >
        {MOCK_CHILDREN}
      </DragSelectionElement>
    );

    expect(screen.getByTestId(MOCK_CREATE_ELEMENT_TEST_ID)).toBeInTheDocument();
    expect(createElementSpy).toHaveBeenCalledWith(
      MOCK_AS,
      {
        onMouseDown: MOCK_ON_SELECTION,
        onMouseOver: MOCK_ON_SELECTION,
        className: MOCK_CLASS_NAME,
      },
      MOCK_CHILDREN
    );
  });

  describe("when selection context is false", () => {
    it("does not create the element with an onMouseDown or onMouseOver handler", () => {
      const MOCK_AS = "div";
      useContextSpy.mockReturnValue(false);

      render(
        <DragSelectionElement
          as={MOCK_AS}
          dragSelectionContext={MockContext}
          onSelection={MOCK_ON_SELECTION}
        />
      );

      expect(
        screen.getByTestId(MOCK_CREATE_ELEMENT_TEST_ID)
      ).toBeInTheDocument();
      expect(createElementSpy).toHaveBeenCalledWith(
        MOCK_AS,
        {
          onMouseDown: undefined,
          onMouseOver: undefined,
        },
        undefined
      );
    });
  });

  describe("when disabled is true", () => {
    it("does not create the element with an onMouseDown or onMouseOver handler", () => {
      const MOCK_AS = "div";
      useContextSpy.mockReturnValue(true);

      render(
        <DragSelectionElement
          as={MOCK_AS}
          dragSelectionContext={MockContext}
          onSelection={MOCK_ON_SELECTION}
          disabled
        />
      );

      expect(
        screen.getByTestId(MOCK_CREATE_ELEMENT_TEST_ID)
      ).toBeInTheDocument();
      expect(createElementSpy).toHaveBeenCalledWith(
        MOCK_AS,
        {
          onMouseDown: undefined,
          onMouseOver: undefined,
        },
        undefined
      );
    });
  });
});
