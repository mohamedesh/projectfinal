import SignUp from "../sign-up/signUp";
import SignIn from "../sign-in/SignIn";
import Header from "../Element/Header";
import mc from "./login.module.scss";
import {useState} from "react";
import {NavLink,useLocation} from "react-router-dom";



const Login = () => {
    const [button, setButton] = useState(false);
    const [active,setActive] = useState(false);
    console.log(button)
    return (
        <div>
            <main>
                <section>
                    <h2>Create Account</h2>
                    <SignUp />
                </section>

                <section>
                    <h2>SignIn</h2>
                    <SignIn />
                </section>

                {/*<div>*/}
                {/*    <div>*/}
                {/*        <div>*/}
                {/*            <h2>Welcome Back</h2>*/}
                {/*            <p>Login you </p>*/}
                {/*            <button>SignIn</button>*/}
                {/*        </div>*/}

                {/*        <div>*/}
                {/*            <h2>Hello ! Friend</h2>*/}
                {/*            <p>Enter your personnal details and join us</p>*/}
                {/*            <button>Create Account</button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </main>
        </div>
    );
};


export default Login