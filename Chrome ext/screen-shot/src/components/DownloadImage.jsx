import React, { useState } from 'react'

const DownloadImage = ({imgSrc, imageName}) => {

    const downloadImageContent = async () => {
        try {
            const image = await fetch(imgSrc);
            const imageBlob = await image.blob();
            const imageURL = URL.createObjectURL(imageBlob);

            const link = document.createElement('a');
            link.href = imageURL;
            link.download = imageName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setIsDownloadCompleted(true);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
        <button 
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={downloadImageContent}
        >
            Download
        </button>
    </div>
  )
}

export default DownloadImage