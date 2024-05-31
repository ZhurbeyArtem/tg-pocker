import { Link } from "react-router-dom"
import s from './SDKPage.module.css'
import ConnectWalletModal from "../../components/connectWalletModal/ConnectWalletModal.tsx";
import { useEffect, useMemo, useState } from "react";
import Wallet from "../../components/wallet/Wallet.tsx";
import SendFrom from "../../components/sendForm/SendForm.tsx";
import { useWallet } from "../../hooks/useWallet.ts";
import { useSendTransaction } from "../../hooks/useSendTransaction.ts";
import { WalletInfo, isWalletInfoCurrentlyEmbedded } from "@tonconnect/sdk";
import { connector } from "../../connector.ts";

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

  const [walletsList, setWalletsList] = useState<WalletInfo[] | null>(null);

  useEffect(() => {
    connector.getWallets().then(setWalletsList);
  }, []);
  const embeddedWallet = useMemo(() => walletsList && walletsList.find(isWalletInfoCurrentlyEmbedded), [walletsList])


  const onConnectClick = () => {
    console.log('1');

    console.log(wallet);
    console.log('2');

    console.log(embeddedWallet);
    if (embeddedWallet) {
      connector.connect({ jsBridgeKey: embeddedWallet.jsBridgeKey })
      localStorage.setItem('wallet', JSON.stringify(wallet))
    }
    toggleModal()
  }



  return (

    <div className={s.connect}>
      <Link to='/' className={s.links}>Home</Link>
      <Wallet onConnect={onConnectClick} />
      <ConnectWalletModal isOpen={isModalOpen} toggleModal={toggleModal} />

      {!!wallet && <SendFrom handleSubmit={handleSubmit} isLoading={confirmationOnProgress} />}
    </div>


  )
}

export default SDKPage