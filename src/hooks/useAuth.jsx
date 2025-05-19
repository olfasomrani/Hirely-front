import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import * as AuthService from "../services/authService";
import { setUser, clearUser } from "../store/authSlice";

const useAuth = () => {
  const user = useSelector((state) => state.auth.user);  // Utilisation de Redux pour récupérer l'utilisateur
  const dispatch = useDispatch();
  const router = useRouter();
  

  const login = async ({ email, password }) => {
    try {
      const res = await AuthService.login({ email, password });

      // Mise à jour de l'état utilisateur dans Redux
      dispatch(setUser(res.user));

      // Redirection selon le rôle de l'utilisateur
      if (res.user.role === "candidat") {
        router.push("/candidat/accueil");
      } else if (res.user.role === "recruteur") {
        router.push("/entreprise/accueil");
      } else {
        router.push("/admin/accueil");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout(); // Si tu ajoutes un endpoint logout
    } catch (err) {
      console.warn("Erreur pendant la déconnexion :", err);
    }

    dispatch(clearUser()); // Réinitialisation de l'état utilisateur dans Redux
    router.push("/");  // Redirection après déconnexion
  };

  return { user, login, logout };  // Renvoie l'utilisateur du store Redux
};

export default useAuth;
