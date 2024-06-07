import { FreshContext, Handlers, PageProps, RouteConfig } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import { ErrorProps } from "../components/Register.tsx";
import Register from "../components/Register.tsx";
import jwt from "npm:jsonwebtoken@9.0.2"

export const handler: Handlers = {
    
}

const Page = () => {
   return (<></>)
}

export default Page;