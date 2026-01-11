export type Log = {
    _id: string;
    admin: {
        _id: string;
        name: string;
        email: string;
    }
    meta: {
        newRole?: string;
        oldRole?: string;
        username?: string;
        userEmail?: string;
        title?: string;
    }
    action: string;
    targetedId?: string;
    targetType: string;
    createdAt: string;
    updatedAt?: string;
    __v?: number;
}