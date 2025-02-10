import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { ButtonProps } from "./Button.types";

const meta: Meta<ButtonProps> = {
  title: "Button",
  component: Button,
  args: {
    variant: "primary",
    children: "Button",
  },
  argTypes: {
    variant: {
      options: ["primary", "secondary"],
      control: { type: "select" },
    },
  },
};

type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  render: (args: ButtonProps) => <Button {...args} />,
};

export default meta;
