"use client";

import axios from "axios";
import { useState } from "react";
import { signIn } from "next-auth/react";

import Link from "next/link";
// import Logo from "@/components/Logo";
import Input from "@/components/Input";
import { AUTHENTICATION } from "@/enums";

const Auth = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [variant, setVariant] = useState(AUTHENTICATION.LOGIN);

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, [e.target.id]: e.target.value });
  };

  const toggleVariant = () => {
    setVariant((current) =>
      current === AUTHENTICATION.LOGIN
        ? AUTHENTICATION.REGISTER
        : AUTHENTICATION.LOGIN
    );
  };

  const login = async () => {
    try {
      const { email, password } = inputValue;
      await signIn("credentials", {
        email,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const register = async () => {
    try {
      await axios.post("/api/signUp", inputValue);
      login();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="relative h-screen w-full">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <Link href={"/auth"} className="block px-12 py-5">
          {/* <Logo /> */}
        </Link>
        <div className="flex justify-center mt-20">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === AUTHENTICATION.LOGIN ? "Đăng nhập" : "Đăng ký"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === AUTHENTICATION.REGISTER && (
                <Input
                  label="Name"
                  id="name"
                  onChange={onChangeField}
                  value={inputValue.name}
                  type="text"
                />
              )}
              <Input
                label="Email"
                id="email"
                onChange={onChangeField}
                type="email"
                value={inputValue.email}
              />
              <Input
                label="Password"
                id="password"
                onChange={onChangeField}
                type="password"
                value={inputValue.password}
              />
            </div>
            <button
              onClick={variant === AUTHENTICATION.LOGIN ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === AUTHENTICATION.LOGIN ? "Đăng nhập" : "Đăng ký"}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === AUTHENTICATION.LOGIN
                ? "Lần đầu bạn tới WebTruyen?"
                : "Đã có tài khoản rồi?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === AUTHENTICATION.LOGIN
                  ? "Tạo một tài khoản"
                  : "Đăng nhập"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Auth;
