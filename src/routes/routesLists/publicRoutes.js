import SignIn from "../../components/sign-in/SignIn";
import SignUp from "../../components/sign-up/SignUp";

const publicRoutes = [
  {
    path: '/login',
    title: 'Login',
    component: () => <SignIn />,
  },
  {
    path: '/register',
    title: 'Register',
    component: () => <SignUp />,
  },
];

export default publicRoutes;
