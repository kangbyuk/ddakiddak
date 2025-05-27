'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchMenus, Menu } from '@/services/menuService';

// Swiper import
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import SwiperCore from 'swiper';
import { EffectCoverflow } from 'swiper/modules';

SwiperCore.use([EffectCoverflow]);

export default function Home() {
  const [menus, setMenus] = useState<Menu[]>([]);

  const loadMenus = async () => {
    const data = await fetchMenus();
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    setMenus(shuffled);
  };

  useEffect(() => {
    loadMenus();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-black pt-10 px-6">
      <h1 className="text-4xl font-bold mb-2">딱이닭 🐔</h1>
      <p className="text-sm text-gray-600 mb-4">오늘은 이 치킨으로 딱이닭!</p>

      <button
        onClick={() => window.location.reload()}
        className="mb-8 px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800 transition"
      >
        🔄 새로운 치킨 불러오기
      </button>

      <div className="w-full flex justify-center">
        <div className="w-full max-w-md">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={false}
            className="w-full"
          >
            {menus.map((menu) => (
              <SwiperSlide
                key={menu.id}
                style={{ width: '90%', maxWidth: '420px' }}
                className="rounded-xl overflow-hidden border shadow-md bg-white"
              >
                <Link href={`/menu/${menu.id}`}>
                  <img
                    src={menu.image}
                    alt={menu.name}
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-4 text-center text-xl font-semibold">
                    {menu.brand} {menu.name}
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </main>
  );
}