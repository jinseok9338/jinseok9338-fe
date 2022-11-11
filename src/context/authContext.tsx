// wirte auth context and auth provider in react
// Path: src/context/authContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types/user';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';

type AuthContextType = {
  user: User | null;
  logIn: (id: string, password: string) => void;
  logOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  logIn: () => {},
  logOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('user_id');
    if (token) {
      try {
        //@ts-ignore
        const userId = jwt.decode(token)!.user.id;
        fetchUserData(userId as string);
      } catch (e: any) {
        // token 이 잘못되었음
        alert(e.message);
        localStorage.removeItem('user_id');
        router.push({
          pathname: '/login',
        });
      }
    }
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const response = await fetch(`/users/${userId}`, {
        method: 'GET',
      });
      const res = await response.json();
      const userData = res.data.user;

      const user = { id: userData.ID as String, name: userData.NAME as String };
      setUser(user);
    } catch (e) {
      console.log(e);
    }
  };

  const logIn = async (id: string, password: string) => {
    try {
      const data = {
        id: id,
        password: password,
      };

      const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      const res = await response.json();
      const token = res.data.accessToken;
      localStorage.setItem('user_id', token);

      const userData = res.data.user;
      const user = { id: userData.ID, name: userData.NAME };
      setUser(user);
      router.push({
        pathname: '/',
      });
    } catch (error) {
      console.log(error);
      alert('로그인에 실패했습니다.');
    }
  };

  const logOut = () => {
    localStorage.removeItem('user_id');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, logIn, logOut }}>{children}</AuthContext.Provider>;
};
