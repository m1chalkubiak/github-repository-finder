import type { Meta, StoryObj } from "@storybook/react";
import { ErrorMessage } from "./ErrorMessage";
import { ErrorMessageProps } from "./ErrorMessage.types";

const meta: Meta<ErrorMessageProps> = {
  title: "ErrorMessage",
  component: ErrorMessage,
  args: {
    message: "Simple error message",
  },
  argTypes: {
    message: {
      control: { type: "text" },
    },
  },
};

type Story = StoryObj<ErrorMessageProps>;

export const Default: Story = {
  render: (args: ErrorMessageProps) => <ErrorMessage {...args} />,
};

export default meta;
