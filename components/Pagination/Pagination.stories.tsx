import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";
import { PaginationProps } from "./Pagination.types";

const meta: Meta<PaginationProps> = {
  title: "Pagination",
  component: Pagination,
  args: {
    currentPage: 1,
    totalPages: 100,
    searchParams: new URLSearchParams({ page: "1" }),
  },
  argTypes: {
    currentPage: {
      control: { type: "number" },
    },
    totalPages: {
      control: { type: "number" },
    },
  },
};

type Story = StoryObj<PaginationProps>;

export const Default: Story = {
  render: (args: PaginationProps) => <Pagination {...args} />,
};

export default meta;
