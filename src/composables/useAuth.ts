import { ref } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

// This stays outside so it's globally shared
const user = ref<null | { uid: string; email: string }>(null);
let initialized = false;

export function useAuth() {
  if (!initialized) {
    initialized = true;
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
        ? { uid: firebaseUser.uid, email: firebaseUser.email || "" }
        : null;
    });
  }

  return { user };
}


