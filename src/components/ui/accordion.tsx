import React, { createContext, useContext, useState } from 'react';
import { ChevronDown } from 'lucide-react';


type AccordionContextType = {
  openItems: string[];
  toggleItem: (value: string) => void;
};


const AccordionContext = createContext<AccordionContextType | undefined>(undefined);


type AccordionItemContextType = {
  value: string;
};
const AccordionItemContext = createContext<AccordionItemContextType | undefined>(undefined);

export function Accordion({
  type = 'single',
  collapsible = false,
  defaultValue,
  children,
  className = '',
}: {
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  defaultValue?: string | string[];
  children: React.ReactNode;
  className?: string;
}) {
  const [openItems, setOpenItems] = useState<string[]>(() => {
    if (type === 'multiple') return Array.isArray(defaultValue) ? defaultValue : [];
    return defaultValue && typeof defaultValue === 'string' ? [defaultValue] : [];
  });

  const toggleItem = (value: string) => {
    if (type === 'single') {
      setOpenItems((prev) => (prev[0] === value && collapsible ? [] : [value]));
    } else {
      setOpenItems((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={`space-y-1 ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div>{children}</div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const accordionContext = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);

  if (!accordionContext || !itemContext) {
    throw new Error('AccordionTrigger must be used within an Accordion and AccordionItem');
  }

  const { openItems, toggleItem } = accordionContext;
  const { value } = itemContext;

  const isOpen = openItems.includes(value);

  return (
    <button
      className={`flex w-full items-center justify-between py-4 font-medium text-lg transition-all hover:underline ${className}`}
      onClick={() => toggleItem(value)}
      aria-expanded={isOpen}
    >
      {children}
      <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
}

export function AccordionContent({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const accordionContext = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);

  if (!accordionContext || !itemContext) {
    throw new Error('AccordionContent must be used within an Accordion and AccordionItem');
  }

  const { openItems } = accordionContext;
  const { value } = itemContext;

  const isOpen = openItems.includes(value);

  return (
    <div
      className={`overflow-hidden text-sm transition-all duration-300 ${
        isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
      } ${className}`}
    >
      <div className="pb-4 pt-0 text-gray-600 text-lg font-sans">{children}</div>
    </div>
  );
}
