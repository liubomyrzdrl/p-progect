import React from 'react';

const ItemsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="w-full" >
            {children}
        </main>
    );
};

export default ItemsLayout;