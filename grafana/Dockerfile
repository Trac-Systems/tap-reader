FROM grafana/grafana

# ENV GF_AUTH_DISABLE_LOGIN_FORM "true"
# ENV GF_AUTH_ANONYMOUS_ENABLED "true"
# ENV GF_AUTH_ANONYMOUS_ORG ROLE "Admin"

#Adding all the files to docker container.
ADD provisioning /etc/grafana/provisioning
ADD config.ini /etc/grafana/config.ini

# Adding all the dashboard files (JSON) to docker container
ADD dashboards /var/lib/grafana/dashboards