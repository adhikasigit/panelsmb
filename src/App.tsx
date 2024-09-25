import React, { useState, useEffect } from 'react';
import './App.css';
import imageData from './imageData.json';

interface ImageData {
  [key: string]: {
    dhd?: string;
    dsd?: string;
    s?: string;
    wfs?: string;
    am?: string;
    as?: string;
    e?: string;
    ds?: string;
  };
}

function App() {
  const [images, setImages] = useState<ImageData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      if (imageData && imageData.data) {
        setImages(imageData.data);
      } else {
        throw new Error('Unexpected data structure');
      }
      setLoading(false);
    } catch (err) {
      console.error('Error details:', err);
      setError(`Failed to load images: ${err instanceof Error ? err.message : String(err)}`);
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="App">
      <h1>Image Viewer</h1>
      <div className="image-grid">
        {Object.entries(images).map(([id, imageData]) => {
          const imageSource = imageData.dhd || imageData.dsd || imageData.s || imageData.wfs || imageData.am || imageData.as || imageData.e || imageData.ds;
          const imageType = imageData.dhd ? 'DHD' : imageData.dsd ? 'DSD' : imageData.s ? 'S' : imageData.wfs ? 'WFS' : imageData.am ? 'AM' : imageData.as ? 'AS' : imageData.e ? 'E' : 'DS';
          
          return (
            <div key={id} className="image-item">
              {imageSource && <img src={imageSource} alt={`Image ${id} (${imageType})`} />}
              <p>ID: {id}</p>
              <p>Type: {imageType}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;