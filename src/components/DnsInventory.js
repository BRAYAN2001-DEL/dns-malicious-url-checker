/*import React, { useState } from 'react';
import axios from 'axios';

const DnsInventory = () => {
  const [domains, setDomains] = useState(['telconet.ec', 'telconet.net', 'netlife.ec', 'megadatos.net']);
  const [dnsData, setDnsData] = useState([]);

  const fetchDnsData = async () => {
    const responses = await Promise.all(domains.map(domain => axios.get(`http://localhost:5000/dns/${domain}`)));
    setDnsData(responses.map(response => response.data));
  };

  return (
    <div>
      <h2>Inventario de DNS</h2>
      <button onClick={fetchDnsData}>Obtener datos DNS</button>
      {}
      <div>
        {dnsData.map((data, index) => (
          <div key={index}>
            <h3>{domains[index]}</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DnsInventory;*/


import React, { useState } from 'react';
import axios from 'axios';

const DnsInventory = () => {
  const [domains, setDomains] = useState(['telconet.ec', 'telconet.net', 'netlife.ec', 'megadatos.net']);
  const [dnsData, setDnsData] = useState([]);

  const fetchDnsData = async () => {
    try {
      const responses = await Promise.all(domains.map(domain => axios.get(`http://localhost:5000/dns/${domain}`)));
      setDnsData(responses.map(response => response.data));
    } catch (error) {
      console.error('Error fetching DNS data:', error);
    }
  };

  return (
    <div>
      <h2>Inventario de DNS</h2>
      <button onClick={fetchDnsData}>Obtener datos DNS</button>

      <div className="dns-table">
        {dnsData.map((data, index) => (
          <div key={index} className="domain-info">
            <h3>{domains[index]}</h3>
            <table>
              <tbody>
                {Object.entries(data).map(([type, records]) => (
                  <tr key={type}>
                    <td>{type}</td>
                    <td>
                      {Array.isArray(records) ? (
                        <ul>
                          {records.map((record, idx) => (
                            <li key={idx}>{record}</li>
                          ))}
                        </ul>
                      ) : (
                        <pre>{records}</pre>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <style jsx>{`
        .dns-table {
          margin-top: 20px;
        }
        .domain-info {
          margin-bottom: 40px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background-color: #cceeff; /* Color de fondo azul claro */
          border: 1px solid #ddd; /* Borde ligero */
        }
        th, td {
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #0099cc; /* Color de fondo azul */
          color: white;
        }
        ul {
          margin: 0;
          padding-left: 20px;
        }
        pre {
          white-space: pre-wrap;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default DnsInventory;
