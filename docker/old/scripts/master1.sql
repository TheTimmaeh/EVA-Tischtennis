SET @@GLOBAL.group_replication_bootstrap_group=1;
create user 'repl'@'%';
GRANT REPLICATION SLAVE ON *.* TO repl@'%';
flush privileges;
change master to master_user='root' for channel 'group_replication_recovery';
START GROUP_REPLICATION;
SET @@GLOBAL.group_replication_bootstrap_group=0;