import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDisplayStatus, getStatusColor } from '../common/util/get-color';
import { AppDispatch, RootState } from '../stores/store';
import { Todo, setCurrentTodo, setMyTodos } from '../stores/todos/todo.slice';
import './List.scss';
import TodoDetailModal from './TodoDetailModal';
import { useParams } from 'react-router-dom';
const List = () => {
	const [width, setWidth] = useState(0);
	const tableRef = useRef<HTMLTableElement | null>(null);

	const dispatch = useDispatch<AppDispatch>();
	const { userId } = useParams();
	const user = userId
		? useSelector((store: RootState) => store.user.user)
		: useSelector((store: RootState) => store.auth.user);
	const authUser = useSelector((store: RootState) => store.auth.user);
	useEffect(() => {
		if (user) {
			dispatch(setMyTodos(user.id));
		}
	}, [user]);
	const myTodos = useSelector((store: RootState) => {
		return [
			...Object.values(store.todo.myTodos).flatMap((todos) => todos),
		].sort((a, b) => {
			if (a.id < b.id) return 1;
			else if (a.id > b.id) return -1;
			else return 0;
		});
	});

	useEffect(() => {
		setWidth(tableRef.current?.offsetWidth || 0);
	}, []);

	const columns = useMemo<ColumnDef<Todo>[]>(
		() => [
			{
				header: 'ID',
				accessorKey: 'id',
				size: width * 0.05,
				minSize: 20,
				maxSize: Number.MAX_SAFE_INTEGER,
				// cell: (props) => <div className='text-center'>{props.getValue()}</div>,
				// style: { textAlign: 'center' },
			},
			{
				header: 'Status',
				accessorKey: 'status',
				size: width * 0.15,
				minSize: 150,
				maxSize: Number.MAX_SAFE_INTEGER,
				cell: (props) => (
					<div className='flex justify-center'>
						<div
							className={`text-center px-1 w-fit rounded-xl ${getStatusColor(
								props.getValue()
							)}`}
						>
							{getDisplayStatus(props.getValue())}
						</div>
					</div>
				),
			},
			{
				header: 'Title',
				accessorKey: 'title',
				size: width * 0.2,
				minSize: 20,
				maxSize: Number.MAX_SAFE_INTEGER,
				cell: (props) => (
					<div className='line-clamp-2 word-break'>{props.getValue()}</div>
				),
			},
			{
				header: 'Description',
				accessorKey: 'description',
				size: width * 0.2,
				minSize: 20,
				maxSize: Number.MAX_SAFE_INTEGER,
				cell: (props) => (
					<div className='line-clamp-2 word-break'>{props.getValue()}</div>
				),
			},
			{
				header: 'Start Date',
				accessorKey: 'startDate',
				size: width * 0.1,
				minSize: 20,
				maxSize: Number.MAX_SAFE_INTEGER,
				cell: (props) => (
					<div>
						{props.getValue()
							? format(parseISO(props.getValue()), 'yyyy/MM/dd')
							: '-'}
					</div>
				),
			},

			{
				header: 'End Date',
				accessorKey: 'endDate',
				size: width * 0.1,
				minSize: 20,
				maxSize: Number.MAX_SAFE_INTEGER,
				cell: (props) => (
					<div>
						{props.getValue()
							? format(parseISO(props.getValue()), 'yyyy/MM/dd')
							: '-'}
					</div>
				),
			},
			{
				header: 'Due Date',
				accessorKey: 'dueDate',
				size: width * 0.1,
				minSize: 20,
				maxSize: Number.MAX_SAFE_INTEGER,
				cell: (props) => (
					<div>
						{props.getValue()
							? format(parseISO(props.getValue()), 'yyyy/MM/dd')
							: '-'}
					</div>
				),
			},
			{
				header: 'Progress',
				accessorKey: 'progress',
				size: width * 0.03,
				minSize: 20,
				maxSize: Number.MAX_SAFE_INTEGER,
				cell: (props) => <div>{props.getValue()}</div>,
			},
			{
				header: 'Likes',
				accessorKey: 'likes',
				size: width * 0.1,
				minSize: 20,
				maxSize: Number.MAX_SAFE_INTEGER,
				cell: (props) => <div>{props.getValue().length}</div>,
			},
			{
				header: 'Comments',
				accessorKey: 'comments',
				size: width * 0.1,
				minSize: 20,
				maxSize: Number.MAX_SAFE_INTEGER,
				cell: (props) => <div>{props.getValue().length}</div>,
			},
		],
		[]
	);

	const table = useReactTable({
		data: myTodos,
		columns: columns,
		// columnResizeMode: 'onChange',
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		// debugTable: true,
		autoResetPageIndex: false,
	});
	const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
	const currentTodoDetail = useSelector((store: RootState) => {
		console.log('selector', store.todo.myCurrentTodo);
		return store.todo.myCurrentTodo;
	});

	const onClickRow = async (id: number) => {
		await dispatch(setCurrentTodo(id));
		console.log('onClickRow', currentTodoDetail);
		if (!currentTodoDetail) return;

		setIsDetailModalOpen(true);
	};
	return (
		<>
			{currentTodoDetail ? (
				<TodoDetailModal
					open={isDetailModalOpen}
					handleClose={() => setIsDetailModalOpen(false)}
					todo={currentTodoDetail}
				/>
			) : null}
			<div className='mt-5 mx-4 bg-gray-400 p-5 w-full h-fit rounded-lg drop-shadow-hard1'>
				<div className='drop-shadow-hard1'>
					<table className='bg-gray-600 w-full' ref={tableRef}>
						<thead className='px-4'>
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header, index) => (
										<React.Fragment key={header.id}>
											<th
												// key={header.id}
												style={{
													width: `${header.getSize()}px`,
													minWidth: `${header.column.columnDef.minSize}px`,
												}}
												className='p-2 h-3 text-sm font-semibold'
											>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext()
													  )}
												{index !== headerGroup.headers.length - 1 && (
													<span className='flex items-center '>
														<span
															{...{
																onMouseDown: header.getResizeHandler(),
																onTouchStart: header.getResizeHandler(),
																className: `resizer w-1 bg-gray-500 ${
																	header.column.getIsResizing()
																		? 'isResizing'
																		: ''
																}`,
															}}
														></span>
													</span>
												)}
											</th>
										</React.Fragment>
									))}
								</tr>
							))}
						</thead>
						<tbody>
							{table.getRowModel().rows.map((row) => {
								return (
									<tr
										key={row.id}
										onClick={() => {
											onClickRow(row.original.id);
										}}
										className='cursor-pointer'
									>
										{row.getVisibleCells().map((cell) => {
											return (
												<td
													key={cell.id}
													style={{
														width: cell.column.getSize(),
													}}
													className='px-2 text-sm'
												>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)}
												</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
					<div className='flex bg-gray-600 text-sm p-2 justify-end gap-x-4 border-t border-gray-300 items-center rounded-b-md'>
						<div className='text-sm'>
							<span>Page </span>
							<strong>
								{table.getState().pagination.pageIndex + 1} of{' '}
								{table.getPageCount()}
							</strong>
						</div>

						<select
							className='bg-gray-600 cursor-pointer'
							value={table.getState().pagination.pageSize}
							onChange={(e) => {
								table.setPageSize(Number(e.target.value));
							}}
						>
							{[20, 30, 50].map((pageSize) => (
								<option key={pageSize} value={pageSize}>
									Show {pageSize}
								</option>
							))}
						</select>
						<div>{table.getRowModel().rows.length} Rows</div>
						<div className='flex gap-x-4 items-center ml-4'>
							<button
								className='cursor-pointer'
								onClick={() => table.setPageIndex(0)}
								disabled={!table.getCanPreviousPage()}
							>
								{'<<'}
							</button>
							<button
								className='cursor-pointer'
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
							>
								{'<'}
							</button>
							<button
								className='cursor-pointer'
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
							>
								{'>'}
							</button>
							<button
								className='cursor-pointer'
								onClick={() => table.setPageIndex(table.getPageCount() - 1)}
								disabled={!table.getCanNextPage()}
							>
								{'>>'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default List;
