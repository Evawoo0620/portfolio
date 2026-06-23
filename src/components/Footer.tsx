const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'LinkedIn', icon: 'linkedin' },
    { name: 'Dribbble', icon: 'dribbble' },
    { name: 'Behance', icon: 'behance' },
    { name: 'GitHub', icon: 'github' },
  ];

  const iconPaths: Record<string, string> = {
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" />',
    dribbble: '<circle cx="12" cy="12" r="10" /><path d="M12 2a3.04 3.04 0 0 0-1.384.349l-.019.011a3.04 3.04 0 0 0-1.941 1.941l-.011.019a3.04 3.04 0 0 0-.349 1.384v.001a3.04 3.04 0 0 0 .349 1.384l.011.019a3.04 3.04 0 0 0 1.941 1.941l.019.011a3.04 3.04 0 0 0 1.384.349h.001a3.04 3.04 0 0 0 1.384-.349l.019-.011a3.04 3.04 0 0 0 1.941-1.941l.011-.019a3.04 3.04 0 0 0 .349-1.384v-.001a3.04 3.04 0 0 0-.349-1.384l-.011-.019a3.04 3.04 0 0 0-1.941-1.941l-.019-.011A3.04 3.04 0 0 0 12 2z" />',
    behance: '<path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" /><path d="M8 12h3v7H8zm5.5 0h3v7h-3zm5.5 0h3v7h-3z" />',
    github: '<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />',
  };

  return (
    <footer className="bg-bg-primary border-t border-border">
      <div className="max-w-container mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center">
              <span className="text-accent-primary font-bold">ZC</span>
            </div>
            <div>
              <div className="text-text-primary font-semibold">朱超</div>
              <div className="text-text-muted text-sm">Zhu Chao</div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                className="w-10 h-10 rounded-lg bg-bg-card border border-border flex items-center justify-center hover:border-accent-primary/30 hover:text-accent-primary transition-colors"
                aria-label={link.name}
              >
                <svg className="w-5 h-5 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={iconPaths[link.icon]} />
                </svg>
              </a>
            ))}
          </div>

          <div className="text-text-muted text-sm">
            © {currentYear} 朱超. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
