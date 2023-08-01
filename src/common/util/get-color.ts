export const getColor = (progress: number) => {
	if (progress === 100) return 'OrangeRed';
	if (progress < 20) return 'DarkBlue';
	if (progress < 40) return 'LightSeaGreen';
	if (progress < 60) return 'GreenYellow';
	if (progress < 80) return 'Gold';
	else return 'Orange';
};
