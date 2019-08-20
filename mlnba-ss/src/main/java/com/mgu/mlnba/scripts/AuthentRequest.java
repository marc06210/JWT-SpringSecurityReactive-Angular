package com.mgu.mlnba.scripts;

import com.mgu.mlnba.model.Match;

public class AuthentRequest {
    
    protected String autologin;
    protected String email;
    protected String password;
//    protected String emaillost;
    protected String association_id;
    
    
    public AuthentRequest(String email, String password, String association_id) {
        super();
        this.autologin = "1";
        this.email = email;
        this.password = password;
//        this.emaillost = "";
        this.association_id = association_id;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getAutologin() {
        return autologin;
    }
    public void setAutologin(String autologin) {
        this.autologin = autologin;
    }
//    public String getEmaillost() {
//        return emaillost;
//    }
//    public void setEmaillost(String emaillost) {
//        this.emaillost = emaillost;
//    }
    public String getAssociation_id() {
        return association_id;
    }
    public void setAssociation_id(String association_id) {
        this.association_id = association_id;
    }
    

}
