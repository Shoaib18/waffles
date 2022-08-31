/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createContext, useContext } from 'react';

type SliderContextValue = {
  value: number[];
  min: number;
  max: number;
  disabled: boolean;
  inverted: boolean;
};

const SliderContext = createContext<SliderContextValue>(undefined!);

type SliderProviderProps = {
  children: React.ReactNode;
} & SliderContextValue;

function SliderProvider({ children, ...value }: SliderProviderProps) {
  return (
    <SliderContext.Provider value={value}>{children}</SliderContext.Provider>
  );
}

function useSlider() {
  const context = useContext(SliderContext);

  if (context === undefined) {
    throw new Error('Make sure to wrap useSlider with a SliderProvider.');
  }

  return context;
}

export { SliderProvider, useSlider };
