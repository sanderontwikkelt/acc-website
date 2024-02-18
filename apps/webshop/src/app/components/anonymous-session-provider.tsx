'use client'

import type { ReactNode} from "react";
import {useEffect} from "react";
import {signIn, useSession} from "next-auth/react"

export const AnonymousSessionProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const {status} = useSession();
    useEffect(() => {
        if (status === "unauthenticated") {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            signIn("credentials");
        }
    }, [status]);

    return (
        <>
            {children}
        </>
    );
}