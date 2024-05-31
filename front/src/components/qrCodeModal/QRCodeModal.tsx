import { WalletInfoRemote } from '@tonconnect/ui-react';
import { Button, Modal, QRCode } from 'antd';
import { FunctionComponent, useEffect, useState } from 'react';

import { connector } from '../../connector';
import { useWallet } from '../../hooks/useWallet';

const QRCodeModal: FunctionComponent<{ isOpen: boolean; onClose: () => void; walletInfo: WalletInfoRemote | null }> = ({ isOpen, onClose, walletInfo }) => {

  const [link, setLink] = useState('');

  const wallet = useWallet()

  useEffect(() => {
    if (isOpen && wallet) onClose()
  }, [isOpen, onClose, wallet])

  useEffect(() => {
    if (walletInfo) {
      setLink(connector.connect({ bridgeUrl: walletInfo.bridgeUrl, universalLink: walletInfo.universalLink }))
    }
  }, [walletInfo])


  return (
    <Modal open={isOpen} onCancel={onClose} width={300} footer={[
      <Button key="submit" block type="primary" onClick={() => window.open(link, '_blank')}>
        Open {walletInfo?.name}
      </Button>,
    ]}>
      <h2>Connect to {walletInfo?.name}</h2>

      <QRCode size={250} value={link} />

    </Modal>
  )
}

export default QRCodeModal