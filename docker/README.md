*Starten der Docker Container für die Datenbank und den Traefik Proxy Load Balancer*

```
docker-compose -p eva up
```

localhost:8080 für Traefik


*Nachdem die Container das erste mal gestartet sind*

1. Group Replication Master 1 aktivieren
```
docker-compose -p eva exec master_1 mysql -uroot -pexample -e "SET GLOBAL group_replication_bootstrap_group=ON;" -e "START GROUP_REPLICATION;" -e "SET GLOBAL group_replication_bootstrap_group=OFF;"
```
2. Group Replication Master 2 aktivieren
```
docker-compose -p eva exec master_2 mysql -uroot -pexample -e "CHANGE master TO master_user='repl' FOR CHANNEL 'group_replication_recovery';" -e "START GROUP_REPLICATION;"
```
3. Group Replication Master 3 aktivieren
```
docker-compose -p eva exec master_3 mysql -uroot -pexample -e "CHANGE master TO master_user='repl' FOR CHANNEL 'group_replication_recovery';" -e "START GROUP_REPLICATION;"
```









NEU:

## Erstellen der Netzwerke

```
docker network create eva_traefik
docker network create eva_db
```

## Starten des Load Balancers

```
cd traefik
docker-compose -p eva_traefik up -d
```

## Starten des Main Webservers/Datenbank

```
cd ../webserver_main
docker-compose -p eva1 up -d
```

### Datenbank migrieren

Hierzu einfach auf http://localhost/knex/migrate gehen und warten, bis der Vorgang abgeschlossen ist.

## Starten der Sub Webserver/Datenbanken

```
cd ../webserver_sub
docker-compose -p [eva2, eva3, ...] up -d
```

## Registrieren der Webserver im Load Balancer

```
cd ../traefik/config/
nano tls.yaml
```

### URL eintragen/ergänzen

```
services:
  webservers:
    loadBalancer:
      servers:
        - url: "http://eva1_web_1/"
        - url: "http://eva2_web_1/"
        - url: "http://eva3_web_1/"
```
