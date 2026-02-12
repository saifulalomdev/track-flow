import { Outlet } from 'react-router'
import ClientHeader from '~/components/layout/client-header'

export default function CleintLayout() {
    return (
        <main>
            <ClientHeader />
            <Outlet />
        </main>
    )
}