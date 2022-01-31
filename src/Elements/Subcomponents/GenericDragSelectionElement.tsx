import { createElement, FunctionComponent } from "react";

import { BaseDragSelectionElementProps } from "@src/Elements/types";

export interface ExtendingProps {
  dragSelectionEnabled: boolean;
}

type Props = BaseDragSelectionElementProps & ExtendingProps;

const GenericDragSelectionElement: FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const {
    as,
    onSelection,
    dragSelectionEnabled,
    className,
    children,
    disabled,
  } = props;

  let onSelectionHandler: typeof onSelection | undefined;
  if (dragSelectionEnabled && !disabled) {
    onSelectionHandler = onSelection;
  }

  return createElement(
    as,
    {
      onMouseDown: onSelectionHandler,
      onMouseOver: onSelectionHandler,
      className,
    },
    children
  );
};

export default GenericDragSelectionElement;
