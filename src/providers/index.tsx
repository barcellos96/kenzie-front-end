import { ReactNode } from "react";

interface IChildrenReact {
  children: ReactNode;
}

const Providers = ({ children }: IChildrenReact) => {
  return <div>{children}</div>;
};

export default Providers;
