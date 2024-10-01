import React, { createContext, useContext, useState } from 'react'

interface TabsContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

export const Tabs: React.FC<{ children: React.ReactNode; defaultValue: string }> = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  )
}

export const TabsList: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex border-b border-gray-200">{children}</div>
}

export const TabsTrigger: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be used within a Tabs component')

  const { activeTab, setActiveTab } = context

  return (
    <button
      className={`px-4 py-2 text-sm font-medium ${
        activeTab === value
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-gray-500 hover:text-gray-700'
      }`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  )
}

export const TabsContent: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsContent must be used within a Tabs component')

  const { activeTab } = context

  if (activeTab !== value) return null

  return <div className="py-4">{children}</div>
}