import {render, screen} from '@testing-library/react'
import { ActiveLink } from '../../components/ActiveLinks'

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

describe('ActiveLink Component', () => {
    
    test('active link renders correctly', () => {
        render(
            <ActiveLink href="/"activeClassName='active'>
                <a>Home</a>
            </ActiveLink>
        )

        expect(screen.getByText('Home')).toBeInTheDocument()
    })

    test('active link is receiving active class', () => {
        render(
            <ActiveLink href="/"activeClassName='active'>
                <a>Home</a>
            </ActiveLink>
        )

        expect(screen.getByText('Home')).toHaveClass('active')
    })

})