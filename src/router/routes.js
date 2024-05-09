import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Layout/AuthLayout.vue';

const Login = () =>
  import(/* webpackChunkName: "pages" */ '@/views/Pages/Login.vue');

const AuthVerifySms = () =>
  import(/* webpackChunkName: "pages" */ '@/views/Pages/VerifySms.vue');

const Register = () =>
  import(/* webpackChunkName: "pages" */ '@/views/Pages/Register.vue');

const ForgotPassword = () =>
  import(/* webpackChunkName: "pages" */ '@/views/Pages/ForgotPassword.vue');

const ForgotPasswordReset = () =>
  import(
    /* webpackChunkName: "pages" */ '@/views/Pages/ForgotPasswordReset.vue'
  );
  const SuccessVerifySms = () => 
  import(
    /* webpackChunkName: "pages" */ '@/views/Pages/SuccessVerifySms.vue'
  );

const NewOrder = () =>
  import(/* webpackChunkName: "pages" */ '@/views/Pages/NewOrder.vue');

const Profile = () =>
  import(/* webpackChunkName: "pages" */ '@/views/Pages/UserProfile.vue');

const MyOrders = () =>
  import(/* webpackChunkName: "pages" */ '@/views/Pages/MyOrders.vue');

const MyRibbon = () =>
  import(/* webpackChunkName: "pages" */ '@/views/Pages/MyRibbon.vue');


const Drafts = () => import('@/views/Pages/Drafts/DraftsLayout.vue');

const Support = () =>
  import(/* webpackChunkName: "pages" */ '@/views/Pages/Support.vue');

const FirstAuth = () =>
  import(/* webpackChunkName: "pages" */ '@/views/Pages/FirstAuth.vue');

const OrderPageId = () =>
  import(/* webpackChunkName: "pages" */ '@/views/Pages/OrderPageId.vue');

const UserDebug = () =>
  import(/* webpackChunkName: "pages" */ '@/views/Pages/UserDebug.vue');

//import middleware
import auth from '@/middleware/auth';
import guest from '@/middleware/guest';

const routes = [
  {
    path: '/',
    redirect: '/ribbon',
  },
  {
    path: '/auth',
    component: AuthLayout,
    name: 'Auth layout',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login,
      },
      {
        path: 'sms',
        name: 'VerifySms',
        component: AuthVerifySms,
      },
      {
        path: 'register',
        name: 'Register',
        component: Register,
      },
      {
        path: 'forgot',
        name: 'Forgot',
        component: ForgotPassword,
      },
      {
        path: 'forgot/reset',
        name: 'Reset',
        component: ForgotPasswordReset,
      },
      {
        path: 'success',
        name: 'SuccessVerifySms',
        component: SuccessVerifySms,
      },
    ],
  },
  {
    path: '/',
    component: DashboardLayout,
    name: 'Dashboard layout',
    children: [
      {
        path: 'profile',
        name: 'Профиль',
        component: Profile,
        meta: { middleware: auth },
      },
      {
        path: 'new_order',
        name: 'Новый заказ',
        component: NewOrder,
        meta: { middleware: auth },
      },
      {
        path: 'ribbon',
        name: 'Лента',
        component: MyRibbon,
        meta: { middleware: auth}
      },
      {
        path: 'my_orders',
        name: 'Мои заказы',
        component: MyOrders,
        meta: { middleware: auth },
      },
      {
        path: 'drafts',
        name: 'Черновики',
        component: Drafts,
        meta: { middleware: auth },
      },
      {
        path: 'support',
        name: 'Поддержка',
        component: Support,
        meta: { middleware: auth },
      },
      {
        path: 'first_auth',
        name: 'Привет!',
        meta: { middleware: auth },
        component: FirstAuth,
      },
      {
        path: 'order/:id',
        name: 'Заказ',
        meta: { middleware: auth },
        component: OrderPageId,
      },
      {
        path: 'debug',
        name: 'UserDebug',
        meta: { middleware: auth },
        component: UserDebug,
      },
    ],
  },
];

export default routes;
