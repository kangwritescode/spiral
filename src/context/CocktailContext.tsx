// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Types
import { type Drink } from '~/shared/types'

type CocktailContextType = {
    drink: Drink | null
}

// ** Defaults
const defaultProvider: CocktailContextType = {
  drink: null,
}

const CocktailContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const CocktailContextProvider = ({ children }: Props) => {
  // ** States
  const [drink, setDrink] = useState<Drink | null>(null)
  const selectDrink = (drink: Drink) => {
    setDrink(drink)
  }
  const values = {
    drink,
    selectDrink,
  }

  return <CocktailContext.Provider value={values}>{children}</CocktailContext.Provider>
}

export { CocktailContext, CocktailContextProvider }
