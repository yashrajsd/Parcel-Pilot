import React from 'react';

type Props = {
    color?: string;
    textColor?: string;
    value: number | undefined;
    text: string;
};

const StatsCard = ({ color, textColor, value, text }: Props) => {

    return (
        <div 
            className={`border-[1px] rounded-md flex justify-center h-64 items-center flex-col transition duration-300 cursor-pointer`}
            style={{ backgroundColor: color, color: textColor }}
        >
            <h1 className="text-[4rem]">{value}</h1>
            <p className="text-[1.2rem]">{text}</p>
        </div>
    );
};

export default StatsCard;
