--
-- Insert member
--
DELETE FROM member;
INSERT INTO member 
        (member_id, first_name, last_name, alias, city) 
    VALUES
        (1, 'Barrack', 'Obama', 'the president', 'Washington'),
        (2, 'Ivan', 'Pavlov', 'the scientist', 'Sankt Petersburg'),
        (3, 'Millan', 'Cesar', 'the whisperer', 'Santa Clarita'),
        (4, 'Hafto', 'Erling', 'the captain', 'Honningsvag'),
        (5, 'Tjorven', 'Grankvist', 'tjorven', 'Saltkrakan')
;

--
-- Insert breed
--
DELETE FROM breed;
INSERT INTO breed 
        (breed_id, name, approve) 
    VALUES
        ('sb', 'Sankt bernhardshund', 'Yes'),
        ('pv', 'Portugisisk vattenhund', 'Yes'),
        ('br', 'Blandras', 'No'),
        ('sc', 'Schafer', 'Yes')
;

--
-- Insert dog
--
DELETE FROM dog;
INSERT INTO dog 
        (dog_id, name, url, breed_id) 
    VALUES
        (1, 'Batsman', 'https://sv.wikipedia.org/wiki/Vi_p%C3%A5_Saltkr%C3%A5kan', 'sb'),
        (2, 'Bo', 'https://sv.wikipedia.org/wiki/Bo_(hund)', 'pv'),
        (3, 'Arleekin', 'https://sv.wikipedia.org/wiki/Pavlovs_hundar', 'br'),
        (4, 'Laska', 'https://sv.wikipedia.org/wiki/Pavlovs_hundar', 'br'),
        (5, 'Zloday', 'https://sv.wikipedia.org/wiki/Pavlovs_hundar', 'br'),
        (6, 'Sunny', 'https://sv.wikipedia.org/wiki/Bo_(hund)', 'pv'),
        (7, 'Lajka', 'https://sv.wikipedia.org/wiki/Lajka', 'br'),
        (8, 'Skeppshunden Bamse', 'https://sv.wikipedia.org/wiki/Skeppshunden_Bamse', 'sb')
;

--
-- Insert member2dog
--
DELETE FROM member2dog;
INSERT INTO member2dog 
        (id, member_id, dog_id, registered) 
    VALUES
        (1, 1, 2, 2008),
        (2, 1, 6, 2013),
        (3, 2, 3, 1922),
        (4, 2, 4, 1922),
        (5, 2, 5, 1923),
        (6, 4, 8, 1937),
        (7, 5, 1, 1964)        
;