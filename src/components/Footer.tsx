import { ReactNode } from 'react';

interface FooterProps {
  children: ReactNode;
}

function Footer({ children }: FooterProps) {
  return <footer className="flex justify-between">{children}</footer>;
}

export default Footer;
