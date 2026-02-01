
import { NextAuthOptions } from "next-auth";
import { db } from "@repo/db/client"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

export const authOptions : NextAuthOptions = {
    providers: [
        Credentials({
            name : "Credentials",
            credentials : {
                phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials : any){
                if (!credentials?.email || !credentials?.password) {
                        throw new Error("Missing credentials");
                }

                const hashedPassword = await bcrypt.hash(credentials.password,10);
                const existinguser = await db.user.findWhere({
                    where: {
                        number : credentials.phone,
                    },
                });

                if(existinguser){
                    const passwordValidation = await bcrypt.compare(credentials.password , existinguser.password);
                    if(passwordValidation){
                        return{
                            id : existinguser.id.toString(),
                            name : existinguser.name,
                            email : existinguser.email
                        }
                    }
                    return null;
                }

                try{
                    const user = await db.create({
                        data : {
                            number : credentials.phone,
                            password : hashedPassword
                        }
                    })

                     return {
                       id: user.id.toString(),
                       name: user.name,
                       email: user.number,
                     };
                }
                catch(e){
                    console.error(e);
                }
                return null;
            }
        })
    ],
    secret : process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session ({token, session}){
            if(session.user && token.sub){
                session.user.id = token.sub;
            }
            return session
        }
    }
};