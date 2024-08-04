import React, { createContext, useState } from "react";

export const LinkInfo = createContext()

function LinkInfoProvider({ children }) {

  const [linkName, setLinkName] = useState(null)

  const URL = 'https://panel-it.onrender.com'

  return (
    <LinkInfo.Provider value={{ linkName, setLinkName, URL }}>
      {children}
    </LinkInfo.Provider>
  )
}

export default LinkInfoProvider
