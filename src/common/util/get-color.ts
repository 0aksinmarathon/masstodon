export const getColor = (progress: number) => {
	if (progress === 100) return 'OrangeRed';
	if (progress < 20) return 'DarkBlue';
	if (progress < 40) return 'LightSeaGreen';
	if (progress < 60) return 'GreenYellow';
	if (progress < 80) return 'Gold';
	else return 'Orange';
};

export const getStatusColor = (status: string) => {
	if (status === 'archived') return 'bg-slate-800';
	if (status === 'finished') return 'bg-red-800';
	if (status === 'workInProgress') return 'bg-green-800';
	if (status === 'planning') return 'bg-blue-700';
	else throw new Error('Unknown status');
};

export const getDisplayStatus = (status: string) => {
	if (status === 'archived') return 'Archived';
	if (status === 'finished') return 'Finished';
	if (status === 'workInProgress') return 'Work In Progress';
	if (status === 'planning') return 'Planning';
	else throw new Error('Unknown status');
};
