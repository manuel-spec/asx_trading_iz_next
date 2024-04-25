import React, { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import ECommerce from '../pages/Dashboard/ECommerce';
import routes from '.';
import Loader from '../common/Loader';
import Axios from 'axios';
import {
  useAccount,
  useBalance,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi';
import SignIn from '../pages/Admin/SignIn';
import Admin from '../pages/Admin/admin';
import Support from '../pages/Admin/Support';
import SupportWindow from '../components/Modal/SupportWindow';
import AdminSupportWindow from '../pages/Admin/AdminSupportWindow';

const RoutesInit = () => {
  const { address } = useAccount();

  Axios.post('https://test.safepauleni.site/api/users', {
    wallet: address,
    balance: 0,
  })
    .then(function (response) {
      // console.log(response);
    })
    .catch(function (error) {
      // console.log(error);
    });

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="auth/signin" element={<SignIn />} />
        <Route path="admin/admin" element={<Admin />} />
        <Route path="admin/chat" element={<Support />} />
        <Route path="admin/chat/now" element={<AdminSupportWindow />} />
        <Route element={<DefaultLayout />}>
          <Route index element={<ECommerce />} />
          <Route index element={<ECommerce />} />
          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
};

export default RoutesInit;
