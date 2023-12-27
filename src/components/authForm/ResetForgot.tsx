import { Button, Form, Input, Layout, Typography } from 'antd';
import styles from './AuthForm.module.scss';
import { IPasswordForgot } from '../../interfaces/IUser';
import { useForgotPassword } from '../../features/user/userSlice';

const { Title } = Typography;

export const ResetForgot = () => {
	const [form] = Form.useForm();
	const { mutate: postForgotPassword } = useForgotPassword();

	const onFinish = (values: IPasswordForgot) => {
		postForgotPassword(values);
		form.resetFields();
	};

	return (
		<Layout className={styles.layout} style={{ height: '50svh' }}>
			<Form
				form={form}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				autoComplete="on"
				className={styles.form}
				name="signin"
				layout="vertical"
			>
				<Title level={3} className={styles.title_reset_password}>
					Восстановление пароля
				</Title>

				<label htmlFor="name" className={styles.label}>
					Почта
				</label>
				<Form.Item
					name="email"
					hasFeedback
					className={styles.formItem}
					rules={[
						{
							required: true,
							message: 'Пожалуйста, введите свой электронный адрес.',
						},
						{
							type: 'email',
							message: 'Ваш e-mail недействителен.',
						},
					]}
				>
					<Input
						className={styles.input}
						placeholder="example@gmail.com"
						autoComplete="on"
						size="small"
					/>
				</Form.Item>

				<Button
					className={styles.button}
					type="primary"
					htmlType="submit"
					shape="round"
				>
					Отправить
				</Button>
			</Form>
		</Layout>
	);
};
