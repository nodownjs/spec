export interface PathType {
  folder: string;
  files: string[];
}

export interface DataType {
  data: string;
  params: string;
  path: string;
}

export interface TocElement {
  type: string;
  children: TocElement[];
  href?: string;
}

export interface AnchorItem {
  key: string;
  href: string;
  title: string;
  children?: AnchorItem[];
}

export type ThemeType = "dark" | "light";
