import classNames from "classnames/bind";
import styles from "./SignInSignUp.module.scss";

const cx = classNames.bind(styles);

function SignInSignUp({ children }) {
  return <div>{children}</div>;
}

export default SignInSignUp;
