// src/services/menuService.ts
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

export type Menu = {
  id: string;
  name: string;
  brand: string;
  image: string;
};

export async function getMenus(): Promise<Menu[]> {
  const snapshot = await getDocs(collection(db, 'menus'));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Menu, 'id'>),
  }));
}