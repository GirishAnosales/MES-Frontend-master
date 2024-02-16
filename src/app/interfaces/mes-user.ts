export interface MesUser {
    id: number;
    username: string;
    password: string;
    badgeNumber: string;
    groupName: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    createdBy: string;
}

export interface MesUsername {
    username: string;
}
