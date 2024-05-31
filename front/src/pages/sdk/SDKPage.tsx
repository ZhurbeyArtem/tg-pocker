import { Link } from "react-router-dom"
import s from './SDKPage.module.css'
import ConnectWalletModal from "../../components/connectWalletModal/ConnectWalletModal.tsx";
import { useState } from "react";
import Wallet from "../../components/wallet/Wallet.tsx";
import SendFrom from "../../components/sendForm/SendForm.tsx";
import { useWallet } from "../../hooks/useWallet.ts";
import { useSendTransaction } from "../../hooks/useSendTransaction.ts";

type FormValues = {
  address: string;
};

const SDKPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wallet = useWallet();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const [sendTransaction, confirmationOnProgress] = useSendTransaction()

  const handleSubmit = async ({ address }: FormValues) => {

    await sendTransaction(address)
  }


  return (
    <div className={s.connect}>
      <Link to='/' className={s.links}>Home </Link>
      <Wallet onConnect={toggleModal} />
      <ConnectWalletModal isOpen={isModalOpen} toggleModal={toggleModal} />

      {!!wallet && <SendFrom handleSubmit={handleSubmit} isLoading={confirmationOnProgress} />}
    </div>
  )
}

export default SDKPage