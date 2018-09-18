package com.acme;

import hudson.Extension;
import hudson.model.User;
import hudson.security.SecurityRealm;
import hudson.util.VersionNumber;
import io.jenkins.blueocean.rest.ApiHead;
import io.jenkins.blueocean.rest.hal.Link;
import io.jenkins.blueocean.rest.model.Resource;
import jenkins.model.Jenkins;
import org.kohsuke.stapler.Stapler;
import org.kohsuke.stapler.StaplerRequest;
import org.kohsuke.stapler.export.Exported;

import java.util.*;
@Extension
public class Config extends Resource implements BlueOceanService {
    @Exported
    public Map<String, Object> getConfig() {
        return getStateJson();
    }

    @Override
    public Link getLink() {
        return ApiHead.INSTANCE().getLink().rel("start/config");
    }

    @Override
    public String getUrlName() {
        return "config";
    }

    private Map<String, Object> getStateJson() {
        Map<String, Object> config = new HashMap<String, Object>();
        // User
        User currentUser = User.current();
        String userId;
        if (currentUser != null) {
            userId = currentUser.getId();
        } else {
            userId = "anonymous";
        }
        HashMap<String, Object> user = new HashMap<>();
        user.put("id", userId);
        config.put("user", user);
        // versions
        HashMap<String, Object> versions = new HashMap<>();
        VersionNumber jenkinsVersionNumber = Jenkins.getVersion();
        String jenkinsVersion = jenkinsVersionNumber != null ? jenkinsVersionNumber.toString() : Jenkins.VERSION;
        versions.put("jenkinsVersion", jenkinsVersion);
        config.put("versions", versions);
        // security
        Jenkins jenkins = Jenkins.getInstance();
        HashMap<String, Object> security = new HashMap<>();
        security.put("enabled", jenkins.isUseSecurity());
        security.put("loginUrl", jenkins.getSecurityRealm() == SecurityRealm.NO_AUTHENTICATION ? null : jenkins.getSecurityRealm().getLoginUrl());
        config.put("security", security);
        // url
        HashMap<String, Object> urls = new HashMap<>();
        StaplerRequest currentRequest = Stapler.getCurrentRequest();
        String rootURL = currentRequest.getContextPath();
        urls.put("rootURL", rootURL);
        urls.put("resURL", Jenkins.RESOURCE_PATH);
        urls.put("appURL", rootURL + "/blue");
        urls.put("restURL", rootURL + "/blue/rest");
        config.put("urls", urls);
        return config;
    }
}
