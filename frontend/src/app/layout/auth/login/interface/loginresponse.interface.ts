export interface LoginResponse {
    id:     number;
    token:  string;
    user:   string;
    access: Access[];
}

export interface Access {
    rol:         string;
    permissions: string[];
}
