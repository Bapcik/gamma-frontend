import React from 'react';
import classNames from 'classnames/bind';
import { IoMdClose } from 'react-icons/io';
import styles from '../AddingTimeForm.module.scss';
import { ITimeSlot } from '../../../../interfaces/ITimeSlot.ts';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../../api/axiosInstance.ts';
import { useAppSelector } from '../../../../store/hooks.ts';
import { tokenSelect } from '../../../../features/user/userSlice.ts';

interface AddingTimeTagContainerProps {
	data: ITimeSlot[];
	availableTimeSlots: ITimeSlot[];
	refetch: () => void;
}

const AvailableTimeSlots: React.FC<AddingTimeTagContainerProps> = ({
	data,
	availableTimeSlots,
	refetch,
}) => {
	const token = useAppSelector(tokenSelect);

	const deleteTime = useMutation({
		mutationFn: (id: string) => {
			return axiosInstance.delete(`/appointments/${id}`, {
				headers: {
					Authorization: `${token}`,
				},
			});
		},
		onSuccess: () => {
			refetch();
		},
	});

	const handleDeleteSaveTime = (id: string) => {
		deleteTime.mutate(id);
	};

	return (
		<>
			<div className={styles.readme}>Выбранное вами время</div>
			<div className={styles.tagContainer}>
				{data.length === 0 ? (
					<p>Время для записи (ничего не выбрано)</p>
				) : (
					availableTimeSlots.map((timeSlot: ITimeSlot) => {
						return (
							<div
								key={timeSlot.id}
								className={classNames.call(styles, styles.tag)}
							>
								{timeSlot.time}
								<span
									onClick={() => handleDeleteSaveTime(timeSlot.id)}
									className={styles.removeTag}
								>
									<IoMdClose className={styles.tag_delete} />
								</span>
							</div>
						);
					})
				)}
			</div>
		</>
	);
};

export default AvailableTimeSlots;