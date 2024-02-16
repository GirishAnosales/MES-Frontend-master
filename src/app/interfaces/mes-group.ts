export interface MesGroup {
    id: number;
    groupName: string;
    groupDescription: string;
    createdAt: string;
    updatedAt: string;
    canRead: boolean;
    canCreateInstructions: boolean;
    canEditInstructions: boolean;
    canDeleteInstructions: boolean;
    canCreateUser: boolean;
    canEditUser: boolean;
    canDeleteUser: boolean;
    canCreateGroup: boolean;
    canEditGroup: boolean;
    canDeleteGroup: boolean;
    canNeedAdminApproval: boolean;
}
