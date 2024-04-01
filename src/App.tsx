import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router-config";
export default function App() {

 if (!navigator.cookieEnabled) {
   return <div className="text-4xl text-center">Cookies are currently disabled in your browser. Please enable cookies to use this website.</div>
 }
  
  return <RouterProvider router={router} />
}
