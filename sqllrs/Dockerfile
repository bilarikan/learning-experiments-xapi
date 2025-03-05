FROM yetanalytics/lrsql:latest

# Removing config, certs, and CA steps for testing
# custom configuration
# ADD my_lrsql.json              /lrsql/config/lrsql.json

# custom certs
# ADD my_server.key.pem          /lrsql/config/server.key.pem
# ADD my_server.crt.pem          /lrsql/config/server.crt.pem
# ADD my_cacert.pem              /lrsql/config/cacert.pem

# custom authority
# ADD my_authority.json.template /lrsql/config/authority.json.template

EXPOSE 8080
EXPOSE 8443
CMD ["/lrsql/bin/run_postgres.sh"]