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