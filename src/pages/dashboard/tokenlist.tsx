import React, { useEffect } from 'react';
import { fetchTokens } from '../../state/token';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { denoms } from '../../constants/chainsConfig';

const TokenList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tokens, status } = useAppSelector((state) => state.tokenState);
  const selectedEVm = useAppSelector((state) => state.evmState.selectedEvm);

  useEffect(() => {
    if (selectedEVm !== "") {
      denoms.map((denom, index) => {
        dispatch(fetchTokens({ selectedEVm, denom }));
      })
    }

  }, [selectedEVm, denoms]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Failed to fetch tokens.</div>;
  }

  return (
    <div>
      <h1>Token List</h1>
      <table className='w-full'>
        <thead>
          <tr>
            <th>TokenName</th>
            <th>Balance</th>
            <th>Price</th>
            <th>Value(USD)</th>
            <th>%Holdings</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <tr className='text-sm text-center'>
              <td><strong>{token.name}</strong> ({token.symbol})</td>
              <td>{token.balance_formatted}</td>
              <td>{token.usd_price}</td>
              <td>{token.usd_value}</td>
              <td>{token.portfolio_percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TokenList;