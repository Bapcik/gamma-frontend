import styles from '../AddingTimeForm.module.scss';
import { FC } from 'react';
import { IoMdClose } from 'react-icons/io';
import dayjs from 'dayjs';
interface AddingTimeHeaderProps {
	handleCancel: () => void;
	date: string;
}

const AddingTimeHeader: FC<AddingTimeHeaderProps> = ({
	handleCancel,
	date,
}) => {
	return (
		<div className={styles.header}>
			<div className={styles.title}>
				<div onClick={handleCancel}>
					<IoMdClose className={styles.wrapper_close} />
				</div>
				<h2>{dayjs(date).format('dd, D MMMM')}</h2>
				<h1>Время для записи</h1>
				<div className={styles.readme}>
					<p>Сессия по времени занимает один час.</p>
				</div>
			</div>
		</div>
	);
};

export default AddingTimeHeader;
