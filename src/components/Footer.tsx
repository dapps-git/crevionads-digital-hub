import logo from "@/assets/crevionads_logo.png";

const footerLinks = {
  Product: ["Home", "Services", "About", "Contact"],
  Resources: ["Blog", "Case Studies", "FAQ"],
  Legal: ["Terms & Conditions", "Privacy Policy"],
};

export const Footer = () => {
  return (
    <footer className="border-t border-secondary/10 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <img src={logo} alt="CrevionAds" className="h-8 mb-4" />
            <p className="text-zinc-500 text-sm leading-relaxed">
              Performance-driven digital marketing agency helping brands grow faster.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-bold text-zinc-100 mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-secondary/10 text-center text-zinc-500 text-sm">
          © {new Date().getFullYear()} CrevionAds. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
