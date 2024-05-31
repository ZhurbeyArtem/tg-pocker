import { SendTransactionRequest } from "@tonconnect/sdk";
import { useState } from "react";
import { connector } from "../connector";
import { UserRejectsError } from "@tonconnect/ui-react";
import { toast } from "react-toastify";

export function useSendTransaction() {
  const [confirmationOnProgress, setConfirmationOnProgress] = useState(false)

  async function sendTransaction(address: string) {
    setConfirmationOnProgress(true)
    const tx: SendTransactionRequest = {
      validUntil: Math.round(Date.now() / 1000) + 600,
      messages: [
        {
          address: address,
          amount: '10000000'
        }
      ]
    }

    try {
      await connector.sendTransaction(tx)
      toast.success('Operation successful!');
    } catch (e) {
      if (e instanceof UserRejectsError) {
       return toast.error('You rejected the transaction!');
      }
      toast.error('Unknown error');
      console.log(e);
      
    } finally {
      setConfirmationOnProgress(false)
    }
  }
return [sendTransaction, confirmationOnProgress] as const
}