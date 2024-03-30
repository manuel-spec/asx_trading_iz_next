import { lazy } from 'react';
import Chat from '../components/chat/Chat';
import News from '../components/News/News';
import Cryptos from '../components/Cryptos';
import Account from '../components/Accounts/Account';
import Admin from '../pages/Admin/admin';
import TransactionModal from '../components/Modal/TransactionModal';
import Setting from '../components/Settings/Setting';


const coreRoutes = [

  {
    path: '/News',
    title: 'News',
    component: News,
  },
  {
    path: '/Settings',
    title: 'Settings',
    component: Setting,
  },
  {
    path: '/profit',
    title: "profit",
    component: TransactionModal
  },
  {
    path: '/admin/admin',
    title: 'Admin',
    component: Admin,
  },
  {
    path: '/accounts',
    title: 'Accounts',
    component: Account
  },
  {
    path: '/support',
    title: 'Support',
    component: Chat,
  },
  {
    path: 'cryptocurrerncies',
    title: 'Cryptos',
    component: Cryptos

  },
];

const routes = [...coreRoutes];
export default routes;
