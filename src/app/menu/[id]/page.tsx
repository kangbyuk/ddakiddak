// src/app/menu/[id]/page.tsx
import { fetchMenuById } from '@/services/menuService';
import { notFound } from 'next/navigation';

type MenuDetailProps = {
  params: {
    id: string;
  };
};

export default async function MenuDetail({ params }: MenuDetailProps) {
  const menu = await fetchMenuById(params.id);

  if (!menu) return notFound();

  const scoreLabels: { [key: string]: string } = {
    sweetness: '단맛',
    saltiness: '짠맛',
    spiciness: '매운맛',
    crispiness: '바삭함',
    moistness: '촉촉함',
    greasiness: '기름기',
    addictiveness: '중독성',
    amount: '양',
    value: '가성비',
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-white text-black p-6">
      <h1 className="text-3xl font-bold mb-2">{menu.brand} {menu.name}</h1>

      <img
        src={menu.image}
        alt={`${menu.name} 이미지`}
        className="w-full max-w-xl h-64 object-cover rounded mb-4"
      />

      <p className="text-base text-gray-700 mb-4">{menu.summary}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 w-full max-w-xl">
        {Object.entries(menu.scores).map(([key, value]) => (
          <div
            key={key}
            className="p-3 border rounded-xl text-sm bg-gray-50"
          >
            <strong>{scoreLabels[key]}</strong>: {value.toFixed(1)}점
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {menu.labels.slice(0, 3).map((label, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-sm bg-yellow-100 rounded"
          >
            {label}
          </span>
        ))}
      </div>
    </main>
  );
}