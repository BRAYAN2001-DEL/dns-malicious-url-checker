import React, { useState } from 'react';
import axios from 'axios';

const MaliciousUrlChecker = () => {
  const [urls, setUrls] = useState([
    'mypmail.top',
    'www.first.org',
    'polycomusa.com',
    'qwepoi123098.com',
    'www.github.com',
    'aideca.org.pe',
    '2022.stateofjs.com',
    'reiaya.com'
  ]);
  const [urlData, setUrlData] = useState([]);

  const fetchUrlData = async () => {
    const responses = await Promise.all(urls.map(url => axios.get(`http://localhost:5000/url/${url}`)));
    setUrlData(responses.map(response => response.data));
  };

  return (
    <div>
      <h2>Análisis de URLs Maliciosas</h2>
      <button onClick={fetchUrlData}>Obtener datos de URLs</button>
      {/* Renderizar la información de URLs aquí */}
      <div>
        {urlData.map((data, index) => (
          <div key={index}>
            <h3>{urls[index]}</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaliciousUrlChecker;
