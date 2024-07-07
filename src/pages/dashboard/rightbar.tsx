import { useDispatch } from 'react-redux';
import { toggleSelectEvm } from '../../state/evm';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
const RightBar = () => {

  const evmAddress = useAppSelector((state) => state.evmState.address);
  const dispatch = useDispatch();

  return (
    <div className="h-[100vh] w-64 border-l-2 bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Address</h1>
      </div>
      {
        evmAddress.map((address, index) => (
          <nav className="flex flex-col flex-wrap items-center my-6 mx-2">
            <a href="#"
              onClick={() => { dispatch(toggleSelectEvm(address)) }}
              key={index} className="text-center bg-gray-dark-1 border-2 mb-1 w-full border-gray-dark-1 rounded-xl py-2.5 px-4 transition duration-200 hover:bg-gray-dark-3">
              <p className='break-all'>{address}</p>
            </a>
          </nav>
        ))
      }
    </div>
  );
};

export default RightBar;