import React, { useState } from 'react';
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
      {/* Renderizar la información de DNS aquí */}
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

export default DnsInventory;
