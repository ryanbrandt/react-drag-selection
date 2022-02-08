import {
  createElement,
  PropsWithChildren,
  useContext,
  Context,
  FunctionComponent,
} from "react";

interface BaseProps {
  /**
   * A void function to handle the selection of the element when it is drag selected
   */
  onSelection: () => void;

  /**
   * An HTMLElement tag to render the element as
   */
  as: keyof HTMLElementTagNameMap;

  /**
   * The element's drag selection container context which is used to inform whether
   * the onSelection should be fired when the element is moused over
   */
  dragSelectionContext: Context<boolean>;

  /**
   * An optional CSS classname to apply to the element
   */
  className?: string;

  /**
   * An optional overriding disabled flag to apply to the element which prevents the
   * onSelection from ever firing regardless of the context
   */
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
