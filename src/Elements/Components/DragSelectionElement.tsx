import { FunctionComponent } from "react";

import { Either } from "@src/types";
import { BaseDragSelectionElementProps } from "@src/Elements/types";
import GenericDragSelectionElement, {
  ExtendingProps as GenericDragSelectionElementProps,
} from "@src/Elements/Subcomponents/GenericDragSelectionElement";
import ContextDragSelectionElement, {
  ExtendingProps as ContextDragSelectionElementProps,
} from "@src/Elements/Subcomponents/ContextDragSelectionElement";

type Props = BaseDragSelectionElementProps &
  Either<GenericDragSelectionElementProps, ContextDragSelectionElementProps>;

const DragSelectionElement: FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const { context, dragSelectionEnabled, children, ...rest } = props;

  if (context) {
    return (
      <ContextDragSelectionElement context={context} {...rest}>
        {children}
      </ContextDragSelectionElement>
    );
  }

  return (
    <GenericDragSelectionElement
      dragSelectionEnabled={dragSelectionEnabled as boolean}
      {...rest}
    >
      {children}
    </GenericDragSelectionElement>
  );
};

export default DragSelectionElement;
