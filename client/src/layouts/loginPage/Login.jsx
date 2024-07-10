import FormLogin from "../../components/form/FormLogin"

function Login() {
    return (
        <div className="flex w-full h-screen text-fuchsia-50">
            <div className="w-full flex items-center justify-center lg:w-1/2">
                <FormLogin />
            </div>
            <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-red-200">
                <div className="w-60 h-60 bg-gradient-to-tr from-red-200 to-black rounded-full animate-bounce" />
                <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
            </div>
        </div>
    )
}

export default Login