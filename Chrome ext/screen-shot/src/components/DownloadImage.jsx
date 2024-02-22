import React, { useState } from 'react'

const DownloadImage = ({onImageDownload}) => {

  return (
    <div>
        <button 
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={onImageDownload}
        >
            Download
        </button>
    </div>
  )
}

export default DownloadImage