export type FinderNode = {
  type: 'Folder' | 'File';
  name: string;
  children?: FinderNode[];
};

export const finderData: FinderNode = {
  type: 'Folder',
  name: 'Designs',
  children: [
    {
      type: 'Folder',
      name: 'Figma',
      children: [
        {
          type: 'File',
          name: 'LifeOS - AI Operating System (Case Study)',
        },
        {
          type: 'File',
          name: 'JustShare Care - Online SaaS Healthcare Website (Project)',
        },
      ],
    },
    {
      type: 'File',
      name: 'Resume',
    },
  ],
};
