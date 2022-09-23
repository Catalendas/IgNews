import {fireEvent, render, screen} from "@testing-library/react"
import { signIn, useSession } from 'next-auth/react'
import {useRouter} from 'next/router'
import { SubscribleButton } from "../../components/SubscribleButton"

jest.mock('next-auth/react')
jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn()
    })
}))

describe('SubscribleButton Component', () => {

    it('renders corretly', () => {
        const useSessionMocked = jest.mocked(useSession)

        useSessionMocked.mockReturnValueOnce({data: null, status: 'unauthenticated'})

        render(
            <SubscribleButton priceId=""/>
        )

        expect(screen.getByText('Subscrible now')).toBeInTheDocument() 
    })

    it('renders corretly', () => {
        const signInMocked = jest.mocked(signIn)
        const useSessionMocked = jest.mocked(useSession)

        useSessionMocked.mockReturnValueOnce({data: null, status: 'unauthenticated'})

        render(
            <SubscribleButton priceId=""/>
        )

        const subscribleButton = screen.getByText('Subscrible now')

        fireEvent.click(subscribleButton)

        expect(signInMocked).toHaveBeenCalled()
    })

    it('redirects to posts whwn user already has a subscription', () => {
       
            const useRouterMocked = jest.mocked(useRouter)
            const useSessionMocked = jest.mocked(useSession)
            const pushMock = jest.fn()

            useSessionMocked.mockReturnValueOnce({
                data: {
                    user: { name: "John Doe", email: "john.doe@example.com"},
                    activeSubscription: 'fake-active-subscription',
                    expires: "fake-expires"
                },
                status: 'authenticated'
    } as any)

            useRouterMocked.mockReturnValueOnce({
                push: pushMock
            } as any)
    
            render(
                <SubscribleButton priceId=""/>
            )
    
            const subscribleButton = screen.getByText('Subscrible now')

            fireEvent.click(subscribleButton)

            expect(pushMock).toHaveBeenCalledWith('/posts')
    })
} )