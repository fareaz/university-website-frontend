export type User = {
    _id: string;
    name: string;
    email: string;
    role: {
        _id: string;
        name: string;
    };
    createdAt: string;
    updatedAt?: string;
    __v?: number;
};
