import React from 'react';

const Card = (props: any) => {
	const {
		title,
		description,
		startDate,
		endDate,
		dueDate,
		progress: taskProgress,
	} = props.task;
	const [progress, setProgress] = React.useState(props.progress);

	const handleChange = (event: Event, newValue: number | number[]) => {
		if (typeof newValue === 'number') {
			setProgress(newValue);
		}
	};
	return (
		<div className='rounded-md bg-gray-400 shadow-sm px-5 py-4'>
			<div className='font-semibold'>{title}</div>
			<div>{description}</div>
			<div>{startDate}</div>
			<div>{endDate}</div>
			<div>{dueDate}</div>
		</div>
	);
};

export default Card;
