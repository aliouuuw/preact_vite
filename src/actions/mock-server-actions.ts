"use server";

import { mockData } from "@/lib/mock-data"

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
}

export async function getAllUsers(): Promise<User[]> {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return mockData.users;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getUser(search: string): Promise<User | string> {
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const user = mockData.users.find(user => user.name.toLowerCase().includes(search.toLowerCase()));
        return user || "no user found";
    } catch (error) {
        console.error(error);
        return "no user found";
    }
}


