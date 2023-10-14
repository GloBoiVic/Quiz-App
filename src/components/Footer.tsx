import { ReactNode } from 'react';

interface FooterProps {
  children: ReactNode;
}

function Footer({ children }: FooterProps) {
  return <footer className="flex items-center justify-between mt-4">{children}</footer>;
}

export default Footer;
