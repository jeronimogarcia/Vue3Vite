import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  getDocs,
  where,
} from "firebase/firestore/lite";
import { db } from "../FirebaseConfig/firebaseConfig";
import { defineStore } from "pinia";
import { auth } from "../FirebaseConfig/firebaseConfig";
import router from "../router";
import { useProductsStore } from "./products";

export const userUserStore = defineStore("userStore", {
  state: () => ({
    userData: null,
    loadingUser: false,
    loadingSession: false,
    purchases: [],
    docId: '',
    purchasedId: "",
    loginFailed: false,
    registerFailed: false
  }),
  actions: {
    async registerUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await addDoc(collection(db, "charts"), {
          cliente: user.uid,
          productos: this.purchases,
        });
        router.push("/login");
      } catch (error) {
        console.log(error);
        this.registerFailed = true
      } finally {
        this.loadingUser = false;
      }
    },
    async loginUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const q = query(
          collection(db, "charts"),
          where("cliente", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        this.purchases = querySnapshot.productos;
        querySnapshot.forEach((doc) => {
          this.purchases = doc.data().productos;
        });
        this.getCarritoId();
        this.setLocalStorage();
        router.push("/");
      } catch (error) {
        console.log(error);
        this.loginFailed = true
      } finally {
        this.loadingUser = false;
      }
    },
    async logoutUser() {
      const useDatabaseStore = userUserStore();
      useDatabaseStore.$reset();
      try {
        await signOut(auth);
        this.userData = null;
        router.push("/login");
        useProductsStore().carrito = [];
        this.cleanLocalStorage();
      } catch (error) {
        console.log(error);
      }
    },
    async getCarritoId() {
      try {
        const q = query(
          collection(db, "charts"),
          where("cliente", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.docId = doc.id;
        });
      } catch (error) {
        console.log(error);
      }
    },
    async setCompra(email, phone){
      try {
        const docRef =  await addDoc(collection(db, "compras"), {
          cliente: email,
          telefono: phone,
          productos: this.purchases,
        });
        this.purchasedId = docRef.id
      } catch (error) {
        console.log(error);
      } finally {
        this.cleanPurchases()
        window.localStorage.setItem(
          `listaCarrito`,
          JSON.stringify(this.purchases)
        );
        useProductsStore().actualizarCarrito()
      }
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        const unsuscribe = onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              this.userData = { email: user.email, uid: user.uid };
            } else {
              this.userData = null;
              const useDatabaseStore = userUserStore();
              useDatabaseStore.$reset();
            }
            resolve(user);
          },
          (e) => reject(e)
        );
        unsuscribe();
      });
    },
    setLocalStorage() {
      window.localStorage.setItem(
        `listaCarrito`,
        JSON.stringify(this.purchases)
      );
    },
    getLocalStorage() {
      let listaCarrito = [];
      listaCarrito = JSON.parse(window.localStorage.getItem(`listaCarrito`));
      if (listaCarrito.length != this.purchases.length) {
        this.purchases = [...listaCarrito];
        window.localStorage.setItem(
          `listaCarrito`,
          JSON.stringify(this.purchases)
        );
      }
    },
    cleanLocalStorage() {
      localStorage.clear();
    },
    cleanPurchases(){
      this.purchases = []
    },
    deleteProduct(index) {
      this.purchases.splice(index, 1);
      useProductsStore().actualizarLocalStorage();
      useProductsStore().actualizarCarrito();
    },
  },
});
