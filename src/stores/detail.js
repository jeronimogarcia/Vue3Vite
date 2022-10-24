import { defineStore } from "pinia";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "../FirebaseConfig/firebaseConfig";
import { useRoute } from "vue-router";

export const useDetail = defineStore("detail", {
  state: () => ({
    product: {},
  }),
  actions: {
    async getProductOnMounted() {
      try {
        const rout = Number(useRoute().params.id)
        const q = query(
          collection(db, "productos"),
          where("id", "==", rout)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.product = { ...doc.data() };
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
