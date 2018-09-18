package com.acme.action;

import hudson.Extension;
import hudson.ExtensionList;
import hudson.model.UnprotectedRootAction;
import io.jenkins.blueocean.BlueOceanUIProvider;
import io.jenkins.blueocean.RootRoutable;
import jenkins.model.Jenkins;
import org.kohsuke.stapler.StaplerProxy;

import javax.annotation.Nonnull;

@Extension
public class NoBlueRootAction implements UnprotectedRootAction, StaplerProxy  {
        private static final String URL_BASE = "blue";
    private static final String ICON = "/plugin/SpeedAndCustom/icons/blueocean.png";
    private static final String NAME = "No Blue";

    @Override
    public String getIconFileName() {
      return ICON;
    }

    @Override
    public String getDisplayName() {
      return NAME;
    }

    @Override
    public String getUrlName() {
      return URL_BASE;
    }
    @Override
    public Object getTarget() {
      Jenkins.getInstance().checkPermission(Jenkins.READ);
      return this;
    }

    // needed for the rest routing
    public Object getDynamic(String route) {
        for (RootRoutable r : ExtensionList.lookup(RootRoutable.class)) {
            if (r.getUrlName().equals(route))
                return r;
        }
        return this;
    }

    @Extension(ordinal = -9999)
    public static class BlueOceanUIProviderImpl extends BlueOceanUIProvider {
        @Override
        public String getRootUrl() {
            return Jenkins.getInstance().getRootUrl();
        }

        @Nonnull
        @Override
        public String getUrlBasePrefix() {
            return URL_BASE;
        }

        @Nonnull
        @Override
        public String getLandingPagePath() {
            return "/start";
        }
    }

}
