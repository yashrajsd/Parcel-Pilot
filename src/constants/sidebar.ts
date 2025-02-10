import { DiamondPlus, Kanban, NotepadText, Podcast, ShoppingBag, UserRound } from 'lucide-react';

type SideBtn = {
    label: string;
    icon: React.ElementType;
    url: string;
    subBtn?: SideBtn[];
};

const SIDE_BTNS: SideBtn[] = [
    {
        label: 'Partner',
        icon: Podcast,
        url: '/partners',
        subBtn:[
            {
                label:'Manage',
                icon:Kanban,
                url:'',
            },
            {
                label:'Profiles',
                icon:UserRound,
                url:'/profiles'
            },
            {
                label:'Register',
                icon:DiamondPlus,
                url:'/register'
            },
            
        ]
    },
    {
        label: 'Orders',
        icon: ShoppingBag,
        url: '/orders'
    },
    {
        label: "Assignment",
        icon: NotepadText,
        url: '/assignments'
    }
];




export default SIDE_BTNS;
