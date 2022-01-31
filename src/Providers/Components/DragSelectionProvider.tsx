import { FunctionComponent } from "react";

import { Either } from "@src/types";
import { BaseDragSelectionProviderProps } from "@src/Providers/types";
import ContextDragSelectionProvider, {
  ExtendingProps as ContextProviderProps,
} from "@src/Providers/Subcomponents/ContextDragSelectionProvider";
import RenderDragSelectionProvider, {
  DragSelectionProviderRender,
  ExtendingProps as RenderProviderProps,
} from "@src/Providers/Subcomponents/RenderDragSelectionProvider";

type Props = BaseDragSelectionProviderProps &
  Either<RenderProviderProps, ContextProviderProps>;

const DragSelectionProvider: FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const { dragSelectionEnabled, render, context, children, ...rest } = props;

  if (context) {
    return (
      <ContextDragSelectionProvider
        context={context}
        dragSelectionEnabled={dragSelectionEnabled as boolean}
        {...rest}
      >
        {children}
      </ContextDragSelectionProvider>
    );
  }

  return (
    <RenderDragSelectionProvider
      render={render as DragSelectionProviderRender}
      {...rest}
    />
  );
};

export default DragSelectionProvider;
