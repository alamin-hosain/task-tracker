import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useContext, useRef } from 'react'
import swal from 'sweetalert';
import Button from '../../components/Button'
import { AuthContext } from '../../contexts/AuthProvider';

const SingUp = () => {
    const router = useRouter()
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { createUser, upDateUserInfo, googleSignIn } = useContext(AuthContext);

    const handleSignUpSubmit = (event) => {
        event.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        createUser(email, password).then(result => {
            const user = result.user;
            console.log(user);

            upDateUserInfo(name)
                .then(() => {
                    swal('User Created Successfully', {
                        icon: 'success'
                    })
                    router.push('/addtask')
                })
                .catch(e => console.error(e))



        }).catch(error => console.error(error))

        event.target.reset();
    }


    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                swal('User Created Successfully', {
                    icon: 'success'
                })
                router.push('/addtask')
            })
            .catch(e => console.error(e))
    }


    return (
        <div className='py-52 w-full md:w-3/5 mx-auto border border-black my-32 rounded-xl bg-gray-100 shadow-xl'>
            <form action="" className='space-y-4 w-2/3 mx-auto' onSubmit={handleSignUpSubmit}>
                <h2 className='text-2xl font-bold'>Create a New Account</h2>
                <div>
                    <input className='w-full px-8 py-2 rounded-xl bg-gray-100 border border-gray-400' ref={nameRef} type="text" name='name' placeholder='Enter Name' required />
                </div>

                <div>
                    <input className='w-full px-8 py-2 rounded-xl bg-gray-100 border border-gray-400' ref={emailRef} type="email" name='email' placeholder='Enter Email' required />
                </div>
                <div>
                    <input className='w-full px-8 py-2 rounded-xl bg-gray-100 border border-gray-400' ref={passwordRef} type="password" name="password" placeholder='Enter Password' required />
                </div>

                <div className='flex justify-end'>
                    <Button>Create Account</Button>
                </div>
                <p className='text-end text-sm '>Have an Account <Link className='text-orange-500 underline' href='/signin'>Login</Link></p>

                <p className='text-end underline decoration-2 underline-offset-4 cursor-pointer hover:scale-105 transition-transform duration-200 ease-in hover:text-orange-500' onClick={handleGoogleSignIn}>Login with Gmail</p>

            </form>
        </div>
    )
}

export default SingUp