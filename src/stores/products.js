import { defineStore } from "pinia";
import {
  collection,
  getDocs,
  query,
  doc,
  updateDoc,
} from "firebase/firestore/lite";
import { db } from "../FirebaseConfig/firebaseConfig";
import { userUserStore } from "./userStore";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
  }),
  actions: {
    async getProducts() {
      try {
        const q = query(collection(db, "productos"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const found = this.products.find((p) => p.id == doc.data().id);
          if (!found) {
            this.products.push({ ...doc.data(), idt: doc.id });
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async actualizarCarrito() {
      try {
        const docRef = doc(db, "charts", userUserStore().docId);
        await updateDoc(docRef, {
          productos: [...userUserStore().purchases],
        });
      } catch (error) {
        console.log(error);
      }
    },
    addProductsToChart(product) {
      userUserStore().purchases.push(product);
      this.actualizarCarrito();
      this.actualizarLocalStorage();
    },
    actualizarLocalStorage() {
      window.localStorage.setItem(
        `listaCarrito`,
        JSON.stringify(userUserStore().purchases)
      );
    },
  },
});
