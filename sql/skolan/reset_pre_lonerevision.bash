#!/usr/bin/env bash
#
# Recreate and reset the database to be as after part I.
#
echo ">>> Reset skolan to after part 1"
echo ">>> Recreate the database (as root)"
mysql -uroot -p < setup.sql > /dev/null

file="ddl.sql"
echo ">>> Create tables ($file)"
mysql -uuser skolan < $file > /dev/null

file="dml_insert.sql"
echo ">>> Insert into larare ($file)"
mysql -uuser skolan < $file > /dev/null

file="ddl_migrate.sql"
echo ">>> Alter table larare ($file)"
mysql -uuser skolan < $file > /dev/null

file="dml_update.sql"
echo ">>> Förbered lönerevision, grundlön larare ($file)"
mysql -uuser skolan < $file > /dev/null

file="dml_update_lonerevision.sql"
echo ">>> Utför lönerevision ($file)"
mysql -uuser skolan < $file > /dev/null

echo ">>> Check Lönesumman = 330242, Kompetens = 19."
mysql -uuser skolan -e "SELECT SUM(lon) AS 'Lönesumma', SUM(kompetens) AS Kompetens FROM larare;"

file="dml_agg.sql"
echo ">>> Check highest and lowest salary ($file)"
mysql -uuser skolan < $file > /dev/null

file="dml_func.sql"
echo ">>> Show teacher which is born in 40's ($file)"
mysql -uuser skolan < $file > /dev/null

file="dml_view.sql"
echo ">>> Create tables ($file)"
mysql -uuser skolan < $file > /dev/null

file="ddl_copy.sql"
echo ">>> Copy table ($file)"
mysql -uuser skolan < $file > /dev/null

file="dml_union.sql"
echo ">>> Derived table ($file)"
mysql -uuser skolan < $file > /dev/null

file="dml_join.sql"
echo ">>> Join two tables ($file)"
mysql -uuser skolan < $file > /dev/null


