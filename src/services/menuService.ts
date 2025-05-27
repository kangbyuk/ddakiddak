// src/services/menuService.ts
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

export type Menu = {
  id: string;
  name: string;
  brand: string;
  image: string;
  summary: string;
  labels: string[];
  scores: {
    sweetness: number;
    saltiness: number;
    spiciness: number;
    crispiness: number;
    moistness: number;
    greasiness: number;
    addictiveness: number;
    amount: number;
    value: number;
  };
};

export async function fetchMenus(): Promise<Menu[]> {
  const snapshot = await getDocs(collection(db, 'menus'));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Menu[];
}

export async function fetchMenuById(id: string): Promise<Menu | null> {
  const ref = doc(db, 'menus', id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Menu;
}