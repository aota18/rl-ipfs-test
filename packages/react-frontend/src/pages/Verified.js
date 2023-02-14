import React, { useEffect, useState } from 'react';
import useQuery from '../hooks/useQuery';
import SbtServices from '../services/SbtServices';
import TicketServices from '../services/TicketServices';
import { notifyError } from '../utils/toast';

const Verified = () => {
  const [isVerified, setIsVerified] = useState(false);

  const query = useQuery();

  const verify = async (ticketId, ownerId, eventId) => {
    try {
      const result = await TicketServices.verify(ticketId);

      if (result.status !== 200) {
        throw new Error('Cannot verify ticket!');
      }

      const sbtCreateResult = await SbtServices.createSbt({
        ownerId,
        eventId,
      });

      setIsVerified(true);
    } catch (err) {
      console.error(err);
      notifyError(err.message);
      setIsVerified(false);
    }
  };

  useEffect(async () => {
    const ticketId = query.get('t');
    const ownerId = query.get('o');
    const eventId = query.get('e');

    await verify(ticketId, ownerId, eventId);
  }, []);
  return <div>Verified</div>;
};

export default Verified;
