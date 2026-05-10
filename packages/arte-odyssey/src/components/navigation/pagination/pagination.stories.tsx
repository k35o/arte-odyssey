import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Pagination } from './pagination';

const meta: Meta<typeof Pagination> = {
  title: 'components/navigation/pagination',
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const DefaultRender = () => {
  const [page, setPage] = useState(1);
  return (
    <Pagination currentPage={page} onPageChange={setPage} totalPages={10} />
  );
};

const MiddleRender = () => {
  const [page, setPage] = useState(5);
  return (
    <Pagination currentPage={page} onPageChange={setPage} totalPages={10} />
  );
};

const LastRender = () => {
  const [page, setPage] = useState(10);
  return (
    <Pagination currentPage={page} onPageChange={setPage} totalPages={10} />
  );
};

export const Default: Story = {
  render: () => <DefaultRender />,
};

export const Middle: Story = {
  render: () => <MiddleRender />,
};

export const Last: Story = {
  render: () => <LastRender />,
};

export const Disabled: Story = {
  render: () => (
    <Pagination
      currentPage={3}
      disabled
      onPageChange={() => {}}
      totalPages={10}
    />
  ),
};
