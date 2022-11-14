import React from "react";
import "../profile_page/profile_page.css";
import ProfileForm from "../profile_form/profile_form";


function ProfilePage() {
    return (
        <div className="background2">
            <page_title>Mój profil</page_title>
            <ProfileForm />
        </div>
    );
}

export default ProfilePage;