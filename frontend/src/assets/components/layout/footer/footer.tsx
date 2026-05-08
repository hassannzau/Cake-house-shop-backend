import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "@/assets/images/icons";
import style from "./footer.module.scss";
import Logo from "@/assets/images/logo/cake-logo.png"; // sənin logo

interface Footer_link {
  title: string;
  links: string[];
}

export const footerLinks: Footer_link[] = [
  {
    title: "COMPANY",
    links: ["About Us", "Careers", "Affiliates", "Blog", "Contact Us"],
  },
  {
    title: "SHOP",
    links: ["Cakes", "Cupcakes", "Birthday", "Wedding", "Shop All"],
  },
  {
    title: "HELP",
    links: ["Customer Service", "Delivery Info", "Refund Policy", "Legal & Privacy", "Contact"],
  },
];

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footerMain}>
        {/* Column 1 */}
        <div className={style.column1}>
          <div className={style.logo}>
            <img src={Logo} alt="Cake House" />
          </div>

          <p className={style.text}>
            1418 River Drive, Suite 35 Cottonhall, CA 9622 United States
          </p>

          <p className={style.textStrong}>
            hello@cakehouse.com <br /> +1 246-345-0695
          </p>

          <div className={style.socialMedia}>
            <a href="/" aria-label="Facebook">
              <img src={FacebookIcon} alt="" />
            </a>
            <a href="/" aria-label="Instagram">
              <img src={InstagramIcon} alt="" />
            </a>
            <a href="/" aria-label="Twitter">
              <img src={TwitterIcon} alt="" />
            </a>
            <a href="/" aria-label="WhatsApp">
              <img src={WhatsappIcon} alt="" />
            </a>
          </div>
        </div>

        {/* Column 2 */}
        <div className={style.column2}>
          {footerLinks.map((section) => (
            <div className={style.footerSection} key={section.title}>
              <h3 className={style.title}>{section.title}</h3>
              <ul className={style.list}>
                {section.links.map((item) => (
                  <li key={item}>
                    <a className={style.link} href="/">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Column 3 */}
        <div className={style.column3}>
          <h3 className={style.titleAccent}>Subscribe</h3>
          <p className={style.text}>
            Get sweet deals, new cake drops and special offers in your inbox.
          </p>

          <form className={style.subscribe} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className={style.input}
            />
            <button type="submit" className={style.btn}>
              Join
            </button>
          </form>

          <p className={style.smallNote}>
            By subscribing, you agree to our Privacy Policy.
          </p>
        </div>
      </div>
{/* 
      <div className={style.bottomBar}>
        <p>© {new Date().getFullYear()} Cake House. All rights reserved.</p>
        <div className={style.bottomLinks}>
          <a href="/">Privacy</a>
          <a href="/">Terms</a>
          <a href="/">Cookies</a>
        </div>
      </div> */}
    </footer>
  );
}
