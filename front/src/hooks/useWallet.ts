import { Wallet } from "@tonconnect/sdk";
import { useEffect, useState } from "react";
import { connector } from "../connector";

export function useWallet(): Wallet | null {
  const [wallet, setWallet] = useState<Wallet | null>(() => {
    const storedWallet = localStorage.getItem('ton-connect-storage_bridge-connection');
    return storedWallet ? JSON.parse(storedWallet) as Wallet : null;
  })

  useEffect(() => connector.onStatusChange(setWallet), [])

  return wallet
}