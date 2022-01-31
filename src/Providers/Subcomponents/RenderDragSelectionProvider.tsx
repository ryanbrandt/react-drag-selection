import { BaseDragSelectionProviderProps } from "@src/Providers/types";
import GenericDragSelectionProvider from "@src/Providers/Subcomponents/GenericDragSelectionProvider";

export type DragSelectionProviderRender = () => React.ReactElement;

export interface ExtendingProps {
  render: DragSelectionProviderRender;
}

type Props = BaseDragSelectionProviderProps & ExtendingProps;

const RenderDragSelectionProvider: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const { render, ...rest } = props;

  return (
    <GenericDragSelectionProvider {...rest}>
      {render()}
    </GenericDragSelectionProvider>
  );
};

export default RenderDragSelectionProvider;
