import { PropsWithChildren } from "react";

export type BaseDragSelectionElementProps = PropsWithChildren<{
  onSelection: () => void;
  as: keyof HTMLElementTagNameMap;
  className?: string;
  disabled?: boolean;
}>;
