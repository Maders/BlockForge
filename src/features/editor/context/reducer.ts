import { arrayMove } from '@dnd-kit/sortable';
import {
  Block,
  Blocks,
  ImageBlcok,
  InputBlock,
  TextBlcok,
} from '~/features/editor/interface';
import { INITIAL_BLOCKS_STATE } from '~/features/editor/constatns';
import { prependItemToArray } from '~/lib/utils';

type ActionMap<M extends Record<string, unknown>> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export const ActionType = {
  ADD_IMAGE: 'ADD_IMAGE_BLOCK',
  ADD_TEXT: 'ADD_TEXT_BLOCK',
  ADD_INPUT: 'ADD_INPUT_BLOCK',
  Delete: 'DELETE_BLOCK',
  RESET: 'RESET_BLOCKS',
  REORDER_BLOCKS: 'REORDER_BLOCKS',
  EDIT_INPUT: 'EDIT_INPUT_BLOCK',
  EDIT_IMAGE: 'EDIT_IMAGE_BLOCK',
  EDIT_TEXT: 'EDIT_TEXT_BLOCK',
} as const;

type ID = Block['id'];

type BlocksPayload = {
  [ActionType.ADD_IMAGE]: Omit<ImageBlcok, 'id' | 'type'>;
  [ActionType.ADD_TEXT]: Omit<TextBlcok, 'id' | 'type'>;
  [ActionType.ADD_INPUT]: Omit<InputBlock, 'id' | 'type'>;
  [ActionType.Delete]: {
    id: string;
  };
  [ActionType.RESET]: undefined;
  [ActionType.REORDER_BLOCKS]: {
    currentId: ID;
    targetId: ID;
  };
  [ActionType.EDIT_INPUT]: Omit<InputBlock, 'type'>;
  [ActionType.EDIT_IMAGE]: Omit<ImageBlcok, 'type'>;
  [ActionType.EDIT_TEXT]: Omit<TextBlcok, 'type'>;
};

export type BlocksActions =
  ActionMap<BlocksPayload>[keyof ActionMap<BlocksPayload>];

function generateNextItemNumber(list: string[], pattern: RegExp): string {
  const latestNumber = list.reduce((maxNumber, item) => {
    const match = item.match(pattern);
    if (match) {
      const number = parseInt(match[1]);
      return number > maxNumber ? number : maxNumber;
    }
    return maxNumber;
  }, 0);

  const newNumber = latestNumber + 1;
  return `${newNumber}`;
}

export function blocksReducer(state: Blocks, action: BlocksActions) {
  switch (action.type) {
    case ActionType.ADD_IMAGE: {
      const id =
        'img' +
        generateNextItemNumber(
          state
            .filter((block) => block.type === 'img')
            .map((block) => block.id),
          /^img(\d+)$/
        );

      return prependItemToArray(state, {
        ...action.payload,
        type: 'img',
        id,
      });
    }
    case ActionType.ADD_TEXT: {
      const id =
        'text' +
        generateNextItemNumber(
          state
            .filter((block) => block.type === 'text')
            .map((block) => block.id),
          /^text(\d+)$/
        );

      return prependItemToArray(state, {
        ...action.payload,
        type: 'text',
        id,
      });
    }
    case ActionType.ADD_INPUT: {
      const id =
        'input' +
        generateNextItemNumber(
          state
            .filter((block) => block.type === 'input')
            .map((block) => block.id),
          /^input(\d+)$/
        );

      return prependItemToArray(state, {
        ...action.payload,
        type: 'input',
        id,
      });
    }
    case ActionType.Delete: {
      return state.filter((block) => block.id !== action.payload.id);
    }
    case ActionType.RESET: {
      return INITIAL_BLOCKS_STATE;
    }
    case ActionType.REORDER_BLOCKS: {
      const { currentId, targetId } = action.payload;
      const oldIndex = state.findIndex((x) => x.id === currentId);
      const newIndex = state.findIndex((x) => x.id === targetId);
      return arrayMove(state, oldIndex, newIndex);
    }
    case ActionType.EDIT_INPUT: {
      const { placeholder, label, id } = action.payload;
      return state.map((block) => {
        if (block.id !== id) return block;
        return {
          ...block,
          placeholder,
          label,
        };
      });
    }
    case ActionType.EDIT_IMAGE: {
      const { url, alt, id, width, height } = action.payload;
      return state.map((block) => {
        if (block.id !== id) return block;
        return {
          ...block,
          url,
          alt,
          width,
          height,
        };
      });
    }
    case ActionType.EDIT_TEXT: {
      const { id, text } = action.payload;
      return state.map((block) => {
        if (block.id !== id) return block;
        return {
          ...block,
          text,
        };
      });
    }
    default:
      return state;
  }
}
