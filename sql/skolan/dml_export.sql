-
- export TABLE out INTO FILE
-
SELECT
    *
    INTO  OUTFILE  '/home/mos/skolan/kurs_export.csv' 
        CHARSET utf8
         FIELDS 
            TERMINATED  BY  ',' 
            ENCLOSED  BY  '"' 
        LINES 
        TERMINATED  BY  '\ n' 
    FROM kurs
;

-
- Use the terminal client
-
- export data FROM query out INTO file
- mysql -uuser -ppass skolan -e "select * from larare limit 3;" --batch > report.xls

- export data FROM sql FILE out INTO FILE
- mysql -uuser -ppass skolan --batch < dml_export.sql > report.xls