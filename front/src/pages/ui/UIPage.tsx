/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom"
import s from './UIPage.module.css'
import { useTranslation } from "react-i18next"
import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react"
import SendFrom from "../../components/sendForm/SendForm"

type FieldType = {
  address?: string;
};

const UIPage = () => {
  const { t } = useTranslation()
  const [tonConnectUI] = useTonConnectUI();

  const handleSubmit = async ({ address }: FieldType) => {
    const transaction: any = {
      messages: [
        {
          address: address, // destination address
          amount: "100000000" //Toncoin in nanotons
        }
      ]
    }
    await tonConnectUI.sendTransaction(transaction)
  }

  return (
    <div className={s.connect}>
      <Link to='/' className={s.links}>Home </Link>
      {t("connections")}
      <TonConnectButton />
      <SendFrom handleSubmit={handleSubmit } />
    </div>
  )
}

export default UIPage