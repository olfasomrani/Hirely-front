import { useEffect, useState } from "react";

const useUserRole = () => {
  const [role, setRole] = useState("visiteur"); 

  useEffect(() => {
    // Récupérer le rôle depuis les cookies
    const roleFromCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('role='))
      ?.split('=')[1];
      
    if (roleFromCookie) {
      setRole(roleFromCookie); 
    }
  }, []);

  return role;
};

export default useUserRole;
