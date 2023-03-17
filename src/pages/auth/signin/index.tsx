/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import style from "@/styles/signin.module.css";
import { FormEventHandler, useState } from "react";
import { CtxOrReq } from "next-auth/client/_utils";
import { getCsrfToken } from "next-auth/react";



const Login: NextPage = (): JSX.Element => {
  const [user, setUser] = useState<string>("");
  const [pass, setPass] = useState<string>("");
 

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: user,
      password: pass,
      redirect: false
    });
    console.log(res);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.divImg} />
        <form onSubmit={handleSubmit} className={style.containerLogin}>
          <div className={style.LoginCent}>
            <div className={style.loginTitle}>
              <h2>Login</h2>
            </div>
            <div>
              <div className={style.loginImput}>
                <label>Usuario</label>
                <input onChange={(e) => setUser(e.target.value)} type="text" />
              </div>
              <div className={style.loginImput}>
                <label>Senha</label>
                <input
                  onChange={(e) => setPass(e.target.value)}
                  type="password"
                />
              </div>
            </div>
            <div>
              <div className={style.hiperLink}>
                <a href="#">Esqueci a senha</a>
              </div>
              <div>
                <button className={style.BTN} type="submit">
                  SignIn
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
