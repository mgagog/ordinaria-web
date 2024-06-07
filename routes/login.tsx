import { FreshContext, Handlers, PageProps, RouteConfig } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import Login, { ErrorProps } from "../components/Login.tsx";
import jwt from "npm:jsonwebtoken@9.0.2";
import axios from "npm:axios";

export const config: RouteConfig = {
    skipInheritedLayouts: true
}

export const handler: Handlers = {
    POST: async (req: Request, ctx: FreshContext<unknown, ErrorProps>) => {
        const form = await req.formData();
        const url = ctx.url;

        const email = form.get("email");
        const password = form.get("password");

        const body = {
            email: email,
            password: password,
        }

        const response = await fetch(
            `${Deno.env.get("API_URL")}/checkuser`,
            {
               body: JSON.stringify(body),
               headers: {
                "Content-Type": "application/json"
                },
                method: "POST"
            }
        )

        if(response.status === 400 || response.status === 404){
            console.error("Incorrect credentials or user does not exist")
            return ctx.render({errorMessage: true});
        }
        else if(response.status === 200) {
            const data = await response.json();
            const token = jwt.sign({data}, Deno.env.get("JWT_SECRET"),{
                expiresIn: "24h"
            });

            const headers = new Headers;

            setCookie(headers, {
                name: "auth",
                value: token,
                sameSite: "Lax",
                domain: url.hostname,
                path: "/",
                secure: true
            });

            headers.set("location", "/videos");
            return new Response(null, {
                status: 303,
                headers
            });
        }
        else{
            return ctx.render();
        } 

    }
}

const Page = (props: PageProps<ErrorProps>) => {
    if(props.data === undefined)
        return <Login errorMessage={false}/>

    else
        return <Login errorMessage={props.data.errorMessage}/>
}

export default Page;