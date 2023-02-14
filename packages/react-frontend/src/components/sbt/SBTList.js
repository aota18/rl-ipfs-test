import React, { useState } from 'react';
import useAsync from '../../hooks/useAsync';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import SbtServices from '../../services/SbtServices';
import Loading from '../Loading';
import SBTModal from '../modal/SBTModal';
import NotFound from '../NotFound';

const CollectedSBTList = ({ items, loading }) => {
  const { handleModalOpen } = useToggleDrawer();

  const [selectedSBT, setSelectedSBT] = useState(null);

  const onClickSBT = (sbt) => {
    setSelectedSBT(sbt);
    handleModalOpen('sbt');
  };

  return (
    <>
      <SBTModal sbt={selectedSBT} />

      <div className="grid grid-cols-6 gap-4">
        {loading ? (
          <Loading />
        ) : items.length === 0 ? (
          <div className="col-span-6">
            <NotFound title={'sbt'} />
          </div>
        ) : (
          items &&
          items?.map((item, id) => (
            <div
              className="col-span-2 flex flex-col justify-center items-center cursor-pointer"
              onClick={() => onClickSBT(item)}
              key={id}
            >
              <img
                src={item.imgUrl}
                className="rounded-full w-20 h-20"
                alt="sbt"
              />
              {item.status === 'CREATED' ? (
                <div className="bg-green-500 text-white rounded-md px-1">
                  Mint me!
                </div>
              ) : (
                ''
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default CollectedSBTList;
