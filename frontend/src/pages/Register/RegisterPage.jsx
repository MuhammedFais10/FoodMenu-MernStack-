import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../Components/Input/Input";
import Title from "../../Components/Title/Title";
import classes from "./registerPage.module.css";
import Button from "../../Components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../Components/hooks/useAuth";
import { EMAIL } from "../../Constants/Pattern";



export default function RegisterPage() {
  const auth = useAuth();
  const {user}=auth
 const navigate = useNavigate()
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");

  useEffect(()=>{
    if(!user) return
    returnUrl ? navigate(returnUrl) :navigate('/')
  },[user])

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    await auth.register(data);
  };
  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Regiter" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            type="text"
            label="Name"
            {...register("name", {
              required: true,
              minLength: 5,
            })}
            error={errors.name}
          />
          <Input
            type="email"
            label="Email"
            {...register("email", {
              required: true,
              pattern:EMAIL,
            })}
            error={errors.email}
          />

          <Input
            type="password"
            label="Password"
            {...register("password", {
              required: true,
              minLength: 5,
            })}
            error={errors.password}
          />

          <Input
            type="password"
            label="Confirm Password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value !== getValues("password")
                  ? "Passwords Do No Match"
                  : true,
            })}
            error={errors.confirmPassword}
          />

          <Input
            type="text"
            label="Address"
            {...register("address", {
              required: true,
              minLength: 10,
            })}
            error={errors.address}
          />
          <Button type="submit" text="Register" />

          <div className={classes.login}>
            Already a user? &nbsp;
            <Link to={`/login${returnUrl ? "?returnUrl=" + returnUrl : ""}`}>
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
