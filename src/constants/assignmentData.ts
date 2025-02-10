export type Assignment = {
    _id?: string; 
    orderNumber:string
    orderId: string;  
    partnerId: string; 
    timestamp: Date;  
    status: 'success' | 'failed' | 'Pending'; 
    reason?: string; 
};
