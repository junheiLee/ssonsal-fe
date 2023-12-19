import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import "../../styles/user/login.css";
import { logIn } from "../../store/LoginUser.js";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formSchema = yup.object({
    email: yup
      .string()
      .required("이메일을 입력해주세요")
      .email("이메일 형식이 아닙니다."),
    password: yup
      .string()
      .required("영문, 숫자포함 8자리를 입력해주세요.")
      .min(8, "최소 8자 이상 가능합니다")
      .max(15, "최대 15자 까지만 가능합니다")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
        "영문 숫자 특수문자 포함 8자리 이상을 입력해주세요."
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const navigateToSignUp = () => {
    navigate("/user/sign-up");
  };

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post("/user/sign-in", formData);

      dispatch(logIn(response.data.data));
      navigate("/user/profile/"+response.data.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <div className="login-form">
        <div className="form-header">
          <div className="logo-wrapper">
            <div className="logo">
              <img
                src="https://images.unsplash.com/photo-1562790301-f9244aa7d429?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
          </div>
          <h2>Welcome Back</h2>
          <h4>Please login to continue</h4>
        </div>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <input
            name="email"
            placeholder="이메일"
            {...register("email")}
            className="form-field"
          />
          <br />
          {errors.email && <p>{errors.email.message}</p>}
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            {...register("password")}
            className="form-field"
          />
          {errors.password && <p>{errors.password.message}</p>}
          <button className="form-submit" type="submit">
            Login
          </button>
          <button className="form-submit" onClick={navigateToSignUp}>
            Sign Up
          </button>
        </form>
        <a href="#" className="forgot-link">
          Forgot Password?
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
