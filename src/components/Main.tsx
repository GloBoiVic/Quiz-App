import { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

function Main({ children }: MainProps) {
  return <main className="mx-auto mt-20 ">{children}</main>;
}

export default Main;
