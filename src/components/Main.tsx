import { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

function Main({ children }: MainProps) {
  return <main className="h-screen mx-auto">{children}</main>;
}

export default Main;
