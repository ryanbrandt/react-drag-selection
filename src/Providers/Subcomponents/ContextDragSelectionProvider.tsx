import { Context, PropsWithChildren } from "react";

import { BaseDragSelectionProviderProps } from "@src/Providers/types";
import GenericDragSelectionProvider from "@src/Providers/Subcomponents/GenericDragSelectionProvider";

export type ExtendingProps = PropsWithChildren<{
  dragSelectionEnabled: boolean;
  context: Context<boolean>;
}>;

type Props = BaseDragSelectionProviderProps & ExtendingProps;

const ContextDragSelectionProvider: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const {
    context: DragSelectionContext,
    dragSelectionEnabled,
    children,
    ...rest
  } = props;

  return (
    <GenericDragSelectionProvider {...rest}>
      <DragSelectionContext.Provider value={dragSelectionEnabled}>
        {children}
      </DragSelectionContext.Provider>
    </GenericDragSelectionProvider>
  );
};

export default ContextDragSelectionProvider;
