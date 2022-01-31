import { FunctionComponent, useContext } from "react";

import { BaseDragSelectionElementProps } from "@src/Elements/types";
import GenericDragSelectionElement from "@src/Elements/Subcomponents/GenericDragSelectionElement";

export interface ExtendingProps {
  context: React.Context<boolean>;
}

type Props = BaseDragSelectionElementProps & ExtendingProps;

const ContextDragSelectionElement: FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const { context, children, ...rest } = props;
  const dragSelectionEnabled = useContext(context);

  return (
    <GenericDragSelectionElement
      dragSelectionEnabled={dragSelectionEnabled}
      {...rest}
    >
      {children}
    </GenericDragSelectionElement>
  );
};

export default ContextDragSelectionElement;
