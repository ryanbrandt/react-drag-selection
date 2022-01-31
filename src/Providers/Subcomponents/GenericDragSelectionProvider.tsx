import { PropsWithChildren, createElement } from "react";

import { BaseDragSelectionProviderProps } from "@src/Providers/types";

type Props = PropsWithChildren<BaseDragSelectionProviderProps>;

const GenericDragSelectionProvider: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const { as, className, children } = props;

  return createElement(as, { className }, children);
};

export default GenericDragSelectionProvider;
