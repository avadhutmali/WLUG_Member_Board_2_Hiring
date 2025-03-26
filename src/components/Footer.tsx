import * as React from 'react';
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaDiscord,
} from "react-icons/fa6";

const Footer: React.FC = () => {
  const themeColors = {
    background: "#211039",
    secondary: "#2D174D",
    accent: "#8E74B7",
    text: "#F5F3F7",
    border: "#8E74B7"
  };

  const handleRegisterClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const page2Element = document.getElementById("Page2");
    if (page2Element) {
      page2Element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer 
      id="about" 
      className="footer w-full justify-center bottom-0 relative z-101 flex items-center"
      style={{ backgroundColor: themeColors.background }}
    >
      <div 
        className="flex w-full flex-col space-y-5 md:space-y-0 md:flex-row border-[8px] mt-2 rounded-lg lg:justify-evenly justify-center p-6 items-center lg:px-12"
        style={{
          backgroundColor: themeColors.secondary,
          borderColor: `${themeColors.border}30`,
        }}
      >
        {/* Logo Section */}
        <div className="space-y-2">
          <a href="https://www.wcewlug.org/" target="_blank" rel="noreferrer">
            <img
              src="https://res.cloudinary.com/dq5mzbtzt/image/upload/v1731135294/wlug_wqclwc.png"
              className="lg:max-w-[13rem] w-full max-w-[12rem]"
              alt="WLUG Logo"
            />
          </a>
        </div>

        {/* Social Links */}
        <div className="space-y-2">
          <h1 
            className="text-3xl font-extrabold mb-2 text-center md:text-left"
            style={{ color: themeColors.text }}
          >
            Stay Tuned!
          </h1>
          <div className="flex space-x-2 justify-center md:justify-start">
            {[
              { 
                icon: FaInstagram, 
                link: "https://instagram.com/wcewlug?igshid=YmMyMTA2M2Y=" 
              },
              { 
                icon: FaLinkedin, 
                link: "https://www.linkedin.com/company/wlug-club/" 
              },
              { 
                icon: FaGithub, 
                link: "https://github.com/Walchand-Linux-Users-Group" 
              },
              { 
                icon: FaXTwitter, 
                link: "https://mobile.twitter.com/wcewlug" 
              },
              { 
                icon: FaDiscord, 
                link: "https://discord.com/invite/3ce8hBZfc8" 
              },
            ].map(({ icon: Icon, link }, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noreferrer"
                className="transition-all hover:scale-110"
                style={{ color: themeColors.text }}
              >
                <Icon className="text-3xl" />
              </a>
            ))}
          </div>
          <p className="text-[14px]" style={{ color: themeColors.text }}>
            © 2025 WCEWLUG, ALL RIGHTS RESERVED
          </p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-2 text-center lg:text-left cursor-pointer">
  {[
    { label: "Home", link: "#home", onClick: () => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Register", link: "#register", onClick: () => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "About Us", link: "https://www.wcewlug.org/" },
  ].map(({ label, link, onClick }, index) => (
    <React.Fragment key={index}>
      <a
        href={link.startsWith("#") ? undefined : link} // Prevents full reload for internal links
        onClick={onClick}
        target={link.startsWith("#") ? undefined : "_blank"}
        rel="noreferrer"
        className="block hover:underline"
        style={{ color: themeColors.accent }}
      >
        {label}
      </a>
      <br />
    </React.Fragment>
  ))}
</div>


        {/* Policy Links */}
        <div className="space-y-0 text-center lg:text-left">
          {[
            {
              label: "Privacy Policy",
              link: "https://github.com/Walchand-Linux-Users-Group/gitbook/blob/wiki/policies/privacy-policy.md",
            },
            {
              label: "Terms and Conditions",
              link: "https://github.com/Walchand-Linux-Users-Group/gitbook/blob/wiki/policies/terms-and-conditions.md",
            },
          ].map(({ label, link }, index) => (
            <React.Fragment key={index}>
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
                style={{ color: themeColors.accent }}
              >
                {label}
              </a>
              <br />
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;