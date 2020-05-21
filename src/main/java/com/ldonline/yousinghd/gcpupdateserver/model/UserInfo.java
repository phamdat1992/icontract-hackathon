package com.ldonline.yousinghd.gcpupdateserver.model;

public class UserInfo {
    //infor enterprise
    private String enterprise_name;
    private String enterprise_code;
    private String tax_code;
    private String address;
    private String phonenumber;

    // infor representative
    private String email;
    private String cmnd;
    private String birthday;
    private String day_range;
    private String issued_by;

    public UserInfo(){

    }

    public UserInfo(String enterprise_name, String enterprise_code, String tax_code, String address, String phonenumber, String email, String cmnd, String birthday, String day_range, String issued_by) {
        this.enterprise_name = enterprise_name;
        this.enterprise_code = enterprise_code;
        this.tax_code = tax_code;
        this.address = address;
        this.phonenumber = phonenumber;
        this.email = email;
        this.cmnd = cmnd;
        this.birthday = birthday;
        this.day_range = day_range;
        this.issued_by = issued_by;
    }

    public String getEnterprise_name() {
        return enterprise_name;
    }

    public void setEnterprise_name(String enterprise_name) {
        this.enterprise_name = enterprise_name;
    }

    public String getEnterprise_code() {
        return enterprise_code;
    }

    public void setEnterprise_code(String enterprise_code) {
        this.enterprise_code = enterprise_code;
    }

    public String getTax_code() {
        return tax_code;
    }

    public void setTax_code(String tax_code) {
        this.tax_code = tax_code;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCmnd() {
        return cmnd;
    }

    public void setCmnd(String cmnd) {
        this.cmnd = cmnd;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getDay_range() {
        return day_range;
    }

    public void setDay_range(String day_range) {
        this.day_range = day_range;
    }

    public String getIssued_by() {
        return issued_by;
    }

    public void setIssued_by(String issued_by) {
        this.issued_by = issued_by;
    }




}
