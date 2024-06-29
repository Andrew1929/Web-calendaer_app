import '../styles/loginPageStyle/loginBoxStyle.css';
import googleIcon from '../styles/pictures/Icon.png'
import { Link } from 'react-router-dom';

export const LoginBox : React.FC = () => {
    return (
        <div className="login-box">
            <div className="web-app-logo">
                <div className="logo">
                    <div className="logo-first-sq"></div>

                    <div className="logo-second-sq"></div>
                </div>

                <p className="web-app-title">WebCalendar</p>
            </div>

            <Link className="btn-link" to='/calendar'>
                <button className="login-btn">
                    <i className='login-btn-icon'>
                        <img src= {googleIcon} alt="google icon" />
                    </i>

                    <p className='login-btn-text'>Continue with Google</p>
                </button>
            </Link>
        </div>        
    )
}