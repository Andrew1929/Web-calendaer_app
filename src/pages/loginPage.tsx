import { LoginBox } from "../Components/loginBox";
import '../styles/loginPageStyle/loginPageStyle.css'

export const LoginPage : React.FC = () => {
    return (    
        <div className="login-page-body">
            <LoginBox/>
        </div>
    )
}