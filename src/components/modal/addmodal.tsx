import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { toggleAddModal } from '../../state/modal';
import ButtonStatus from '../../type/button_status';
import PrimaryButton from '../primary_button';
import { toggleAddAddress } from '../../state/evm';

const AddModal = () => {
  const isOpen = useAppSelector((state) => state.modalState.bAddModal);
  const list = useAppSelector((state) => state.chainState);
  const dispatch = useAppDispatch();

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData.getData('Text');
    dispatch(toggleAddAddress(pastedData));
  };

  return (
    <div className={`${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="rounded-lg w-2/6 bg-gray-dark-2 border-gray-light-3 border-2">
          <div className="flex justify-between m-6 items-center">
            <h2 className="text-lg font-semibold">Add New Address</h2>
            <button
              className="text-gray-700"
              onClick={() => { dispatch(toggleAddModal(false)) }}
            >
              <img src="/img/close.svg" alt="close" />
            </button>
          </div>
          <div className="flex my-6 px-10 text-center flex-col justify-center items-center gap-6">
            <input className='w-full h-[35px] p-2 rounded-sm text-black'
              onPaste={handlePaste}
              placeholder="Input Address..."
            />
          </div>
          <div className='flex justify-between px-12 mb-6'>
            <PrimaryButton
              type={ButtonStatus.disabled}
              onClick={() => { dispatch(toggleAddModal(false)) }}
              className="" >
              Cancel
            </PrimaryButton>
            <PrimaryButton className=""
              type={ButtonStatus.active}
              onClick={() => { dispatch(toggleAddModal(false)) }}
            >
              <p className="text-sm md:text-base font-semibold">
                Save
              </p>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModal;