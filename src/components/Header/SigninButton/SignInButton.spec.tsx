import {render, screen} from '@testing-library/react'
import { useSession } from 'next-auth/react'
import { SigninButton } from '.'

jest.mock('next-auth/react')

describe('SingInButton component', () =>{

    it('renders correctly when user is not autheticated ', () => {

        const useSessionMocked = jest.mocked(useSession)
        useSessionMocked.mockReturnValueOnce({data: null, status: 'loading'})

        render (<SigninButton />)
        

        expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
    })

    it('renders correctly when user is autheticated ', () => {

        const useSessionMocked = jest.mocked(useSession)
        useSessionMocked.mockReturnValueOnce({
            data: {
                user: { name: "John Doe", email: "john.doe@example.com"},
                expires: "fake-expires"
            },
            status: "authenticated"
        })

        render (<SigninButton />)
        

        expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

})