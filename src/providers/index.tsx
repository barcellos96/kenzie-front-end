import { ReactNode } from "react";
import { DashboardProvider } from "./Dashboard";
import { LoginProvider } from "./Login";
import { RegisterProvider } from "./Register";

interface IChildrenReact {
  children: ReactNode;
}

const Providers = ({ children }: IChildrenReact) => {
  return (
    <RegisterProvider>
      <LoginProvider>
        <DashboardProvider>{children}</DashboardProvider>
      </LoginProvider>
    </RegisterProvider>
  );
};

export default Providers;
