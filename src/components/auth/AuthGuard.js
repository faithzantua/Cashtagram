import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'; 

function AuthGuard() {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login');
            } else {
                console.log('User is already logged in.'); // Log when user is already logged in
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    return null; // This hook doesn't render anything, it just handles routing logic
};

export default AuthGuard;
