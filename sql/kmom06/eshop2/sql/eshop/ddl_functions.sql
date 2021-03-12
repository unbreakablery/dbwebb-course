-- 
-- Function order_status(). 
-- 
DROP FUNCTION IF EXISTS order_status; 
DELIMITER ;; 

CREATE FUNCTION order_status ( 
    a_created TIMESTAMP,
    a_updated TIMESTAMP,
    a_deleted TIMESTAMP,
    a_ordered TIMESTAMP,
    a_shipped TIMESTAMP
) 
RETURNS CHAR(10) 
DETERMINISTIC 
BEGIN 
    IF a_deleted IS NOT NULL THEN 
        RETURN 'deleted';
    ELSEIF a_shipped IS NOT NULL THEN 
        RETURN 'shipped';
    ELSEIF a_ordered IS NOT NULL THEN 
        RETURN 'ordered';
    ELSEIF a_updated IS NOT NULL THEN 
        RETURN 'updated';
    ELSEIF a_created IS NOT NULL THEN 
        RETURN 'created';
    END IF;
    RETURN 'unknown';
END 
;; 

DELIMITER ; 