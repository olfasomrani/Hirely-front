"use client";

import React from "react";
import { Layout } from "antd";
const { Content } = Layout;

function AdminDashboard({ user }) {
  return (
    <Content className="flex flex-col w-full bg-white justify-center rounded-3xl bg-stone-50 m-4">
      <div className="flex flex-col px-20 pt-20 pb-12 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col self-center pt-10 pb-20 mt-9 w-full bg-white rounded-2xl w-[1100px] max-md:max-w-full">
          {user?.role === 'noMember' ? (
            <h1>Mon contenu pour noMembereeeee</h1>
          ) : (
            <h1>Accueil administrateur</h1>
          )}
        </div>
      </div>
    </Content>
  );
}

export default AdminDashboard;
