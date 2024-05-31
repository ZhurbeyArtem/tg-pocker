import { Button, Flex, Modal } from "antd";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { connector } from "../../connector";
import {
  isWalletInfoCurrentlyInjected,
  isWalletInfoRemote,
  WalletInfo,
} from "@tonconnect/sdk";
import { WalletInfoRemote } from "@tonconnect/ui-react";
import QRCodeModal from "../qrCodeModal/QRCodeModal";
import { useWallet } from "../../hooks/useWallet";

const ConnectWalletModal: FunctionComponent<{
  toggleModal: () => void;
  isOpen: boolean;
}> = ({ toggleModal, isOpen }) => {

  const [walletsList, setWalletsList] = useState<WalletInfo[] | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<WalletInfoRemote | null>(null)

  const wallet = useWallet()

  useEffect(() => {
    if (isOpen && wallet) toggleModal()
  }, [isOpen, toggleModal, wallet])

  useEffect(() => {
    connector.getWallets().then(setWalletsList);
  }, []);

  const onWalletClick = (walletInfo: WalletInfo) => {
    if (isWalletInfoRemote(walletInfo)) {
      return setSelectedWallet(walletInfo)
    }
    if (isWalletInfoCurrentlyInjected(walletInfo)) {
      return connector.connect({ jsBridgeKey: walletInfo.jsBridgeKey });
    }

    window.open(walletInfo.aboutUrl, "_blank");
  };

  return (
    <> <Modal open={isOpen} onOk={toggleModal} onCancel={toggleModal}>
      <h2>Choose a wallet</h2>
      {!!walletsList && (
        <Flex wrap gap="small">
          {walletsList.map((wallet) => (
            <Button
              onClick={() => onWalletClick(wallet)}
              icon={<img src={wallet.imageUrl} width={16} height={16} />}
              key={wallet.name}
            >
              {wallet.name}
            </Button>
          ))}
        </Flex>
      )}
    </Modal>
      <QRCodeModal isOpen={!!selectedWallet} onClose={() => setSelectedWallet(null)} walletInfo={selectedWallet} />
    </>
  );
};

export default ConnectWalletModal;
