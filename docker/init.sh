#!/bin/bash
# https://github.com/wagnerjfr/mysql-group-replication-docker-compose

if [ $# -eq 0 ]
  then
    echo "No Password given."
    exit 1
fi

export MYSQL_ROOT_PASSWORD=$1

echo Creating Docker Networks...
docker network create eva_traefik
docker network create eva_db

echo
echo Creating Load Balancer
cd eva_traefik
docker-compose up -d

echo
echo Creating Main Backend/Database
cd ../eva_be_db_1
docker-compose up -d

echo
echo Creating Sub Backend/Database 1
cd ../eva_be_db_2
docker-compose up -d

echo
echo Creating Sub Backend/Database 2
cd ../eva_be_db_3
docker-compose up -d

echo
total=180
while [ $total -gt 0 ]
do
  echo "Waiting $total s for Databases to initialize & start"
  ((total-=10))
  sleep 10s
done

echo
echo Bootstrap the Group
cd ../eva_be_db_1
docker-compose exec eva_db_1 mysql -uroot -p$MYSQL_ROOT_PASSWORD \
  -e "SET @@GLOBAL.group_replication_bootstrap_group=1;" \
  -e "create user 'repl'@'%';" \
  -e "GRANT REPLICATION SLAVE ON *.* TO repl@'%';" \
  -e "flush privileges;" \
  -e "change master to master_user='root' for channel 'group_replication_recovery';" \
  -e "START GROUP_REPLICATION;" \
  -e "SET @@GLOBAL.group_replication_bootstrap_group=0;" \
  -e "SELECT * FROM performance_schema.replication_group_members;"

echo
echo Join Nodes to Group
for N in 2 3
do
  cd "../eva_be_db_$N"
  docker-compose exec eva_db_$N mysql -uroot -p$MYSQL_ROOT_PASSWORD \
    -e "change master to master_user='repl' for channel 'group_replication_recovery';" \
    -e "START GROUP_REPLICATION;"
done

echo
echo Check Group
for N in 1 2 3
do
  cd "../eva_be_db_$N"
  docker-compose exec eva_db_$N mysql -uroot -p$MYSQL_ROOT_PASSWORD \
    -e "SHOW VARIABLES WHERE Variable_name = 'hostname';" \
    -e "SELECT * FROM performance_schema.replication_group_members;"
done

echo
echo Done
