# react-drag-selection

A React library for implementing drag-to-select user interfaces

## Usage

Some common usecase examples can be found under the `examples/` directory

This library provides two components which serve as the building blocks for implementing drag selection

The `DragSelectionProvider` component serves as a container which creates and controls the enabling or disabling of a drag selection tree

The `DragSelectionElement` component serves as a wrapper, which integrates any of your subcomponents or other JSX into the drag selection tree created by the provider

These components are both overloaded such that drag selection can be provided and consumed using two different approaches:

1. Context
2. Render prop

### Context Approach

[React context](https://reactjs.org/docs/context.html) is a useful tool for passing props down the component hierarchy without needless prop-drilling

In this approach, a boolean context must be created and passed to the provider alongside the `dragSelectionEnabledProp`

The provider will provide the context, which will be informed by the value of `dragSelectionEnabledProp`

Downstream in the component hierarchy, you can render instances of `DragSelectionElement` with the same context prop passed to your provider to integrate them into the drag selection tree

```tsx
const SomeDragSelectionContext = createContext(true);

const SomeComponent = () => {
    const [dragSelectionEnabled, setDragSelectionEnabled] = useState(true);

    ...

    return (
        ...
        <DragSelectionProvider
            as="div"
            context={SomeDragSelectionContest}
            dragSelectionEnabled={dragSelectionEnabled}
        />
            {items.map(item => (
                    <DragSelectionElement
                        key={item.key}
                        as="span"
                        context={SomeDragSelectionContext}
                        onSelection={() => handleSelection(item)}
                    >
                        {item.content}
                    </DragSelectionElement>
            ))}
        </DragSelectionProvider>
        ...
    )
}
```

### Render Prop Approach

[Render props](https://reactjs.org/docs/render-props.html) were a very common design pattern before the introduction of hooks

Since the introduction of hooks, render props have widely been replaced by hooks and in many cases may be preferred

However, depedening on your use case, you may prefer or find this method simpler than the hooks and context approach

```tsx
const SomeComponent = () => {
    const [dragSelectionEnabled, setDragSelectionEnabled] = useState(true);

    ...

    return (
        ...
        <DragSelectionProvider
            as="div"
            render={() => (
                items.map(item => (
                    <DragSelectionElement
                        key={item.key}
                        as="span"
                        dragSelectionEnabled={dragSelectionEnabled}
                        onSelection={() => handleSelection(item)}
                    >
                        {item.content}
                    </DragSelectionElement>
                ))
            )}
        />
        ...
    )
}
```
