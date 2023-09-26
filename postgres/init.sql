CREATE TABLE blogs
(
    id     SERIAL PRIMARY KEY,
    author text,
    url    text NOT NULL,
    title  text NOT NULL,
    likes  integer default 0
);

insert into blogs (author, url, title)
values ('BlogMaster 66', 'www.blogmaster.io', 'How to Crush Blogging or Your Money Back');
insert into blogs (author, url, title)
values ('BlogSucker 55', 'www.bloggingsucks.io', 'How to Fail at Blogging And Lose All Your Money');