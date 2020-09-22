import React from 'react';
import { useSelector } from 'react-redux'
import _ from 'loadsh'
import Charge from './Charge';


 const Wallet = () => {
     const UserId = _.get(useSelector(state => state), 'auth.user.id', '')
     // console.log(UserId)
    return <Charge UserId = {UserId}> </Charge>
}

export default Wallet