import './index.css'
import logo from '../../images/jakxc-logo-color.png';
import linkedIn from '../../images/linkedIn-icon.svg';
import github from '../../images/github-icon.png';
import instagram from '../../images/instagram-icon.svg';

const Footer = () => {
    return (
        <footer>
            <img className="logo" src={logo} alt="Logo" />
            <div className="social-icon">
                <a href="https://www.linkedin.com/in/jack-chen-798696196/"><img src={linkedIn} alt="" /></a>
                <a href="https://github.com/jakxc/"><img src={github} alt="" /></a>
                <a href="https://www.instagram.com/ray.jxc/"><img src={instagram} alt="" /></a>
            </div>
        </footer>
    )
}

export default Footer;