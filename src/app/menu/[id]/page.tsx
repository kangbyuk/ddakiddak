// src/app/menu/[id]/page.tsx
import { notFound } from 'next/navigation';
import { getMenus } from '@/services/menuService';

export default async function MenuDetailPage({ params }: { params: { id: string } }) {
  const menus = await getMenus();
  const menu = menus.find((item) => item.id === params.id);

  if (!menu) return notFound();

  return (
    <main className="p-6 bg-white min-h-screen text-black">
      <h1 className="text-3xl font-bold mb-4">{menu.name}</h1>
      <img src={menu.image} alt={menu.name} className="w-full max-w-md rounded shadow" />
      <p className="mt-2 text-sm text-neutral-600">브랜드: {menu.brand}</p>
    </main>
  );
}