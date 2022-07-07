import style from './style.module.scss'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

// signIn for next-auth
import { signIn, signOut ,useSession } from 'next-auth/react'

export function SigninButton() {

    
    // Hook useSessin for next
    const {data: session} = useSession()
    
    console.log(session)
    return session ? (
        <button 
            type="button"
            className={style.signinButton}
            onClick={() => signOut()}
        >
            <FaGithub color='#04d361' />
            {session.user.name}
            <FiX color='#737380' className={style.closeIcon} />
        </button>
    ) : (
        <button 
            type="button"
            className={style.signinButton}
            onClick={() => signIn('github') }
        >
            <FaGithub color='#eba417' />
            Sign in with Github
        </button>
    )
}