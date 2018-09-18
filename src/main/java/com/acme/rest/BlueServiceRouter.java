package com.acme.rest;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.kohsuke.stapler.Stapler;
import org.kohsuke.stapler.StaplerRequest;

import hudson.Extension;
import hudson.ExtensionList;
import hudson.ExtensionListListener;
import io.jenkins.blueocean.commons.ServiceException;
import io.jenkins.blueocean.rest.ApiRoutable;

@Extension(ordinal = 9999)
public class BlueServiceRouter implements ApiRoutable {

    private static Logger LOG = Logger.getLogger(BlueServiceRouter.class.getName());
    private volatile Map<String, BlueOceanService> services;

    public BlueServiceRouter() {
        computeServices();
        // when new extensions are installed, recompute 'services'
        ExtensionList.lookup(BlueOceanService.class).addListener(new ExtensionListListener() {
            @Override
            public void onChange() {
                computeServices();
            }
        });
    }

    @Override
    public String getUrlName() {
        return "acme";
    }

    public BlueOceanService getDynamic(String route) {
        LOG.log(Level.FINEST, "getDynamic({0})", route);
        StaplerRequest request = Stapler.getCurrentRequest();
        String m = request.getMethod();
        if (m.equalsIgnoreCase("POST") || m.equalsIgnoreCase("PUT") || m.equalsIgnoreCase("PATCH") || m.equalsIgnoreCase("DELETE")) {
            String header = request.getHeader("Content-Type");
            if (header == null || !header.contains("application/json")) {
                throw new ServiceException(415, "Content-Type: application/json required");
            }
        }
        BlueOceanService service = services.get(route);
        if (service != null) {
            return service;
        }
        throw new ServiceException(404, String.format(Locale.ROOT, "no such service: %s", route));

    }

    private synchronized void computeServices() {
        Map<String, BlueOceanService> serviceMap = new HashMap<>();
        for (BlueOceanService service : ExtensionList.lookup(BlueOceanService.class)) {
            serviceMap.putIfAbsent(service.getUrlName(), service);
        }
        services = serviceMap;
    }
}
