/*import React, { useState } from 'react';
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
      { }
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

export default MaliciousUrlChecker;*/



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
    try {
      const responses = await Promise.all(urls.map(url => axios.get(`http://localhost:5000/url/${url}`)));
      const data = responses.map(response => response.data);
      const updatedData = data.map(item => {
        const analysisResults = Object.values(item.data.attributes.last_analysis_results);
        const maliciousResults = analysisResults.filter(result => result.category === 'malicious');
        const harmlessResults = analysisResults.filter(result => result.category === 'harmless');
        const maliciousCount = maliciousResults.length;
        const detectionTypes = maliciousResults.map(result => result.result).filter(Boolean);
        
        const topMaliciousProviders = maliciousResults
          .sort((a, b) => (a.engine_name > b.engine_name) ? 1 : -1)
          .slice(0, 5)
          .map(result => result.engine_name);
          
        const topHarmlessProviders = harmlessResults
          .sort((a, b) => (a.engine_name > b.engine_name) ? 1 : -1)
          .slice(0, 5)
          .map(result => result.engine_name);

        return {
          ...item,
          score: maliciousCount,
          isMalicious: maliciousCount > 0,
          detectionTypes,
          topMaliciousProviders,
          topHarmlessProviders
        };
      });
      setUrlData(updatedData);
    } catch (error) {
      console.error('Error fetching URL data:', error);
    }
  };

  return (
    <div>
      <h2>Análisis de URLs Maliciosas</h2>
      <button onClick={fetchUrlData}>Obtener datos de URLs</button>
      <div>
        {urlData.length > 0 && (
          <table style={{ border: '2px solid blue', borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid blue', padding: '8px', textAlign: 'left' }}>URL</th>
                <th style={{ border: '1px solid blue', padding: '8px', textAlign: 'left' }}>Categorías</th>
                <th style={{ border: '1px solid blue', padding: '8px', textAlign: 'left' }}>Es Maliciosa</th>
                <th style={{ border: '1px solid blue', padding: '8px', textAlign: 'left' }}>Score</th>
                <th style={{ border: '1px solid blue', padding: '8px', textAlign: 'left' }}>Tipo de detección</th>
                <th style={{ border: '1px solid blue', padding: '8px', textAlign: 'left' }}>Top 5 Proveedores (Maliciosa)</th>
                <th style={{ border: '1px solid blue', padding: '8px', textAlign: 'left' }}>Top 5 Proveedores (No Maliciosa)</th>
              </tr>
            </thead>
            <tbody>
              {urlData.map((data, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid blue', padding: '8px', textAlign: 'left' }}>{urls[index]}</td>
                  <td style={{ border: '1px solid blue', padding: '8px', textAlign: 'left' }}>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                      {Object.keys(data.data.attributes.categories).map((category, i) => (
                        <li key={i}>
                          <strong>{category}: </strong>
                          {data.data.attributes.categories[category]}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td style={{ border: '1px solid blue', padding: '8px', textAlign: 'left' }}>
                    {data.isMalicious ? 'Sí' : 'No'}
                  </td>
                  <td style={{ border: '1px solid blue', padding: '8px', textAlign: 'left' }}>
                    {data.score}
                  </td>
                  <td style={{ border: '1px solid blue', padding: '8px', textAlign: 'left' }}>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                      {data.detectionTypes.map((type, i) => (
                        <li key={i}>{type}</li>
                      ))}
                    </ul>
                  </td>
                  <td style={{ border: '1px solid blue', padding: '8px', textAlign: 'left' }}>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                      {data.topMaliciousProviders.map((provider, i) => (
                        <li key={i}>{provider}</li>
                      ))}
                    </ul>
                  </td>
                  <td style={{ border: '1px solid blue', padding: '8px', textAlign: 'left' }}>
                    {!data.isMalicious ? (
                      <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {data.topHarmlessProviders.map((provider, i) => (
                          <li key={i}>{provider}</li>
                        ))}
                      </ul>
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MaliciousUrlChecker;
