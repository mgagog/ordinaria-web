import { PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import Logout from "../islands/Logout.tsx";

const Layout = (props:PageProps) => {
    const Component = props.Component;
    return (
        <>
        <Logout/>
        <Component/>
        </>
    );
}

export default Layout;