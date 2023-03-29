import React from "react"

type ContextProps = {
    getError: () => void;
}

const NotificationContext = React.createContext<ContextProps | null>(null);

export const NotificationProvider : React.FC<{children: JSX.Element}> = ({
    children,
}) => {
    return(
        <NotificationContext.Provider value={value}></NotificationContext.Provider>
    )
}