import { type User } from "@/auth/api";
import { expect } from "vitest";

// eslint-disable-next-line func-style -- Необходим function declaration для assert
export function assertNotToBeNil<T>(value: null | T | undefined): asserts value is NonNullable<T> {
    expect(value).not.toBeNull();
    expect(value).toBeDefined();
}

export const createUser = (arg?: Partial<User>): User => ({
    avatar: "/935ea531-ffc0-4738-92b8-ae53b97a15f2/80ed2320-9fd1-4878-8424-3311c022fd3b_photo.jpg",
    display_name: "John Doe",
    email: "john.doe@example.com",
    first_name: "John",
    id: 1,
    login: "johndoe",
    phone: "1234567890",
    second_name: "Doe",
    ...arg,
});
