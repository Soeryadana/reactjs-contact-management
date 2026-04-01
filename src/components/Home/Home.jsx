import { useNavigate } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use"
import { userDetail } from "../../lib/api/UserApi";
import { alertError } from "../../lib/alert";

export default function Home() {
    const [token, _] = useLocalStorage('token', '');
    const navigate = useNavigate();

    async function checkLogin() {
        if (token) {
            const response = await userDetail(token);
            const responseBody = await response.json();
            console.log(responseBody)

            if (response.status === 200) {
                navigate({
                    pathname: '/dashboard/contacts'
                })
            } else {
                console.log(responseBody.errors)
                await alertError('You are no tlogged in. Please Log in to access contact');
                navigate({
                    pathname: '/login'
                })
            }
        } else {
            navigate({
                pathname: '/login'
            })
        }
    }

    useEffectOnce(() => {
        checkLogin();
    })
    return (
        <>
        </>
    )
}