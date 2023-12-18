import styles from '../Record.module.scss';
import back from '../../../../public/arrow-left.svg';
import * as dayjs from 'dayjs';
import { Button } from 'antd';
import { useAppSelector } from '../../../store/hooks.ts';
import { userSelect } from '../../../features/user/userSlice.ts';

type Props = {
	setActiveTab: (key: string) => void;
	format: string;
	recordTime: string;
};

const ConfirmationRecord = ({ setActiveTab, format, recordTime }: Props) => {
	const user = useAppSelector(userSelect);

	return (
		<>
			<div className={styles.cardHeader}>
				<img
					className={styles.backButton}
					onClick={() => setActiveTab('2')}
					src={back}
					alt="back"
				/>
				<h1 className={styles.header}>Запись</h1>
			</div>

			<div className={styles.bookingInfo}>
				<div className={styles.bookingFullName}>
					<p>ФИО</p>
					<h2>{user?.patient?.name}</h2>
				</div>

				<div className={styles.bookingFormat}>
					<p>Формат</p>
					<h3 className={styles.bookingSelect}>{format}</h3>
				</div>

				<div className={styles.bookingFormat}>
					<p>Время записи</p>
					<h4 className={styles.bookingSelect}>
						{dayjs(recordTime).format('D MMMM, HH:mm ')}
					</h4>
				</div>
			</div>

			<Button className={styles.btn}>Записаться</Button>
		</>
	);
};

export default ConfirmationRecord;
