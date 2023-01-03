import React from 'react';
import { useForm } from 'react-hook-form';
import { IoLogoFacebook, IoLogoGoogle, IoLogoTwitter } from 'react-icons/io';
import { Link, useHistory } from 'react-router-dom';
import { registerAsync } from '../../apis/auths/register.api';
import { notifyError, notifySuccess } from '../../utils/notify';
import { signUpSchema } from '../../validate/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import './style.scss';
import { date } from 'yup';

interface SignInProps {}

export const SignUp = (props: SignInProps) => {
	const history = useHistory(); //chuyen trang
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(signUpSchema),
	});
	const submit = async (data: any, e: any) => {
		e.preventDefault();
		delete data.confirmPassword;
		console.log(data);
		const result = await registerAsync(data);

		console.log(result);
		if ([200, 201].includes(result.statusCode)) {
			//Luu token
			//localStorage.setItem('token', result.data.token);
			//Thong bao
			notifySuccess('Sign up success');
			//Chuyen trang
			history.push('/');
		} else {
			notifyError('Sign up fail');
		}
	};

	return (
		<div className='signUpPage container'>
			<div className='signUpPage-form'>
				<div className='signUpPage-form-img'>
					<img
						src='http://media.bizwebmedia.net/sites/63100/data/Upload/2016/1/bang_ao_quan_the_thao_nam_nu.JPG'
						alt=''
					/>
				</div>
				<form
					onSubmit={handleSubmit(submit)}
					className='signUpPage-form-content'
				>
					<p>Đăng kí tài khoản</p>
					<input
						type='email'
						{...register('email')}
						id='email'
						className='form-control'
						placeholder='Nhập địa chỉ email'
					/>
					<p className='text-danger'>{errors.email?.message}</p>
					<input
						type='text'
						{...register('name')}
						id='name'
						className='form-control'
						placeholder='Nhập tên của bạn '
					/>
					<p className='text-danger'>{errors.name?.message}</p>
					<input
						type='text'
						id='phone'
						{...register('phone')}
						className='form-control'
						placeholder='Nhập số điện thoại của bạn '
					/>

					<p className='text-danger'>{errors.phone?.message}</p>
					<input
						type='password'
						{...register('password')}
						id='password'
						className='form-control'
						placeholder='Nhập mật khẩu'
					/>
					<p className='text-danger'>{errors.password?.message}</p>
					<input
						type='password'
						{...register('confirmPassword')}
						id='confirmPassword'
						className='form-control'
						placeholder='Nhập lại mật khẩu'
					/>
					<p className='text-danger'>
						{errors.confirmPassword?.message}
					</p>
					<button
						id='register'
						className='btn btn-block login-btn mb-4'
						type='submit'
						disabled={isSubmitting}
					>
						{!isSubmitting ? (
							'Đăng kí'
						) : (
							<span className='spinner-border spinner-border-sm'></span>
						)}
					</button>
					<p>
						Đã có tài khoản?{' '}
						<Link to='/signin'>Đặng nhập ở đây</Link>
					</p>
					<p>
						Đăng nhập với{' '}
						<a href='#'>
							<IoLogoGoogle />
						</a>
						{''}{' '}
						<a href='#'>
							<IoLogoFacebook />
						</a>
					</p>
				</form>
			</div>
		</div>
	);
};
