import { createContext, useContext, useEffect, useState } from 'react';

type BlockType =
  | 'img'
  | 'text'
  | 'html'
  | 'input'
  | 'markdown'
  | 'calendar'
  | 'phonenumber'
  | 'slider'
  | 'dropdown'
  | 'checkbox'
  | 'radio'
  | 'file';

interface Block {
  type: BlockType;
  width?: string | number;
  height?: string | number;
  id: string;
}

interface ImageBlcok extends Block {
  type: 'img';
  url: string;
  objectFit?: 'contain' | 'cover';
}

interface TextBlcok extends Block {
  type: 'text';
  text?: string;
}

interface HTMLBlcok extends Block {
  type: 'html';
  code: string;
}

interface InputBlcok extends Block {
  type: 'input';
  placeholder?: string;
  label?: string;
}

interface MarkdownBlcok extends Block {
  type: 'markdown';
}

interface CalendarBlcok extends Block {
  type: 'calendar';
}

interface PhonenumberBlcok extends Block {
  type: 'phonenumber';
}

interface SliderBlcok extends Block {
  type: 'slider';
}

interface DropdownBlcok extends Block {
  type: 'dropdown';
}

interface CheckboxBlcok extends Block {
  type: 'checkbox';
}

interface RadioBlcok extends Block {
  type: 'radio';
}

interface FileBlcok extends Block {
  type: 'file';
}

export type BlocksKind =
  | ImageBlcok
  | TextBlcok
  | HTMLBlcok
  | InputBlcok
  | MarkdownBlcok
  | CalendarBlcok
  | PhonenumberBlcok
  | SliderBlcok
  | DropdownBlcok
  | CheckboxBlcok
  | RadioBlcok
  | FileBlcok;
type Blocks = Array<BlocksKind>;

interface BlocksContextType {
  blocks: Blocks;
  setBlocks: React.Dispatch<React.SetStateAction<Blocks>>;
}

const BlocksContext = createContext<BlocksContextType | undefined>(undefined);

export function useBlocksContext() {
  const context = useContext(BlocksContext);
  if (!context) throw new Error('BlocksContext used outside of its Provider!');

  return context;
}

export const defaultValue: Blocks = [
  {
    type: 'img',
    url: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png',
    id: 'img1',
  },
  { type: 'input', placeholder: 'hello', id: 'input1' },
  { type: 'text', text: 'hello this is a test from ehsan', id: 'text1' },
  {
    type: 'html',
    code: `<table border="1" cellpadding="1" cellspacing="1" style="width:500px">
    <tbody>
      <tr>
        <td><span style="color:#e74c3c"><span style="background-color:#2ecc71">id</span></span></td>
        <td><span style="color:#e74c3c"><span style="background-color:#2ecc71">name</span></span></td>
        <td><span style="color:#e74c3c"><span style="background-color:#2ecc71">fullname</span></span></td>
      </tr>
      <tr>
        <td><span style="color:#e74c3c"><span style="background-color:#2ecc71">1</span></span></td>
        <td><span style="color:#e74c3c"><span style="background-color:#2ecc71">foo</span></span></td>
        <td><span style="color:#e74c3c"><span style="background-color:#2ecc71">bar</span></span></td>
      </tr>
      <tr>
        <td><span style="color:#e74c3c"><span style="background-color:#2ecc71">2</span></span></td>
        <td><span style="color:#e74c3c"><span style="background-color:#2ecc71">baz</span></span></td>
        <td><span style="color:#e74c3c"><span style="background-color:#2ecc71">jar</span></span></td>
      </tr>
      <tr>
        <td><span style="color:#e74c3c"><span style="background-color:#2ecc71">2</span></span></td>
        <td><span style="color:#e74c3c"><span style="background-color:#2ecc71">baz</span></span></td>
        <td><span style="color:#e74c3c"><span style="background-color:#2ecc71">jar</span></span></td>
      </tr>
      <tr>
        <td><span style="color:#e74c3c"><span style="background-color:#2ecc71">2</span></span></td>
        <td><span style="color:#e74c3c"><span style="background-color:#2ecc71">baz</span></span></td>
        <td><span style="color:#e74c3c"><span style="background-color:#2ecc71">jar</span></span></td>
      </tr>
      <tr>
        <td><span style="color:#e74c3c"><span style="background-color:#2ecc71">2</span></span></td>
        <td><span style="color:#e74c3c"><span style="background-color:#2ecc71">baz</span></span></td>
        <td><span style="color:#e74c3c"><span style="background-color:#2ecc71">jar</span></span></td>
      </tr>
    </tbody>
  </table>`,
    id: 'html1',
  },
];

export function BlocksProvider({ children }: { children: React.ReactNode }) {
  const [blocks, setBlocks] = useState<Blocks>(() => {
    if (typeof window === 'undefined') return defaultValue;

    const storedData = localStorage.getItem('blocks');
    return storedData ? JSON.parse(storedData) : defaultValue;
  });

  useEffect(() => {
    if (blocks) {
      localStorage.setItem('blocks', JSON.stringify(blocks));
    }
  }, [blocks]);

  return (
    <BlocksContext.Provider value={{ blocks, setBlocks }}>
      {children}
    </BlocksContext.Provider>
  );
}
