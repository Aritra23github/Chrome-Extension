import { useState } from 'react';
import DeleteImage from './components/DeleteImage';
import DownloadImage from './components/DownloadImage';

function App() {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('screenshot');
  const [isDownloadCompleted, setIsDownloadCompleted] = useState(false);

  const captureScreen = async () => {
    chrome.tabs.captureVisibleTab(null, { format: "png" },function (screenshotDataUrl){
      setImage(screenshotDataUrl);
    });
  }

  const handleImageDownload = () => {
    setIsDownloadCompleted(true);
  }

  return (
    <div className='h-80 w-80 bg-transparent place-items-center'>
      <input 
        type="text" 
        className="my-2 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name="file_name" 
        id="file_name" 
        value={imageName} 
        onChange={(event) => setImageName(event.target.value)}
        placeholder='screenshot'
      />

      {
        image ? <img src={image} alt="screen-shot" /> : <></>
      }
      
      <div className='flex gap-5 ml-2 my-2'>
        {
          image 
            ?
            <>
              <DeleteImage 
                onDelete={() => setImage(null)} 
              />

              <DownloadImage 
                imgSrc={image} 
                imageName={imageName}
              />
            </>
            :
            <></>
        }
        
        <div className='content-center'>
          <button 
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
            onClick={captureScreen}
          >
            Capture
          </button>
        </div>
      </div>
          
      
    </div>
  )
}

export default App
