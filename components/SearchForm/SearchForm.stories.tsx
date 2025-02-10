import type { Meta, StoryObj } from "@storybook/react";
import { SearchForm } from "./SearchForm";

const meta: Meta<typeof SearchForm> = {
  title: "SearchForm",
  component: SearchForm,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

type Story = StoryObj<typeof SearchForm>;

export const Default: Story = {
  render: () => <SearchForm />,
};

export default meta;
