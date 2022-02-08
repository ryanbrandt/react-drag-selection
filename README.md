# react-drag-selection

A hooks-based React library for implementing drag-to-select user interfaces

## Usage

This library consists of three basic components which can be used as the foundation for implementing a custom drag selection UI.

### `DragSelectionContainer`

This container is the most basic drag selection implementation.

All control over the enabling/disabling of the drag selection tree is left to you.

This container should be used if you need to implement a drag selection UI which is not click-and-drag.

```tsx
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
```

### `ClickDragSelectionContainer`

This container composes with the bare-bones `DragSelectionContainer` to enable and disable the drag selection tree as a user mouses down and out.

When a user is moused down within the tree, this component automatically enables the drag selection context allowing a user to select or deselect elements.

When a user is not moused down within the tree, this component automatically disables the drag selection context allowing a user to mouse over
without selecting or deselecting any elements.

This container should be used for implementing any click-and-drag-selection UI.

You will note that the props match that of the `DragSelectionContainer` sans `dragSelectionEnabled`, as that prop is managed directly by this component as a user mouses down and out.

```tsx
type Props = Omit<DragSelectionContainerProps, "dragSelectionEnabled">;
```

### `DragSelectionElement`

This component must **always** appear further down the tree from the drag selection container.

When nested within a drag selection container, this element will automatically fire its `onSelection` when it is drag-selected upon.

```tsx
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
```

## Example Usage

### With `DragSelectionContainer`

```tsx
const SelectionContext = createContext(false);

const MyComponent = () => {
    const [selectionEnabled, setSelectionEnabled] = useState(false);

    ...

    return (
        <DragSelectionContainer dragSelectionContext={SelectionContext} dragSelectionEnabled={selectionEnabled}>
            <MySubcomponent />
        </DragSelectionContainer>
    )
};

const MySubcomponent = () => {
    const MY_ITEMS = ["1", "2", "3"];

    ...

    return <>MY_ITEMS.map(item => (
        <DragSelectionElement onSelection={() => doSomething(item)} dragSelectionContext={SelectionContext}>
            <div>Item {item}</div>
        </DragSelectionElement>
    ))</>
}
```

### With `ClickDragSelectionContainer`

```tsx
const SelectionContext = createContext(false);

const MyComponent = () => {
    ...

    return (
        <ClickDragSelectionContainer dragSelectionContext={SelectionContext}>
            <MySubcomponent />
        </ClickDragSelectionContainer>
    )
};

const MySubcomponent = () => {
    const MY_ITEMS = ["1", "2", "3"];

    ...

    return <>MY_ITEMS.map(item => (
        <DragSelectionElement onSelection={() => doSomething(item)} dragSelectionContext={SelectionContext}>
            <div>Item {item}</div>
        </DragSelectionElement>
    ))</>
}
```
