import { useState, FunctionComponent } from "react";

import DragSelectionContainer, {
  Props as DragSelectionContainerProps,
} from "@src/Components/DragSelectionContainer";

type Props = Omit<DragSelectionContainerProps, "dragSelectionEnabled">;

/**
 * A drag selection container which handles the enabling/disabling of
 * the drag selection tree based on if a user is moused down within
 * the tree
 */
const ClickDragSelectionContainer: FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const [dragSelectionEabled, setDragSelectionEnabled] = useState(false);

  const { children, ...rest } = props;

  return (
    <div
      onMouseDown={() => setDragSelectionEnabled(true)}
      onMouseUp={() => setDragSelectionEnabled(false)}
    >
      <DragSelectionContainer
        dragSelectionEnabled={dragSelectionEabled}
        {...rest}
      >
        {children}
      </DragSelectionContainer>
    </div>
  );
};

export default ClickDragSelectionContainer;
