import { FreshContext, Handlers, PageProps, RouteConfig } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import { ErrorProps } from "../components/Register.tsx";
import Register from "../components/Register.tsx";
import jwt from "npm:jsonwebtoken@9.0.2"

export const config: RouteConfig = {
    skipInheritedLayouts: true
}

export const handler: Handlers = {
    POST: async (req: Request, ctx: FreshContext<unknown, ErrorProps>) => {
        const form = await req.formData();
        const url = ctx.url;

        const name = form.get("name");
        const email = form.get("email");
        const password = form.get("password");

        const body = {
            email: email,
            password: password,
            name: name
        };

        const response = await fetch(
            "https://videoapp-api.deno.dev/register",
            {
               body: JSON.stringify(body),
               headers: {
                "Content-Type": "application/json"
                },
                method: "POST"
            }
        )
        console.log(response.status)
        if(response.status === 500){
            console.error("That email is already registered")
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
        return <Register errorMessage={false}/>

    else
        return <Register errorMessage={props.data.errorMessage}/>
}

export default Page;