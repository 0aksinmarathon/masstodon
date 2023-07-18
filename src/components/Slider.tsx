import { withStyles } from '@mui/styles';
import Slider, { SliderProps } from '@mui/material/Slider';

const CustomSlider = withStyles({
	rail: {
		backgroundImage: 'linear-gradient(.25turn, #f00, #00f)',
	},
	track: {
		backgroundImage: 'linear-gradient(.25turn, #f00, #00f)',
	},
})(Slider);

export default function ContinuousSlider({
	value,
	handleChange,
}: {
	value: number;
	handleChange: SliderProps['onChange'];
}) {
	return <CustomSlider value={value} onChange={handleChange} />;
}
