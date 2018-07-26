SET client_encoding = 'UTF8';

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE migrations (
    version INT PRIMARY KEY
);

INSERT INTO migrations (version) VALUES (1);

CREATE TABLE counter_groups (
    id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        TEXT        NOT NULL,
    created_at  TIMESTAMP   NOT NULL    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE counters (
    id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id    UUID        NOT NULL,
    index       INT         NOT NULL,
    name        TEXT        NOT NULL,
    count       INT         NOT NULL    DEFAULT 0,
    updated_at  TIMESTAMP   NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (group_id, index)
);
