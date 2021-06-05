import { useContext } from 'react';

import LoadingContext from '../contexts/loading';

const useLoading = () => {
  const { showLoading, setShowLoading } = useContext(LoadingContext);

  const updateStateLoading = isShowLoading => {
    setShowLoading(isShowLoading);
  };

  return { isShowLoading: showLoading, updateStateLoading };
};

export default useLoading;
