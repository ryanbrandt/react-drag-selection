import { FunctionComponent, useState, createContext } from "react";

import DragSelectionProvider from "@src/Providers/Components/DragSelectionProvider";
import DragSelectionElement from "@src/Elements/Components/DragSelectionElement";

const DragSelectionContext = createContext(false);

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
        enabled={dragSelectionEnabled}
        context={DragSelectionContext}
      >
        {elements.map((element) => (
          <DragSelectionElement
            key={element}
            as="div"
            context={DragSelectionContext}
            onSelection={() => handleElementSelection(element)}
          >
            <div>{element}</div>
          </DragSelectionElement>
        ))}
      </DragSelectionProvider>
    </div>
  );
};

export default ClickAndDragSelection;
