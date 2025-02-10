export type REGION = {
    _id: string;
    name: string;
    shiftCounts: number[];
    partnerCount: number;
    location: {
      longitude: string;
      latitude: string;
    };
};