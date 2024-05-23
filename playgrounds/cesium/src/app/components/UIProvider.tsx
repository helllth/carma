import React, { ReactNode, createContext, FC, useState } from 'react';

type UIComponentProviderProps = {
  children: ReactNode;
};

type Slot = 'bottomLeft' | 'topRight' | 'bottomRight';

export const UIComponentContext = createContext<{
  components: Record<Slot, ReactNode[]>;
  addComponent: (slot: Slot, component: ReactNode) => void;
  removeComponent: (slot: Slot, component: ReactNode) => void;
}>({
  components: {
    bottomLeft: [],
    topRight: [],
    bottomRight: [],
  },
  addComponent: () => {},
  removeComponent: () => {},
});

export const UIComponentProvider: FC<UIComponentProviderProps> = ({
  children,
}) => {
  const [componentStacks, setComponentStacks] = useState<
    Record<Slot, ReactNode[]>
  >({
    bottomLeft: [],
    topRight: [],
    bottomRight: [],
  });

  const addComponent = (slot: Slot, component: ReactNode) => {
    setComponentStacks((prevStacks) => {
      // Check if the component already exists in the slot
      if (!prevStacks[slot].includes(component)) {
        return {
          ...prevStacks,
          [slot]: [...prevStacks[slot], component],
        };
      }
      // If the component already exists, return the previous state
      return prevStacks;
    });
  };

  const removeComponent = (slot: Slot, component: ReactNode) => {
    setComponentStacks((prevStacks) => ({
      ...prevStacks,
      [slot]: prevStacks[slot].filter((item) => item !== component),
    }));
  };

  return (
    <UIComponentContext.Provider
      value={{ components: componentStacks, addComponent, removeComponent }}
    >
      {children}
    </UIComponentContext.Provider>
  );
};
