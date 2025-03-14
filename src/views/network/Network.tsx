import { axiosInstance } from '../../utils/api';
import React, { useEffect, useState } from 'react';

// Definisikan tipe data untuk network detail
type NetworkDetail = {
  contractAddress: string;
  creator: string;
  deploymentTimestamp: string;
  network: {
    name: string;
    chainId: number;
  };
};

const Network = () => {
  const [networkDetail, setNetworkDetail] = useState<NetworkDetail | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get<NetworkDetail>(
          'http://localhost:5026/api/technical_assessment'
        );
        if (res.data) {
          setNetworkDetail(res.data);
        } else {
          console.log('Failed to get data from api');
        }
      } catch (err) {
        console.error('API error:', err);
        setError('Failed to fetch network details');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h2>Network Details</h2>
      <p>
        <strong>Contract Address:</strong> {networkDetail?.contractAddress}
      </p>
      <p>
        <strong>Creator:</strong> {networkDetail?.creator}
      </p>
      <p>
        <strong>Deployment Time:</strong> {networkDetail?.deploymentTimestamp}
      </p>
      <p>
        <strong>Network Name:</strong>{' '}
        {networkDetail?.network?.name == 'unknown'
          ? 'Localhost'
          : networkDetail?.network?.name}
      </p>
      <p>
        <strong>Chain ID:</strong>{' '}
        {networkDetail?.network?.chainId || 'Unknown'}
      </p>
    </div>
  );
};

export default Network;
