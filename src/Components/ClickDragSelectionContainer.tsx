import { useState, FunctionComponent } from "react";

import DragSelectionContainer, {
  Props as DragSelectionContainerProps,
} from "@src/Components/DragSelectionContainer";

type Props = Omit<DragSelectionContainerProps, "dragSelectionEnabled">;

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
