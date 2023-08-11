export type BlockType = 'img' | 'text' | 'input';

export interface Block {
  id: string;
  type: BlockType;
  width?: string | number;
  height?: string | number;
}

export interface ImageBlcok extends Block {
  type: 'img';
  url: string;
  alt?: string;
}

export interface TextBlcok extends Block {
  type: 'text';
  text: string;
}

export interface InputBlock extends Block {
  type: 'input';
  placeholder?: string;
  label?: string;
}

export type BlockTypes = ImageBlcok | TextBlcok | InputBlock;
export type Blocks = Array<BlockTypes>;
