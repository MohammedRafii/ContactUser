import AuthCheck from "../component/AuthCheck";
const Login = () => {
  if (!navigator.cookieEnabled) {
   return <div className="text-4xl text-center">Cookies are currently disabled in your browser. Please enable cookies to use this website.</div>
  }
  return <AuthCheck />
};

export default Login;
