"use client";

import { deleteItemById } from '@/app/_actions/items.actions';
import { toast } from 'sonner';
import { Trash } from 'lucide-react';

export default function DeleteItemButton({ id }: { id: string }) {
  async function handleDeleteItem() {
    const { success, error } = await deleteItemById(id);

    if (error) {
      toast.error(error);
      return;
    }

    if (success) {
      toast.success('Item deleted successfully');
      window.location.href = '/admin/editItem';
    }
  }

  return (
    <button
      className="p-3 px-5 bg-red-500 rounded-lg font-bold flex flex-row justify-center items-center gap-3 cursor-pointer"
      onClick={handleDeleteItem}
    >
      Delete <Trash />
    </button>
  );
}
