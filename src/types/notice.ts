export type Notice = {
    _id: string,
    title: string,
    description?: string,
    categories: {
        _id: string;
        name: string;
    }[],
    allowedRoles: {
        _id: string;
        name: string;
    }[],
    file?: {
        originalname: string;
        filename: string;
        url: string;
        mimetype: string;
        size: number;
    },
    viewCount: number,
    downloadCount: number,
    isDeleted: boolean,
    createdBy?: {
        _id: string;
        name: string;
        email?: string;
    },
    createdAt: string,
    updatedAt: string,
    __v?: number
};


export interface NoticesResponse {
    data: Notice[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
