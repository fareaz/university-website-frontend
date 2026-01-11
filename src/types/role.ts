export type Role = {
    _id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
};

export type UserRole =
    | "admin"
    | "teacher"
    | "student"
    | "staff"
    | "moderator"
    | "super_admin";
