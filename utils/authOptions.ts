import { NextAuthOptions, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import connectDB from "@/config/database";
import User from "@/models/User";
// 为 Google 和 GitHub profile 定义具体类型
interface GoogleProfile extends Profile {
    picture?: string;
    email_verified?: boolean;
}

interface GitHubProfile extends Profile {
    avatar_url?: string;
}
export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    callbacks: {
        // Invoked on sucessful sign in
        async signIn({ account, profile }) {
            // 1. Connect to the database
            await connectDB();

            // 2. Check if user exists 
            const useExists = await User.findOne({ email: profile?.email });
            // 根据不同的提供商获取正确的头像 URL
            let imageUrl = '';
            if (account?.provider === 'google') {
                imageUrl = (profile as GoogleProfile)?.picture || '';
            } else if (account?.provider === 'github') {
                imageUrl = (profile as GitHubProfile)?.avatar_url || '';
            }

            // 3. If not, create user
            if (!useExists) {
                const username = profile?.name?.slice(0, 20)

                await User.create({
                    email: profile?.email,
                    username,
                    image: imageUrl,
                });
            }


            // 4. Return true to allow sign in
            return true
        },
        async session({ session }) {
            // 1. Get user from database
            if (!session.user) {
                return session;
            }
            const user = await User.findOne({ email: session.user.email });
            if (!user) {
                return session;
            }
            // 2. Assign user id from the 
            session.user.id = user._id.toString();
            // 3. Return session
            return session;
        }
    },
    debug: true,
}