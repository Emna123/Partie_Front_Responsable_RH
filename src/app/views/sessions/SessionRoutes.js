import SignIn from "./SignIn";
import NotFound from "./NotFound";
import ForgotPassword from "./ForgotPassword";
import ResetPass from "./ResetPass";
import ResetPassword from "./ResetPassword";
import {PostData} from '../../services/PostData';

const settings = {
  activeLayout: "layout1",
  layout1Settings: {
    topbar: {
      show: false
    },
    leftSidebar: {
      show: false,
      mode: "close"
    }
  },
  layout2Settings: {
    mode: "full",
    topbar: {
      show: false
    },
    navbar: { show: false }
  },
  secondarySidebar: { show: false },
  footer: { show: false }
};

const sessionRoutes = [
 
  {
    path: "/session/signin",
    component: SignIn,
    settings
  },
  {
    path: "/session/forgot-password",
    component: ForgotPassword,
    settings
  },
  {
    path: "/session/resetpass",
    component: ResetPass,
    settings
  },
  {
    path: "/session/resetpassword/:id"
    ,
    component: ResetPassword,
    settings
  },
  {
    path: "/session/404",
    component: NotFound,
    settings
  }
];

export default sessionRoutes;
