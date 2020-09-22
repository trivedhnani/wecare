import React, {useEffect,useState} from "react";
import { useSelector } from 'react-redux'
import axios from "axios";
import _ from "loadsh";
import * as numeral from "numeral";
// import { Link } from "react-router-dom";
import './PayButton.css'

const  PayWithWallet = ({onSuccess,total}) =>{
    const totalAmount = numeral(total)._value
    console.log(totalAmount)
    const UserId = _.get(useSelector(state => state), 'auth.user.id', '')
    const [availableBalance, setBalance] = useState('');
    useEffect(() => {
        async function fetchData() {
            const result = await axios.get("/api/amount?id="+UserId, {
                params: {
                    UserID: UserId
                }
            });
            setBalance(_.get(result, "data.message.amount",'0'));
        }
        fetchData();
    }, []);

    const handlePayment = async () => {
        // event.preventDefault();
        if (availableBalance >= totalAmount) {
            const DecreaseWalletAmount = await axios.post("/api/amount", {
                UserId: UserId,
                amount: -totalAmount,
            });
            if(DecreaseWalletAmount.status === 204){
                // alert("Successfully payed from wallet:Thanks")
                onSuccess()
            }

        }
        else{
            alert('Please Add Amount in your wallet')
        }
    }
    return <a className="button3" onClick={() => handlePayment()}>Pay with Wallet</a>
}

export default PayWithWallet