import { useEffect, useState } from "react";
import { isConnectionRestored } from "../connector";

export function useConnectionRestored(): boolean {
  const [connectionRestored, setConnectionRestored] = useState(false)

  useEffect(() => {
    isConnectionRestored.then(() => setConnectionRestored(true))
  }, [])

  return connectionRestored
}