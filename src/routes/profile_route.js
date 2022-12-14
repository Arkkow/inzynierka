// General React imports
import * as React from 'react';

// Project specific files

// CSS files
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.css';
import '../styles/App.css';
import ProfilePage from "../components/profile/profile_page/profile_page";

export default function ProfileRoute () {
    return (
        <div>
            <ProfilePage>
            </ProfilePage>
        </div>
    )
};
