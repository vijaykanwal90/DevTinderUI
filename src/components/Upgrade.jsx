import React from 'react'
import { useState } from 'react'
import { BASE_URL } from '@/constants'
const Upgrade = () => {
  const [isPremium,setIsPremium] = useState(false)
  const verifyPremium = async ()=>{
    const res = await axios.get(`${BASE_URL}/payment/verify`,{
      withCredentials:true
    })
    if(res.data.isPremium){
      setIsPremium(true)
    }
    // setIsPremium(res.data.isPremium)
  }
  const handleClick = async(type)=>{
      const order = await axios.post(` ${BASE_URL}/payment/create`,{
        membershipType:type,
      },{
        withCredentials:true
      }
    )
    // it should open razor pay dialog box
    const {amount,currency,name,notes,keyId,emailId,orderId} = order.data;
    const options = {
      key:keyId,
      amount,
      currency,
      name: "DevTinder",
      description: "Connect to other developers", 
      order_id:orderId,
    
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email:notes.emailId,
      },
      theme:{
        color:"#3399cc"
      }
    }
    const rzp= new Razorpay(options);
    rzp.open();

  }
 useEffect(()=>{
verifyPremium()
 },[])
  return (
    <>
    {isPremium ? (<p>you are already a premium user</p>):(
    <div className=' w-full flex justify-center items-center gap-4 px-4'>
        <div className='h-[300px] w-4/12 border-2 rounded-lg bg-gradient-to-r from-indigo-200 to-violet-300 text-center py-4'>
            <h1 className='text-2xl font-bold '>Upgrade to Silver User</h1>
            <div className='text-left my-8 px-4' >
            <p>Get Verfified Badge</p>
            <p>Get feature to chat with other people</p>
            <p>connect to 50% more people than normal user </p>
            </div>
            <button className=' mt-12 border-2 border-black outline-2 rounded-md px-2 ' onClick={()=> handleClick("silver")}>Upgrade to silver</button>
 
           
        </div>
        <div className='h-[300px] w-4/12 border-2 rounded-lg  text-center py-4 bg-gradient-to-r from-yellow-200 to-yellow-500'>
        <h1 className='text-2xl font-bold'>Upgrade to Gold User</h1>
        <div className='text-left my-8 px-4' >
            <p>Get Verfified Badge</p>
            <p>Get feature to chat with other people</p>
            <p>connect to all  people </p>
            <p>Get feature to send gifts to others</p>
            <p>Get feature of Video and voice Call</p>
            </div>
            <button className='mb-4 border-2 border-black outline-2 rounded-md px-2 ' onClick={()=> handleClick("gold")}>Upgrade to Gold</button>
        </div>
    </div>)}
    </>
  )
}

export default Upgrade