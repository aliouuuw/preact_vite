"use server";

import { getSession } from "./auth-client";

export async function isAdmin() {
    const session = await getSession();
    return session?.user?.role === "admin";
}

export async function getLoggedInUser() {
    const session = await getSession();
    return session?.user;
}