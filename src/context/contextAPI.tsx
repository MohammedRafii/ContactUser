import {
  createContext,
  useState,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
type UserProfile = { name: string; email: string };
interface Authentication {
  isAuthFunction: boolean;
  setIsAuthFunction: Dispatch<SetStateAction<boolean>>;
  userProfile: UserProfile;
  setUserProfile: Dispatch<SetStateAction<UserProfile>>;
}
const AppContext = createContext<Authentication | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthFunction, setIsAuthFunction] = useState(() => {
    return localStorage.getItem("auth") === "true";
  });
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
    email: "",
  });
  const value = {
    isAuthFunction,
    userProfile,
    setUserProfile,
    setIsAuthFunction,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
