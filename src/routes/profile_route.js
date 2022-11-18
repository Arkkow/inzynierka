// General React imports
import * as React from 'react';

// Project specific files

// CSS files
import '../styles/index.css';
import '../styles/App.css';
import TitlePage from "../components/new_tournament/page_with_title/page_with_title";
import ProfilePage from "../components/profile/profile_page/profile_page";

export default function ProfileRoute () {
    return (
        <div>
            <ProfilePage>
            </ProfilePage>
        </div>
    )
};
