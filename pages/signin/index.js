import React, { useContext, useRef } from 'react'
import Button from '../../components/Button';
import Link from 'next/link';
import { AuthContext } from '../../contexts/AuthProvider';
import swal from 'sweetalert';
import { useRouter } from 'next/router';

const SingIn = () => {
    const router = useRouter();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signIn, googleSignIn } = useContext(AuthContext);

    const handleSignInSubmit = (event) => {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        signIn(email, password).then(result => {
            swal('Login Successfully', { icon: 'success' })
            router.push('/addtask')
        }).catch(error => console.error(error))

        event.target.reset();
    }


    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                swal('Login Successfully', {
                    icon: 'success'
                })
                router.push('/addtask')
            })
            .catch(e => console.error(e))
    }


    return (
        <div className='py-52 w-full md:w-3/5 mx-auto border border-black my-32 rounded-xl bg-gray-100 shadow-xl'>
            <form action="" className='space-y-4 w-2/3 mx-auto' onSubmit={handleSignInSubmit}>
                <h2 className='text-2xl font-bold'>Login Here</h2>

                <div>
                    <input className='w-full px-8 py-2 rounded-xl bg-gray-100 border border-gray-400' ref={emailRef} type="email" name='email' placeholder='Enter Email' />
                </div>
                <div>
                    <input className='w-full px-8 py-2 rounded-xl bg-gray-100 border border-gray-400' ref={passwordRef} type="password" name="password" placeholder='Enter Password' />
                </div>

                <div className='flex justify-end'>
                    <Button>Login</Button>
                </div>
                <p className='text-end text-sm '>Don't Have Account <Link className='text-orange-500 underline' href='/signup'>Sing Up</Link></p>

                <p className='text-end underline decoration-2 underline-offset-4 cursor-pointer hover:scale-105 transition-transform duration-200 ease-in hover:text-orange-500' onClick={handleGoogleSignIn}>Login with Gmail</p>

            </form>
        </div>
    )
}

export default SingIn