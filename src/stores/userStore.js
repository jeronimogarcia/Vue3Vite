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
  doc,
  where,
  getDoc,
  deleteDoc,
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
    isLoading: false,
    purchases: [],
    docId: "",
    purchasedId: "",
    loginFailed: false,
    registerFailed: false,
    ticketList: [],
    isAdmin: false,
    productId: ''
  }),
  actions: {
    async registerUser(email, password) {
      this.isLoading = true;
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
        this.registerFailed = true;
      } finally {
        this.isLoading = false;
      }
    },
    async loginUser(email, password) {
      this.isLoading = true;
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
        console.log(auth.currentUser.uid);
        if (auth.currentUser.uid == "V6b3yz2xE6bgd12K0Ykqg6zP7l93") {
          this.isAdmin = true;
        }
        console.log(this.isAdmin);
        this.getCarritoId();
        this.setLocalStorage();
        router.push("/");
      } catch (error) {
        console.log(error);
        this.loginFailed = true;
      } finally {
        this.isLoading = false;
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
    async setCompra(email, phone) {
      try {
        const docRef = await addDoc(collection(db, "compras"), {
          cliente: email,
          telefono: phone,
          productos: this.purchases,
        });
        this.purchasedId = docRef.id;
      } catch (error) {
        console.log(error);
      } finally {
        this.cleanPurchases();
        window.localStorage.setItem(
          `listaCarrito`,
          JSON.stringify(this.purchases)
        );
        useProductsStore().actualizarCarrito();
      }
    },
    async getTicketLista(ticket) {
      try {
        const docRef = doc(db, "compras", ticket);
        const docSnap = await getDoc(docRef);
        if (docSnap) {
          this.ticketList = docSnap.data().productos;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async addProduct(title, price, time, serving, description) {
      this.isLoading = true;
      try {
        await addDoc(collection(db, "productos"), {
          id: (useProductsStore().products.length) + 10,
          bought: 0,
          title: title,
          price: price,
          time: time,
          serving: serving,
          description: description,
          image:
            "https://firebasestorage.googleapis.com/v0/b/codermeals.appspot.com/o/Codermeals.png?alt=media&token=e1e7b88b-fe86-4b3e-a335-9817f8b658a9",
          taste: Math.floor(Math.random() * 7) + 4,
          healthy: Math.floor(Math.random() * 7) + 4,
          fragrance: Math.floor(Math.random() * 7) + 4,
          quality: Math.floor(Math.random() * 7) + 4,
          quantity: Math.floor(Math.random() * 8) + 6,
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteProductDatabase(id, index) {
      console.log(id)
      try {
        const q = query(
          collection(db, "productos"),
          where("id", "==", id)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.productId = doc.id;
        });
        const docRef = doc(db, "productos", this.productId);
        await deleteDoc(docRef);
      } catch (error) {
        console.log(error);
      } finally{
      }
      this.deleteProductLocal(index)
      console.log(useProductsStore().products)
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
    cleanPurchases() {
      this.purchases = [];
    },
    deleteProduct(index) {
      this.purchases.splice(index, 1);
      useProductsStore().actualizarLocalStorage();
      useProductsStore().actualizarCarrito();
    },
    deleteProductLocal(index){
      useProductsStore().products.splice(index, 1);;
    }
  },
});
