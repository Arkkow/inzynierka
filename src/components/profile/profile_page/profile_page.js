import React from "react";
import "../profile_page/profile_page.css";
import ProfileForm from "./profile_form/profile_form";


function ProfilePage() {
    return (
        <div className="background2">
            <page_title>Mój profil</page_title>
            <ProfileForm />
            <div style={{width: "100%", minHeight:"8vh", textAlign: "left", paddingTop:"1%", paddingLeft:"0.5%"}}>
                <paragraph>Masz jakiś problem lub coś nie działa tak jak powinno?</paragraph><br/>
                <paragraph>Skontaktuj się z nami - padeltournamentsystems@gmail.com</paragraph>
            </div>
        </div>
    );
}

export default ProfilePage;