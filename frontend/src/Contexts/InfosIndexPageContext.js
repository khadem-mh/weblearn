import { createContext, useState, useEffect } from "react";

export const InfosIndexPageContext = createContext([])

export const InfosIndexPageProvider = ({children}) => {
    const [infos, setInfos] = useState([])

    useEffect(() => {
        fetch(`https://kind-tips-jam.loca.lt/v1/infos/index`)
        .then(res => res.json())
        .then(infos => setInfos(infos))
    }, [])

    return <InfosIndexPageContext.Provider value={infos}>{children}</InfosIndexPageContext.Provider>
}