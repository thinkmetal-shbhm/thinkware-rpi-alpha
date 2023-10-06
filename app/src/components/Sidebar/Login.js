import  {GoogleLogin} from 'react-google-login';
const client_id= "534463592373-oh94nlm9k9kudhijehikl6v1leqjo0m9.apps.googleusercontent.com";

export default function Login(isLoggedIn,setIsLoggedIn){
    return(
        <GoogleLogin
        clientId={client_id}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
        />
    );
}