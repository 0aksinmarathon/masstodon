import { v4 as uuidv4 } from 'uuid';
import { Todo } from './stores/todos/todo.slice';

export const dummyUserId = 1;

export const dummyDetail: Todo = {
	id: 1,
	title:
		'Memorize the spell of supercalifragilisticexpialidocious and the whole lyrics of the song',
	description:
		'Memorize the spell of supercalifragilisticexpialidocious and the whole lyrics of the song. To achieve this goal, need to write down the spell 10 times a day and practice singing 5 times a day.',
	progress: 50,
	isPrivate: true,
	startDate: '2023/01/01',
	endDate: '2023/01/01',
	dueDate: '2023/01/01',
	sortKey: 10,
	tags: [
		{ name: 'cooking' },
		{ name: 'ethnic' },
		{ name: 'international' },
		{ name: 'difficult' },
		{ name: 'daily' },
	],
	comments: [
		{
			userName: 'Stardust Crusader',
			content: 'Much support and of love from middle of no mans land',
		},
		{ userName: 'Doge', content: 'what  is the sense of doing this btw?' },
		{
			userName: 's0me_tr4ve1er',
			content:
				'looking forward to seeing you singing supercalifragilisticexpialidocious at Spanish steps in Rome.',
		},
		{
			userName: 'young Werther',
			content: 'being troubled by sorrows',
		},
		{
			userName: 'sonorous_speaker',
			content:
				'this is such a long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long comment.',
		},
	],
	// likeCount: 43,
};
export const dummyData = [
	{
		// id: uuidv4(),
		id: 'planning',
		title: 'Planning',
		tasks: [
			{
				id: uuidv4(),
				title:
					'Memorize the spell of supercalifragilisticexpialidocious and the whole lyrics of the song',
				description:
					'Memorize the spell of supercalifragilisticexpialidocious and the whole lyrics of the song. To achieve this goal, need to write down the spell 10 times a day and practice singing 5 times a day.',
				progress: 10,
				isPrivate: true,
				startDate: '2023/01/01',
				endDate: '2023/01/01',
				dueDate: '2023/01/01',
				sortKey: 10,
				tags: [
					{ name: 'cooking' },
					{ name: 'ethnic' },
					{ name: 'international' },
					{ name: 'difficult' },
					{ name: 'daily' },
				],
				commentCount: 129,
				likeCount: 43,
			},
			{
				id: uuidv4(),
				title: 'task2',
				description: 'vjcashvjd',
				progress: 30,
				isPrivate: true,
				startDate: '2023/04/01',
				endDate: '2023/04/01',
				dueDate: '2023/04/01',
				sortKey: 20,
				tags: [
					{ name: 'aaaaaaaaaaaaaaaaaaaa' },
					{ name: 'bbbbbbbbbbbbbbbbbbbb' },
					{ name: 'cccccccccccccccccccc' },
					{ name: 'dddddddddddddddddddd' },
					{ name: 'eeeeeeeeeeeeeeeeeeee' },
				],
				commentCount: 129,
				likeCount: 43,
			},
			{
				id: uuidv4(),
				title: 'task3',
				description: 'vjcashvjd',
				progress: 50,
				isPrivate: true,
				startDate: '2023/06/01',
				endDate: '2023/06/01',
				dueDate: '2023/06/01',
				sortKey: 30,
				tags: [
					{ name: 'aaaaaaaaaaaaaaaaaaaa' },
					{ name: 'bbbbbbbbbbbbbbbbbbbb' },
					{ name: 'cccccccccccccccccccc' },
					{ name: 'dddddddddddddddddddd' },
					{ name: 'eeeeeeeeeeeeeeeeeeee' },
				],
				commentCount: 129,
				likeCount: 43,
			},
		],
	},
	{
		// id: uuidv4(),
		id: 'workInProgress',
		title: 'Work In Progress',
		tasks: [
			{
				id: uuidv4(),
				title: 'task5',
				description: 'vjcashvjd',
				progress: 70,
				isPrivate: true,
				startDate: '2023/08/01',
				endDate: '2023/08/01',
				dueDate: '2023/08/01',
				sortKey: 10,
				tags: [
					{ name: 'aaaaaaaaaaaaaaaaaaaa' },
					{ name: 'bbbbbbbbbbbbbbbbbbbb' },
					{ name: 'cccccccccccccccccccc' },
					{ name: 'dddddddddddddddddddd' },
					{ name: 'eeeeeeeeeeeeeeeeeeee' },
				],
				commentCount: 129,
				likeCount: 43,
			},
			{
				id: uuidv4(),
				title: 'task6',
				description: 'vjcashvjd',
				progress: 90,
				isPrivate: true,
				startDate: '2023/10/01',
				endDate: '2023/10/01',
				dueDate: '2023/10/01',
				sortKey: 20,
				tags: [
					{ name: 'cooking' },
					{ name: 'ethnic' },
					{ name: 'international' },
					{ name: 'difficult' },
					{ name: 'daily' },
				],
				commentCount: 129,
				likeCount: 43,
			},
		],
	},
	{
		// id: uuidv4(),
		id: 'finished',
		title: 'Finished',
		tasks: [
			{
				id: uuidv4(),
				title: 'task9',
				description: 'vjcashvjd',
				progress: 100,
				isPrivate: true,
				startDate: '2023/12/01',
				endDate: '2023/12/01',
				dueDate: '2023/12/01',
				sortKey: 10,
				tags: [
					{ name: 'aaaaaaaaaaaaaaaaaaaa' },
					{ name: 'bbbbbbbbbbbbbbbbbbbb' },
					{ name: 'cccccccccccccccccccc' },
					{ name: 'dddddddddddddddddddd' },
					{ name: 'eeeeeeeeeeeeeeeeeeee' },
				],
				commentCount: 129,
				likeCount: 43,
			},
		],
	},
];
