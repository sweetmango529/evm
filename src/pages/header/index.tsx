import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { toggleAddModal } from '../../state/modal';

const Header = () => {

  const { tokens, status, totalUsd } = useAppSelector((state) => state.tokenState);
  const amoutToken = useAppSelector((state) => state.chainState);
  const dispatch = useAppDispatch();

  return (
    <div className={`flex w-full h-[12vh] justify-between items-center bg-gray-dark-2 px-12 gap-4 z-10`}>
      <div className="flex items-center gap-4 md:gap-12">
        <p className='text-xl'>Total USD: </p>
        <p>{totalUsd}</p>
      </div>
      <div className=" flex gap-14">
        <button className="border-2 border-gray-light-1 rounded-md hover:bg-gray-dark-3 p-4"
          onClick={() => { dispatch(toggleAddModal(true)) }}>Add New Address</button>
      </div>
    </div>
  );
};

export default Header;