import React from 'react'
import { animateScroll as scroll } from 'react-scroll';

const AutoScoll = () => {
    const handleAutoScroll = () => {
        console.log(chrome);
        scroll.scrollToBottom();
    }
  return (
    <div>
        <button 
            type="button"
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
            onClick={handleAutoScroll}
        >
            Auto Scroll
        </button>
    </div>
  )
}

export default AutoScoll