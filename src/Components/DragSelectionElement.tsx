import {
  createElement,
  PropsWithChildren,
  useContext,
  Context,
  FunctionComponent,
} from "react";

interface BaseProps {
  onSelection: () => void;
  as: keyof HTMLElementTagNameMap;
  dragSelectionContext: Context<boolean>;
  className?: string;
  disabled?: boolean;
}

type Props = PropsWithChildren<BaseProps>;

const DragSelectionElement: FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const {
    as,
    onSelection,
    dragSelectionContext,
    className,
    children,
    disabled,
  } = props;
  const selectionEnabled = useContext(dragSelectionContext);

  let onSelectionHandler: typeof onSelection | undefined;
  if (selectionEnabled && !disabled) {
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

export default DragSelectionElement;
