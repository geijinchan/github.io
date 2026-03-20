import { socialLinks } from '../data/projects'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__left">
          <span className="footer__logo">&lt;Abhishek/&gt;</span>
          <p className="footer__tagline">
            Building intelligent systems, one model at a time.
          </p>
        </div>

        <div className="footer__links">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            GitHub
          </a>
          <a
            href={`mailto:${socialLinks.email}`}
            className="footer__link"
          >
            Email
          </a>
        </div>

        <div className="footer__right">
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} Abhishek. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
