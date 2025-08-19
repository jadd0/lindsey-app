import { getItemById } from "@/app/_actions/items.actions";
import CreateItem from "@/app/_components/ssr/admin/item/create/CreateItem";
import DeleteItemButton from "@/app/_components/ssr/admin/item/create/DeleteButton";
import { Item } from "@/app/_shared/types";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ItemPage({ params }: PageProps) {
  const { id } = await params;

  const itemResult = await getItemById(id);

  if (!itemResult || !itemResult.data) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <DeleteItemButton id={id} />
      <CreateItem item={itemResult.data as Item} />
    </div>
  );
}
