import { create } from "zustand"

import { userIP } from "@/types"

interface IuserData extends userIP {
  [key: string]: any
}

// TYPES DEFINITION
interface store {
  userData: IuserData | null
  setUserData: (payload: IuserData) => void
  consent: boolean
  setConsent: (payload: boolean) => void
}

// STORE DEFINITION
export const useStore = create<store>((set) => ({
  // userData
  userData: null,
  setUserData: (payload) => set({ userData: payload }),
  // Consent
  consent: false,
  setConsent: (payload) => set({ consent: payload }),
}))

/** ASI SE USA
  const { salsa, setSalsa } = useSalsaStore()
    ...
  return(
    <button
    onClick={() =>
      setSalsa({
      name: 'El pitorro',
      ingredients: ['zanahoria', 'piñones'],
      })
    }
  >
  )
**/
