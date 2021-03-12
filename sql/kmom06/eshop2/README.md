npm install

mysql -uroot -p

source sql/eshop/setup.sql;

source sql/eshop/ddl.sql;

source sql/eshop/ddl_functions.sql;

source sql/eshop/ddl_procedures.sql;

source sql/eshop/triggers.sql;

source sql/eshop/insert.sql;


node index

or

node cli