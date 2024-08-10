import { useSnackbar } from 'notistack';

export const useSnackbarHelper = () => {
  const { enqueueSnackbar } = useSnackbar();
  return enqueueSnackbar;
};