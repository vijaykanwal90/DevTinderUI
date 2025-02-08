import React from 'react'

const Upgrade = () => {
  return (
    <div className=' w-full flex justify-center items-center gap-4 px-4'>
        <div className='h-[300px] w-4/12 border-2 rounded-lg bg-gradient-to-r from-indigo-200 to-violet-300 text-center py-4'>
            <h1 className='text-2xl font-bold '>Upgrade to Silver User</h1>
            <div className='text-left my-8 px-4' >
            <p>Get Verfified Badge</p>
            <p>Get feature to chat with other people</p>
            <p>connect to 50% more people than normal user </p>
            </div>
            <button className=' mt-12 border-2 border-black outline-2 rounded-md px-2 '>Upgrade to silver</button>
 
           
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
            <button className='mb-4 border-2 border-black outline-2 rounded-md px-2 '>Upgrade to Gold</button>
        </div>
    </div>
  )
}

export default Upgrade