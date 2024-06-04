import { memo, ReactNode } from 'react';

interface PageProps {
    children: ReactNode;
    id: string
}



export const Page = memo((props: PageProps) => {
    const { children, id } = props;
    return (
        <main
            id={id}
        >
            {children}
        </main>
    );
});
