import { FunctionComponent, useState } from "react";

import DragSelectionProvider from "@src/Providers/Components/DragSelectionProvider";
import DragSelectionElement from "@src/Elements/Components/DragSelectionElement";

const ClickAndDragSelection: FunctionComponent = (): JSX.Element => {
  const [dragSelectionEnabled, setDragSelectionEnabled] = useState(false);

  const elements = ["Element 1", "Element 2", "Element 3"];

  const handleElementSelection = (element: string) => {
    console.log(`${element} was selected`);
  };

  return (
    <div
      onMouseDown={() => setDragSelectionEnabled(true)}
      onMouseUp={() => setDragSelectionEnabled(false)}
    >
      <DragSelectionProvider
        as="div"
        render={() => (
          <>
            {elements.map((element) => (
              <DragSelectionElement
                key={element}
                as="div"
                dragSelectionEnabled={dragSelectionEnabled}
                onSelection={() => handleElementSelection(element)}
              >
                <div>{element}</div>
              </DragSelectionElement>
            ))}
          </>
        )}
      />
    </div>
  );
};

export default ClickAndDragSelection;
