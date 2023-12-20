import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "../../styles/user/signup.css";
import * as yup from "yup";
import axios from "axios";
import parse from "date-fns/parse";

const SignUpForm = () => {
  const navigate = useNavigate();

  const signUpFormSchema = yup.object({
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
    confirmPassword: yup
      .string()
      .required("비밀번호 일치 확인이 필요합니다")
      .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다."),
    name: yup
      .string()
      .min(2, "최소 2자 이상 가능합니다")
      .max(8, "최대 8자 까지만 가능합니다")
      .required("이름을 입력해주세요"),
    birth: yup
      .date()
      .typeError(null)
      .transform(function (value, originalValue) {
        if (this.isType(value)) {
          return value;
        }
        const result = parse(originalValue, "dd.MM.yyyy", new Date());
        return result;
      })
      .required("생년월일을 입력해주세요"),
    gender: yup.string().required("성별을 입력해주세요"),
    nickname: yup.string().required("닉네임을 입력해주세요"),
    position: yup.string().required("포지션을 입력해주세요"),
    phone: yup
      .string()
      .required("올바른 전화번호를 입력해주세요")
      .min(11, "올바른 전화번호를 입력해주세요")
      .max(13, "최대 13자리 까지만 가능합니다")
      .matches(
        /\d{3}-\d{3,4}-\d{4}/,
        " - 을 집어넣어 000-0000-0000 와 같이 입력해 주세요"
      ),
    intro: yup
      .string()
      .max(1000, "1000자 까지만 가능합니다.")
      .required("자기소개를 입력해주세요"),

    preferredTime: yup.string().required("선호 시간을 입력해주세요"),
    preferredArea: yup.string().required("선호 지역을 입력해주세요"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(signUpFormSchema),
  });

  const handleSignUp = async (formData) => {
    try {
      const response = await axios.post("/api/user/sign-up", formData);
      console.log(response.data);
      navigate("/user/sign-in");
    } catch (error) {
      console.error("가입 중 오류 발생:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <form
        style={{ marginTop: "50px" }}
        className="form signform"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <p className="title">Register </p>
        <p className="message">Signup now and get full access to our app. </p>
        <label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </label>
        <br />
        <label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </label>
        <br />
        <label>
          <input
            type="password"
            name="confirmPassword"
            className="input"
            placeholder="confirmPassword"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </label>
        <br />
        <label>
          <input
            type="text"
            name="name"
            className="input"
            placeholder="이름"
            {...register("name")}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </label>
        <br />
        <label>
          <input
            type="date"
            name="birth"
            className="input"
            placeholder="생년월일"
            min="1923-01-01"
            max="2030-01-01"
            required
            pattern="\d{4}-\d{2}-\d{2}"
            {...register("birth")}
          />
          {errors.birth && <p>{errors.birth.message}</p>}
        </label>
        <br />

        <label>
          성별
          <select {...register("gender", { required: true })}>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </select>
        </label>
        {errors.gender && <p>{errors.gender.message}</p>}

        <br />
        <label>
          <input
            type="text"
            name="nickname"
            className="input"
            placeholder="닉네임"
            {...register("nickname")}
          />
          {errors.nickname && <p>{errors.nickname.message}</p>}
        </label>
        <br />
        <label>
          포지션
          <select
            className="locadate"
            {...register("position", { required: true })}
          >
            <option value="상관없음">상관없음</option>
            <option value="공격수">공격수</option>
            <option value="미드필더">미드필더</option>
            <option value="수비수">수비수</option>
            <option value="골키퍼">골키퍼</option>
          </select>
          {errors.position && <p>{errors.position.message}</p>}
        </label>
        <br />
        <label>
          <input
            type="text"
            name="phone"
            className="input"
            placeholder="전화번호"
            {...register("phone")}
          />
          {errors.phone && <p>{errors.phone.message}</p>}
        </label>
        <br />
        <label>
          <input
            type="text"
            name="intro"
            className="input"
            placeholder="자기소개"
            {...register("intro")}
          />
          {errors.intro && <p>{errors.intro.message}</p>}
        </label>

        <br />

        <label>
          선호시간
          <select {...register("preferredTime", { required: true })}>
            <option value="상관없음">상관없음</option>
            <option value="주중/오전">주중/오전</option>
            <option value="주중/오후">주중/오후</option>
            <option value="주말/오전">주말/오전</option>
            <option value="주말/오후">주말/오후</option>
          </select>
          {errors.preferredTime && <p>{errors.preferredTime.message}</p>}
        </label>
        <br />
        <label>
          선호지역
          <select {...register("preferredArea", { required: true })}>
            <option value="상관없음">상관없음</option>
            <option value="서울">서울</option>
            <option value="경기">경기</option>
            <option value="지방">지방</option>
          </select>
          {errors.preferredArea && <p>{errors.preferredArea.message}</p>}
        </label>
        <br />
        <button type="submit" className="submit">
          가입하기
        </button>

        <p className="signin">
          Already have an acount ? <a href="/api/user/sign-in">Signin</a>{" "}
        </p>
      </form>
    </div>
  );
};
export default SignUpForm;
