import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Shelves } from './index';
import { exampleDefinition } from './constants';

const meta = {
  title: 'Shelves/Shelves',
  component: Shelves,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: { onChange: fn() },
} satisfies Meta<typeof Shelves>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShelvesApp: Story = {
  args: {
    imgUrl:
      'https://raw.githubusercontent.com/ahmetturkmen/CV-P1-2019-2020/master/data_/shelves/m1_shelf.jpg',
    shelvesDefinition: exampleDefinition,
  },
};
