import { Outlet } from "react-router"

export const AuthLayout = () => {
    return (
        <main className="flex items-center justify-center h-full">
            <Outlet />
        </main>
    )
}