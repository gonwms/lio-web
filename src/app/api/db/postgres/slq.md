## CREAR TABLA

```sql
CREATE TABLE posts (
	Name VARCHAR(255),
	Owner VARCHAR(255)
);
```

### CREAR TABLA

```sql
CREATE TABLE BlogPosts (
Id serial PRIMARY KEY,
Title VARCHAR ( 80 ) UNIQUE NOT NULL,
Body VARCHAR ( 500 ) NOT NULL,
Created_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## GET ALL POSTS IN THE DATABASE

```sql
SELECT * FROM posts


```

## GET ALL POSTS WITH MORE THAN 100 LIKES

```sql
SELECT * FROM posts WHERE likes > 100


```

## INSERT A NEW POST INTO THE DATABASE

```sql
INSERT INTO posts (likes, comments) VALUES (${likes},${comments})

```

## UPDATE ALL POSTS TO HAVE 200 LIKES

```sql
UPDATE posts SET likes = 200


```

## DELETE ALL POSTS IN THE DATABASE

```sql
DELETE FROM posts


```

## DELETE THE TABLE

```sql
DROP TABLE posts

```

## RENAME TABLE

```sql
ALTER TABLE current_table_name RENAME TO new_table_name;
```
