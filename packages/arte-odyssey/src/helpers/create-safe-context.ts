import { type Context, createContext, use } from 'react';

type CreateSafeContextReturn<T> = readonly [Context<T | null>, () => T];

export const createSafeContext = <T>(
  errorMessage: string,
): CreateSafeContextReturn<T> => {
  const Context = createContext<T | null>(null);

  const useSafeContext = (): T => {
    const value = use(Context);
    if (value === null) {
      throw new Error(errorMessage);
    }
    return value;
  };

  return [Context, useSafeContext] as const;
};
