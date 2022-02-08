import {
  createElement,
  PropsWithChildren,
  FunctionComponent,
  Context,
} from "react";

interface BaseProps {
  /**
   * A boolean React context which will indicate the enabled/disabled
   * state of the drag selection tree
   */
  dragSelectionContext: Context<boolean>;

  /**
   * A boolean flag, which informs the provided dragSelectionContext
   *
   * @see dragSelectionContext
   */
  dragSelectionEnabled: boolean;

  /**
   * An optional HTMLElement tagname to render the container as
   *
   * Defaults to "div"
   */
  as?: keyof HTMLElementTagNameMap;

  /**
   * An optional CSS classname to apply to the container
   */
  className?: string;
}

export type Props = PropsWithChildren<BaseProps>;

/**
 * A bare-bones drag selection wrapper which can be used to create
 * a functional drag selection tree when composed with DragSelectionElements
 */
const DragSelectionContainer: FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const {
    dragSelectionContext: DragSelectionContext,
    dragSelectionEnabled,
    className,
    children,
    as = "div",
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
