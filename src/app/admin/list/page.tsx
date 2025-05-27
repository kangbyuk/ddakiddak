'use client';

import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface Menu {
  id: string;
  name: string;
  brand: string;
  image: string;
}

export default function AdminMenuList() {
  const user = useAuth();
  const router = useRouter();

  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenus = async () => {
      const snapshot = await getDocs(collection(db, 'menus'));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Menu[];
      setMenus(data);
      setLoading(false);
    };
    fetchMenus();
  }, []);

  if (user === null) return <p className="p-6">⏳ 로그인 상태 확인 중...</p>;
  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">📋 등록된 메뉴 리스트</h1>
      {loading ? (
        <p>불러오는 중...</p>
      ) : menus.length === 0 ? (
        <p>등록된 메뉴가 없습니다.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">이미지</th>
              <th className="border p-2">이름</th>
              <th className="border p-2">브랜드</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr key={menu.id} className="border-t">
                <td className="border p-2">
                  <img src={menu.image} alt={menu.name} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="border p-2">{menu.name}</td>
                <td className="border p-2">{menu.brand}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}