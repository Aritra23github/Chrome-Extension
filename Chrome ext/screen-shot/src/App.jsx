import { useEffect, useRef, useState } from 'react';
import DeleteImage from './components/DeleteImage';
import DownloadImage from './components/DownloadImage';
import AutoScoll from './components/AutoScoll';

function App() {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('screenshot');
  const canvasRef = useRef(null);
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(300);
  const [isDrawing, setIsDrawing] = useState(false);
  const [finalDownloadedImage, setFinalDownloadedImage] = useState(null);

  const captureScreen = async () => {
    // await chrome.tabs.captureVisibleTab(null, { format: "png" },function (screenshotDataUrl){
    //   setImage(screenshotDataUrl);
    // });

    setTimeout(function() {
      chrome.tabs.query({
        active: true,
        currentWindow: true,
        lastFocusedWindow: true
      }, 
        function(tabs){
          console.log('tabs', tabs);
          chrome.tabs.captureVisibleTab(
            { format: "png" },
            function(src) {
              setImage(src);
            }
          );
        }
      );
    }, 1000);
  }

  const clickOnCanvas = () => {
    if (image) {
      setWidth(700);
      setHeight(500);
    }
  }

  // const deleteScreenshot = () => {
  //   setImage(null);
  //   canvasRef.current = null;
  // }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const loadImage = () => {
      const img = new Image();
      if (image == null) img.src = null;
      else img.src = image;
      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    }

    loadImage();
  }, [image, width]);

  const mouseMoveEvent = (event) => {
    if (image) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
  
      if (isDrawing) {
        context.lineTo(event.clientX, event.clientY);
        context.stroke();
      }
    }
  }

  const mouseDownEvent = (event) => {
    if (image) {
      setIsDrawing(true);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
  
      // context.beignPath();
      // context.strokeStyle = 'red'; //TODO: Need to Check
      context.lineJoin = "round";
      context.lineCap = "round";
      context.moveTo(event.clientX, event.clientY);
    }
  }

  const mouseUpEvent = (event) => {
    if (image) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.closePath();
    }
  }

  const downloadEditedImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const imageURL = canvas.toDataURL(imageData);

    const link = document.createElement('a');
    link.href = imageURL;
    link.download = imageName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div style={{ width: width, height: height }} className='bg-transparent place-items-center'>
      <input 
        type="text" 
        className="my-2 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name="file_name" 
        id="file_name" 
        value={imageName} 
        onChange={(event) => setImageName(event.target.value)}
        placeholder='screenshot'
      />
      
      <canvas 
        ref={canvasRef} 
        height={height} 
        width={width}
        className='border-black cursor-pointer' 
        onClick={clickOnCanvas}
        onMouseMove={mouseMoveEvent}
        onMouseDown={mouseDownEvent}
        onMouseUp={mouseUpEvent}
      />

      {/* <img src={image} alt="" /> */}
      
      <div className='flex gap-5 ml-2 my-2'>
        {
          image 
            ?
            <>
              {/* <DeleteImage 
                onDelete={deleteScreenshot} 
              /> */}

              <DownloadImage 
                onImageDownload={downloadEditedImage}
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

          {/* <AutoScoll /> */}
        </div>
      </div>
          
      
    </div>
  )
}

export default App
