interface Metrics {
    rating: number;
    completedOrders: number;
    cancelledOrders: number;
}


interface Shift {
    start: string;
    end: string;
}


export interface Profile {
    _id: string;
    name: string;
    email: string;
    phone: string;
    currentLoad: number;
    areas: string[];
    shift: Shift;
    metrics: Metrics;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export interface ProfilesResponse {
    profiles: Profile[];
    totalProfilesCount: number;
    averageRating: number;
}
