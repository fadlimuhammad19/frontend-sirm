import { createContext, useContext, useState } from "react";

const CabangContext = createContext(null);

const daftarCabang = [
  { id: 1, nama: "RS Pusat Tegal" },
  { id: 2, nama: "RS Cabang Slawi" },
];

export function CabangProvider({ children }) {
  const [cabangAktif, setCabangAktif] = useState(daftarCabang[0]);

  return (
    <CabangContext.Provider value={{ cabangAktif, setCabangAktif, daftarCabang }}>
      {children}
    </CabangContext.Provider>
  );
}

export function useCabang() {
  return useContext(CabangContext);
}