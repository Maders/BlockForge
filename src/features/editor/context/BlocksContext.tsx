import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { BlocksActions, blocksReducer } from './reducer';
import { PERSIST_KEY, INITIAL_BLOCKS_STATE } from '~/features/editor/constatns';
import type { Blocks } from '~/features/editor/interface';

interface BlocksContextType {
  blocks: Blocks;
  dispatch: React.Dispatch<BlocksActions>;
}

const BlocksContext = createContext<BlocksContextType | undefined>(undefined);

export function useBlocks() {
  const context = useContext(BlocksContext);
  if (!context) throw new Error('BlocksContext used outside of its Provider!');

  return context;
}

export function BlocksProvider({ children }: { children: React.ReactNode }) {
  const initialState = useMemo(() => {
    if (typeof window === 'undefined') return INITIAL_BLOCKS_STATE;

    const storedData = localStorage.getItem(PERSIST_KEY);
    return storedData ? JSON.parse(storedData) : INITIAL_BLOCKS_STATE;
  }, []);

  const [blocks, dispatch] = useReducer(blocksReducer, initialState);

  useEffect(() => {
    if (blocks) {
      localStorage.setItem(PERSIST_KEY, JSON.stringify(blocks));
    }
  }, [blocks]);

  return (
    <BlocksContext.Provider value={{ blocks, dispatch }}>
      {children}
    </BlocksContext.Provider>
  );
}
