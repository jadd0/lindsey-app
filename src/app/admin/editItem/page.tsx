"use client"
import ItemsPreviewWithFilters from "@/app/_components/ssr/item/ItemsPreview";
import { Item } from "@/app/_shared/types";

export default function EditItemsPage() {
  function handleItemClick(item: Item) {
    // Redirect to edit page with item ID
    window.location.href = `/admin/editItem/${item.id}`;
  }

  return (
    <div className="font-sans flex flex-col gap-5 items-center  min-h-screen">
      <h1 className="text-3xl font-bold">Edit Items Page</h1>
      <p>Click on an item below to edit/delete it</p>
      <ItemsPreviewWithFilters clickable={true} itemClicked={(item) => {handleItemClick(item)}} />
    </div>
  );
}