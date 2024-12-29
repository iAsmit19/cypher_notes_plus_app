declare module "masonry-layout" {
  export default class Masonry {
    constructor(selector: string | Element, options?: MasonryOptions);
    layout(): void;
    reloadItems(): void;
    destroy(): void;
  }

  interface MasonryOptions {
    itemSelector: string;
    columnWidth?: number | string;
    gutter?: number | string;
    fitWidth?: boolean;
    horizontalOrder?: boolean;
    percentPosition?: boolean;
  }
}