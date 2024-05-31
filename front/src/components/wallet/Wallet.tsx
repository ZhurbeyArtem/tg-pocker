import { Button, Dropdown, } from 'antd'
import { FunctionComponent } from 'react'
import { useWallet } from '../../hooks/useWallet';
import { connector } from '../../connector';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CHAIN, toUserFriendlyAddress } from '@tonconnect/sdk';
import { useConnectionRestored } from '../../hooks/useConnectionRestored';
import { toast } from 'react-toastify';


const Wallet: FunctionComponent<{ onConnect: () => void }> = ({ onConnect }) => {
  
  const wallet = useWallet();
  const userFriendlyAddress = wallet ? toUserFriendlyAddress(wallet?.account.address, wallet.account.chain === CHAIN.TESTNET) : '';
  const slicedAddress = userFriendlyAddress.slice(0, 4) + '...' + userFriendlyAddress.slice(-4)
  const isConnectionRestored = useConnectionRestored();

  const items = [{
    key: '1',
    label: (
      <CopyToClipboard text={userFriendlyAddress}>
        <Button type="primary" onClick={() => toast.success('Copied!')}>{"Copy Address"}</Button>
      </CopyToClipboard>
    )
  },
  {
    key: '2',
    label: (
      <Button type="primary" onClick={() => connector.disconnect()}>Disconnect</Button>
    )
  }

  ]

  return (
    <div>
      {
        wallet
          ?
          <Dropdown menu={{ items }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Button>{slicedAddress}</Button>
            </a>
          </Dropdown>

          : <Button onClick={onConnect}>{isConnectionRestored ? "Connect wallet" : 'Loading...'}</Button>
      }
    </div>
  )
}

export default Wallet