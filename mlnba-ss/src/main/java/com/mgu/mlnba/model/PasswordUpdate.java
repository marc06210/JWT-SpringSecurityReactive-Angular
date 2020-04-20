package com.mgu.mlnba.model;

public class PasswordUpdate {

    protected String oldPassword;
    protected String newPassword;

    public PasswordUpdate() {
    }

    public PasswordUpdate(String oldPassword, String newPassword) {
        super();
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

}