package com.mgu.mlnba.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("News")
public class News {

    @Id
    protected String id;
    
    private String fromDate;
    private String toDate;
    private boolean starred;
    private String content;
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public boolean isStarred() {
        return starred;
    }
    public void setStarred(boolean starred) {
        this.starred = starred;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public String getFromDate() {
        return fromDate;
    }
    public void setFromDate(String fromDate) {
        this.fromDate = fromDate;
    }
    public String getToDate() {
        return toDate;
    }
    public void setToDate(String toDate) {
        this.toDate = toDate;
    }

}
