import {
  createElement,
  PropsWithChildren,
  FunctionComponent,
  Context,
} from "react";

interface BaseProps {
  dragSelectionContext: Context<boolean>;
  dragSelectionEnabled: boolean;
  as: keyof HTMLElementTagNameMap;
  className?: string;
}

export type Props = PropsWithChildren<BaseProps>;

const DragSelectionContainer: FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const {
    dragSelectionContext: DragSelectionContext,
    dragSelectionEnabled,
    as,
    className,
    children,
  } = props;

  return createElement(
    as,
    { className },
    <DragSelectionContext.Provider value={dragSelectionEnabled}>
      {children}
    </DragSelectionContext.Provider>
  );
};

export default DragSelectionContainer;
