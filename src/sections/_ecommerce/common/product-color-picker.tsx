import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack, { StackProps } from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

interface Props extends StackProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // options: {
  //   label: string;
  //   value: string;
  // }[]
  option: string;
}

export default function ProductColorPicker({ value, option, onChange, sx }: Props) {
  return (
    <RadioGroup row value={value} onChange={onChange}>
      <Stack
          key={option}
          alignItems="center"
          justifyContent="center"
          sx={{
            m: 1,
            width: 32,
            height: 32,
            borderRadius: 1,
            position: 'relative',
            bgcolor: "#F0F8FF",
            color: 'common.black',
            ...sx,
          }}
        >
          {value === option && <Iconify icon="carbon:checkmark" />}

          <FormControlLabel
            value={option}
            control={<Radio sx={{ display: 'none' }} />}
            label=""
            sx={{
              m: 0,
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              position: 'absolute',
            }}
          />
        </Stack>
    </RadioGroup>
  );
}
