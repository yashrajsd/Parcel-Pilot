export type PartnerForm={
    name:string,
    email:string,
    phone:string,
    shift:{
        start:string,
        end:string,
    },
    areas:string[]
}