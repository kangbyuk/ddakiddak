'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Home() {
  const [menus, setMenus] = useState<any[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      const res = await fetch('/api/menus');
      const data = await res.json();
      setMenus(data);
    };
    fetchMenus();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-2">🍗 딱이닭</h1>
      <p className="text-sm text-neutral-400 mb-4">오늘은 이 치킨으로 딱이닭!</p>

      <div className="w-full max-w-md">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          slidesPerView={1}
          loop
          className="rounded-xl overflow-hidden"
        >
          {menus.map((menu) => (
            <SwiperSlide key={menu.id}>
              <div className="bg-white text-black p-4 rounded-xl shadow-md">
                <img src={menu.image} alt={menu.name} className="w-full h-60 object-cover rounded-md" />
                <h2 className="text-lg font-semibold mt-2 text-center">{menu.name}</h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-4 py-2 bg-white text-black text-sm font-semibold rounded hover:bg-neutral-200"
      >
        🔄 새로운 치킨 불러오기
      </button>
    </main>
  );
}
