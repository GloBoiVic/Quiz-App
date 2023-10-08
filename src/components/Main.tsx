import { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

function Main({ children }: MainProps) {
  return <main className="border border-red-500 h-screen">{children}</main>;
}

export default Main;
