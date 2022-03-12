import { useCallback, useMemo, useReducer } from 'react';

import useLatest from './useLatest';

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SEND_REQUEST':
      return {
        ...state,
        loading: true,
        isSuccess: false,
        isError: false,
      };

    case 'SEND_REQUEST_SUCCESS':
      return {
        ...state,
        data: payload,
        loading: false,
        isSuccess: true,
      };

    case 'SEND_REQUEST_FAILED':
      return {
        ...state,
        loading: false,
        isError: true,
      };

    case 'RESET':
      return payload;

    default:
      return state;
  }
};

const useAPI = ({ initialValue, queryFn = async () => {} } = {}) => {
  const initialState = useMemo(
    () => ({
      data: initialValue,
      loading: false,
      isSuccess: false,
      isError: false,
    }),
    [initialValue]
  );

  const queryFnRef = useLatest(queryFn);

  const [state, dispatch] = useReducer(reducer, initialState);

  const send = useCallback(
    async (payload) => {
      dispatch({ type: 'SEND_REQUEST' });
      try {
        const result = await queryFnRef.current(payload);
        dispatch({ type: 'SEND_REQUEST_SUCCESS', payload: result });
        return Promise.resolve(result);
      } catch (error) {
        dispatch({ type: 'SEND_REQUEST_FAILED' });
        return Promise.reject(error);
      }
    },
    [queryFnRef]
  );

  const reset = useCallback(() => {
    dispatch({ type: 'RESET', payload: initialState });
  }, [initialState]);

  return {
    ...state,
    send,
    reset,
  };
};

export default useAPI;
