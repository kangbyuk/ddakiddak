'use client';

import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

type Brand = {
  id: string;
  name: string;
};

export default function UploadPage() {
  const user = useAuth();
  const router = useRouter();

  // 🧩 hook은 무조건 컴포넌트 최상단에 선언
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      const snapshot = await getDocs(collection(db, 'brands'));
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setBrands(list);
    };
    fetchBrands();
  }, []);

  const createBrandIfNeeded = async (): Promise<string> => {
    if (newBrand.trim()) {
      const q = query(collection(db, 'brands'), where('name', '==', newBrand));
      const snap = await getDocs(q);
      if (snap.empty) {
        await addDoc(collection(db, 'brands'), {
          name: newBrand,
          logo: '',
        });
      }
      return newBrand;
    }
    return selectedBrand;
  };

  const handleSubmit = async () => {
    const finalBrand = await createBrandIfNeeded();

    if (!name || !finalBrand || !image) {
      alert('치킨 이름, 브랜드, 이미지 URL은 필수입니다.');
      return;
    }

    const doc = {
      name,
      brand: finalBrand,
      image,
      summary: '',
      scores: {},
      labels: [],
    };

    await addDoc(collection(db, 'menus'), doc);
    setSuccess(true);
    setName('');
    setImage('');
    setSelectedBrand('');
    setNewBrand('');
  };

  // ✅ 조건부 렌더링은 여기서 처리
  if (user === null) return <p className="p-6">⏳ 로그인 상태 확인 중...</p>;
  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">🍗 메뉴 등록</h1>

      <input
        type="text"
        placeholder="치킨 이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      />

      <label className="block text-sm font-medium mb-1">브랜드 선택</label>
      <select
        value={selectedBrand}
        onChange={(e) => setSelectedBrand(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      >
        <option value="">브랜드를 선택하세요</option>
        {brands.map((b) => (
          <option key={b.id} value={b.name}>
            {b.name}
          </option>
        ))}
      </select>

      <p className="text-sm text-gray-600 mb-2">
        또는 아래에 새로운 브랜드명을 입력하세요
      </p>
      <input
        type="text"
        placeholder="새 브랜드명 입력 (예: 푸라닭)"
        value={newBrand}
        onChange={(e) => setNewBrand(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      />

      <input
        type="text"
        placeholder="이미지 URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      />

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        저장하기
      </button>

      {success && (
        <p className="text-green-600 mt-4 text-sm">✅ 저장 완료!</p>
      )}
    </main>
  );
}