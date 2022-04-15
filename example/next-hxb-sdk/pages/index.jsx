import { userService } from '../services';

export default Home;

function Home() {
    return (
        <div className="p-4">
            <div className="container">
                <h1>Hi {userService.userValue?.username}!</h1>
                <p>You&apos;re logged in with Next.js & JWT!!</p>
            </div>
        </div>
    );
}
